/**
 * Caça a erros de ortografia em português nos identificadores e rótulos do código.
 *
 * Nasceu do `hirearquia` (typo de `hierarquia` que vazou para o DTO da API e para o
 * cabeçalho de um CSV, onde virou contrato com quem consome o arquivo). A pergunta que
 * o script responde é "quais outros existem?" — e a resposta precisa ser barata de
 * repetir, porque o valor está em rodar de novo a cada PR, não numa varredura única.
 *
 * O desenho é um funil de três estágios, do mais barato para o mais caro. O LLM é o
 * último, e só vê o que sobreviveu aos dois primeiros:
 *
 *   1. EXTRAÇÃO   — quebra identificadores (`tarefasHierarquia`, `custo_estimado`) em
 *                   palavras e conta ocorrências. Rótulos de `@ReportColumn` e strings
 *                   entram junto, marcados com a origem.
 *   2. TRIAGEM    — descarta o que está no dicionário pt-BR, no dicionário de inglês
 *                   (o código é bilíngue) e no stoplist de jargão do projeto. O que
 *                   sobra é pontuado: uma palavra desconhecida a **uma** edição de uma
 *                   palavra pt-BR válida — ou de um identificador muito mais frequente
 *                   no próprio repositório — é candidata forte. Foi exatamente esse o
 *                   formato do `hirearquia`: transposição `er`→`re`, 9 ocorrências
 *                   contra centenas de `hierarquia`.
 *   3. VEREDITO   — o shortlist vai para o Haiku em lotes, com contexto (ocorrências,
 *                   sugestão do dicionário, trechos reais). Ele separa typo de jargão
 *                   de domínio, sigla e estrangeirismo — que é onde heurística sozinha
 *                   erra feio num código cheio de `pdm`, `sof`, `sei` e `mdo`.
 *
 * Por que o LLM não faz tudo: mandar o vocabulário inteiro para o modelo custaria caro
 * e produziria ruído. Por que a heurística não basta: ela não distingue `hirearquia`
 * (typo) de `subprefeitura` (palavra legítima ausente do dicionário). Cada estágio
 * cobre o ponto cego do outro.
 *
 * Falsos positivos são esperados e baratos — o veredito do Haiku vem com confiança e
 * justificativa, e o relatório é para leitura humana, não para falhar build.
 *
 * Usage:
 *   npm run spellcheck:ptbr                    — varre src/ e escreve o relatório
 *   npm run spellcheck:ptbr -- --dir src/reports   — restringe o diretório
 *   npm run spellcheck:ptbr -- --sem-llm       — só os estágios 1 e 2 (offline, grátis)
 *   npm run spellcheck:ptbr -- --limite 120    — quantos candidatos mandar ao LLM
 *   npm run spellcheck:ptbr -- --acentos       — inclui acento faltando em strings
 *   npm run spellcheck:ptbr -- --incluir-testes    — não pula os `*.spec.ts`
 *   npm run spellcheck:ptbr -- --stdout        — imprime em vez de escrever o arquivo
 *
 * Credencial: nenhuma. O estágio 3 chama `claude -p --model haiku`, reaproveitando o
 * login do Claude Code que já existe na máquina — sem SDK, sem `ANTHROPIC_API_KEY`, sem
 * dependência nova. Onde o CLI não estiver disponível, `--sem-llm` roda os estágios 1 e 2.
 */
import { execFileSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const RAIZ = path.resolve(__dirname, '..');
const SAIDA = path.resolve(RAIZ, 'docs/spellcheck-ptbr.md');
const CACHE = path.resolve(RAIZ, 'docs/.spellcheck-ptbr-cache.json');
const STOPLIST = path.resolve(__dirname, 'spellcheck-ptbr.stoplist.txt');

/** Dicionários do sistema (pacotes `wbrazilian` / `wportuguese` / `wamerican`). */
const DICT_PTBR = ['/usr/share/dict/brazilian', '/usr/share/dict/portuguese'];
const DICT_EN = ['/usr/share/dict/american-english', '/usr/share/dict/british-english'];

const MODELO = 'claude-haiku-4-5';
const LOTE = 40;

// ---------------------------------------------------------------------------
// Normalização
// ---------------------------------------------------------------------------

/** `órgão` -> `orgao`. Identificadores não carregam acento, o dicionário sim. */
function semAcento(s: string): string {
    return s
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase();
}

/**
 * Quebra um identificador nas palavras que o compõem.
 * `tarefasHierarquia` -> [tarefas, hierarquia]; `custo_real_anualizado` -> 3 palavras.
 * Siglas coladas (`PPProjetoDto`) quebram em `pp` + `projeto` + `dto`.
 */
function palavrasDe(identificador: string): string[] {
    return identificador
        .replace(/([a-zà-ÿ0-9])([A-ZÀ-Ý])/g, '$1 $2')
        .replace(/([A-ZÀ-Ý]+)([A-ZÀ-Ý][a-zà-ÿ])/g, '$1 $2')
        .split(/[^A-Za-zÀ-ÿ]+/)
        .filter(Boolean);
}

// ---------------------------------------------------------------------------
// Dicionários
// ---------------------------------------------------------------------------

function carregarDicionario(caminhos: string[]): Set<string> {
    const set = new Set<string>();
    for (const caminho of caminhos) {
        if (!fs.existsSync(caminho)) continue;
        for (const linha of fs.readFileSync(caminho, 'utf8').split('\n')) {
            const palavra = linha.trim();
            if (palavra.length > 1) set.add(semAcento(palavra));
        }
    }
    return set;
}

/** Formas acentuadas do pt-BR, para o modo `--acentos`: `orgao` -> `órgão`. */
function carregarAcentuadas(caminhos: string[]): Map<string, string> {
    const mapa = new Map<string, string>();
    for (const caminho of caminhos) {
        if (!fs.existsSync(caminho)) continue;
        for (const linha of fs.readFileSync(caminho, 'utf8').split('\n')) {
            const palavra = linha.trim();
            if (palavra.length < 3 || palavra === palavra.normalize('NFD')) continue;
            const chave = semAcento(palavra);
            if (!mapa.has(chave)) mapa.set(chave, palavra);
        }
    }
    return mapa;
}

function carregarStoplist(): Set<string> {
    if (!fs.existsSync(STOPLIST)) return new Set();
    return new Set(
        fs
            .readFileSync(STOPLIST, 'utf8')
            .split('\n')
            .map((l) => l.replace(/#.*$/, '').trim().toLowerCase())
            .filter(Boolean)
    );
}

// ---------------------------------------------------------------------------
// Estágio 1 — extração
// ---------------------------------------------------------------------------

type Ocorrencia = { arquivo: string; linha: number; trecho: string };
type Termo = {
    palavra: string;
    total: number;
    /** `true` quando aparece em string literal (rótulo, mensagem) e não só em identificador. */
    emTexto: boolean;
    ocorrencias: Ocorrencia[];
};

const IGNORAR_DIR = new Set(['node_modules', 'dist', '.git', 'coverage', 'generated']);

function arquivosFonte(dir: string, incluirTestes: boolean): string[] {
    const out: string[] = [];
    if (!fs.existsSync(dir)) return out;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (entry.name.startsWith('.') || IGNORAR_DIR.has(entry.name)) continue;
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            out.push(...arquivosFonte(full, incluirTestes));
            continue;
        }
        if (!/\.(ts|prisma|pgsql)$/.test(entry.name) || entry.name.endsWith('.d.ts')) continue;
        // Fixture de teste é onde nomes inventados se concentram, e um typo ali não vaza
        // para contrato nenhum — fica de fora salvo pedido explícito.
        if (!incluirTestes && /\.(spec|e2e-spec)\.ts$/.test(entry.name)) continue;
        out.push(full);
    }
    return out;
}

/**
 * Varre os arquivos e devolve o vocabulário com contagem e amostras de contexto.
 *
 * Comentários são ignorados de propósito: prosa em português tem ordens de magnitude
 * mais palavras que identificadores, e errar num comentário não quebra contrato nenhum.
 * O alvo são nomes de campo, rótulos e mensagens.
 */
function extrair(dirs: string[], incluirTestes: boolean): Map<string, Termo> {
    const vocab = new Map<string, Termo>();

    const registrar = (palavra: string, oc: Ocorrencia, emTexto: boolean) => {
        const chave = semAcento(palavra);
        if (chave.length < 4) return;
        let termo = vocab.get(chave);
        if (!termo) {
            termo = { palavra: chave, total: 0, emTexto: false, ocorrencias: [] };
            vocab.set(chave, termo);
        }
        termo.total++;
        termo.emTexto ||= emTexto;
        if (termo.ocorrencias.length < 4) termo.ocorrencias.push(oc);
    };

    for (const dir of dirs) {
        for (const arquivo of arquivosFonte(dir, incluirTestes)) {
            const rel = path.relative(RAIZ, arquivo);
            const linhas = fs.readFileSync(arquivo, 'utf8').split('\n');
            let emBloco = false;

            linhas.forEach((linhaBruta, i) => {
                // Descarta comentários de bloco e de linha antes de tokenizar.
                let linha = linhaBruta;
                if (emBloco) {
                    const fim = linha.indexOf('*/');
                    if (fim < 0) return;
                    linha = linha.slice(fim + 2);
                    emBloco = false;
                }
                linha = linha.replace(/\/\*[\s\S]*?\*\//g, ' ');
                const abre = linha.indexOf('/*');
                if (abre >= 0) {
                    emBloco = true;
                    linha = linha.slice(0, abre);
                }
                linha = linha.replace(/\/\/.*$/, '').replace(/^\s*--.*$/, '');
                if (!linha.trim()) return;

                const oc: Ocorrencia = { arquivo: rel, linha: i + 1, trecho: linhaBruta.trim().slice(0, 160) };

                // Strings literais entram como texto; o resto, como identificador.
                const textos: string[] = [];
                const semStrings = linha.replace(/(['"`])((?:\\.|(?!\1)[^\\])*)\1/g, (_m, _q, corpo: string) => {
                    textos.push(corpo);
                    return ' ';
                });

                for (const texto of textos) {
                    for (const p of palavrasDe(texto)) registrar(p, oc, true);
                }
                for (const ident of semStrings.match(/[A-Za-zÀ-ÿ_][A-Za-zÀ-ÿ0-9_]*/g) ?? []) {
                    for (const p of palavrasDe(ident)) registrar(p, oc, false);
                }
            });
        }
    }

    return vocab;
}

// ---------------------------------------------------------------------------
// Estágio 2 — triagem
// ---------------------------------------------------------------------------

const ALFABETO = 'abcdefghijklmnopqrstuvwxyzç';

/**
 * Palavra curta demais para ser candidata.
 *
 * Abaixo disso quase tudo tem vizinho no dicionário por acaso — `cust`, `dist`, `addr`,
 * `ceil` e `auth` colidiram com `custa`, `dista`, `adir`, `ceia` e `auto` na primeira
 * rodada. O sinal fica bom a partir de 6 letras, e typo em identificador de 4-5 letras
 * é raro justamente porque salta aos olhos.
 */
const MIN_CANDIDATO = 6;

/**
 * Acima disto, sem vizinho mais frequente no repo, a palavra é vocabulário estabelecido —
 * não typo. Foi o que separou `varchar` (595x) e `auth` (142x) de `paralizado` (13x).
 */
const MAX_FREQ_SEM_VIZINHO = 30;

/**
 * Vizinhos a uma edição de distância (Damerau: inclui transposição).
 *
 * A transposição não é opcional — é o formato de `hirearquia` (`er` <-> `re`), que é
 * justamente o tipo de erro que passa despercebido em revisão porque todas as letras
 * certas estão lá.
 */
function vizinhos(p: string): Set<string> {
    const out = new Set<string>();
    for (let i = 0; i < p.length; i++) {
        out.add(p.slice(0, i) + p.slice(i + 1)); // deleção
        if (i < p.length - 1) out.add(p.slice(0, i) + p[i + 1] + p[i] + p.slice(i + 2)); // transposição
        for (const c of ALFABETO) {
            out.add(p.slice(0, i) + c + p.slice(i + 1)); // substituição
            out.add(p.slice(0, i) + c + p.slice(i)); // inserção
        }
    }
    for (const c of ALFABETO) out.add(p + c);
    out.delete(p);
    return out;
}

type Candidato = {
    termo: Termo;
    /** Sugestões vindas do dicionário pt-BR, a uma edição. */
    sugestoesDicionario: string[];
    /** Sugestões vindas do próprio repositório, muito mais frequentes que o termo. */
    sugestoesRepo: { palavra: string; total: number }[];
    /** Só no modo `--acentos`: forma acentuada correta de uma palavra escrita sem acento. */
    acentoFaltando?: string;
    pontos: number;
    motivos: string[];
};

function triar(
    vocab: Map<string, Termo>,
    ptbr: Set<string>,
    en: Set<string>,
    stop: Set<string>,
    acentuadas: Map<string, string>,
    modoAcentos: boolean
): Candidato[] {
    const candidatos: Candidato[] = [];

    for (const termo of vocab.values()) {
        const p = termo.palavra;
        if (stop.has(p)) continue;

        const conhecida = ptbr.has(p) || en.has(p);

        // Acento faltando: a palavra existe no dicionário, mas a forma correta é acentuada
        // e ela apareceu num texto visível ao usuário. Só faz sentido em string literal —
        // identificador sem acento é convenção, não erro.
        if (conhecida) {
            if (!modoAcentos || !termo.emTexto) continue;
            const acentuada = acentuadas.get(p);
            if (!acentuada || ptbr.has(p) === false) continue;
            // Palavra que também existe sem acento (`e`/`é`, `esta`/`está`) é ambígua demais.
            if (!acentuada || acentuada === p) continue;
            candidatos.push({
                termo,
                sugestoesDicionario: [],
                sugestoesRepo: [],
                acentoFaltando: acentuada,
                pontos: 2,
                motivos: [`grafia acentuada \`${acentuada}\` existe e o termo saiu em texto`],
            });
            continue;
        }

        const vz = vizinhos(p);
        const sugestoesDicionario = [...vz].filter((v) => v.length >= 4 && ptbr.has(v)).sort();
        const sugestoesRepo = [...vz]
            .map((v) => vocab.get(v))
            .filter((t): t is Termo => !!t && t.total >= Math.max(5, termo.total * 5))
            // Plural/singular é vizinho a uma edição e sempre mais frequente no singular:
            // `schemas`/`schema` e `subprefeituras`/`subprefeitura` acusavam como typo.
            .filter((t) => t.palavra !== `${p}s` && `${t.palavra}s` !== p)
            .map((t) => ({ palavra: t.palavra, total: t.total }))
            .sort((a, b) => b.total - a.total);

        if (!sugestoesDicionario.length && !sugestoesRepo.length) continue;
        if (p.length < MIN_CANDIDATO) continue;
        if (termo.total > MAX_FREQ_SEM_VIZINHO && !sugestoesRepo.length) continue;

        // Artefato de quebra de sigla colada: `PPrestricaoDto` e `PPfonteRecursoDto` usam
        // o prefixo `PP` (Portfólio de Projetos), e não há como o splitter de camelCase
        // saber que o segundo `P` pertence à sigla e não à palavra — ele produz
        // `prestricao` e `pfonte`. Se tirar a primeira letra deixa uma palavra válida, o
        // problema é a fronteira do token, não a grafia.
        const semInicial = p.slice(1);
        if (semInicial.length >= 4 && (ptbr.has(semInicial) || en.has(semInicial))) continue;

        const motivos: string[] = [];
        let pontos = 0;
        if (sugestoesDicionario.length) {
            pontos += 3;
            motivos.push(`a uma edição de \`${sugestoesDicionario.slice(0, 3).join('`, `')}\` (dicionário pt-BR)`);
        }
        if (sugestoesRepo.length) {
            pontos += 2;
            const s = sugestoesRepo[0];
            motivos.push(`\`${s.palavra}\` aparece ${s.total}x no repo contra ${termo.total}x deste`);
        }
        if (termo.total <= 3) {
            pontos += 1;
            motivos.push(`raro (${termo.total}x)`);
        }
        if (p.length >= 7) pontos += 1;
        if (termo.emTexto) {
            pontos += 1;
            motivos.push('aparece em texto/rótulo');
        }

        candidatos.push({ termo, sugestoesDicionario, sugestoesRepo, pontos, motivos });
    }

    return candidatos.sort((a, b) => b.pontos - a.pontos || a.termo.palavra.localeCompare(b.termo.palavra));
}

// ---------------------------------------------------------------------------
// Estágio 3 — veredito do Haiku
// ---------------------------------------------------------------------------

type Veredito = {
    palavra: string;
    veredito: 'erro' | 'correto' | 'jargao' | 'ingles' | 'indefinido';
    correcao: string | null;
    confianca: number;
    justificativa: string;
};

const SISTEMA = [
    'Você revisa ortografia de português brasileiro em código-fonte de um sistema público de gestão',
    '(planos de metas, obras, projetos, transferências, parlamentares, orçamento).',
    '',
    'Recebe palavras extraídas de nomes de campo, rótulos de CSV e mensagens — sem acento, porque',
    'identificadores não têm. Ausência de acento NUNCA é erro; julgue apenas a sequência de letras.',
    '',
    'Classifique cada palavra:',
    '  erro       — grafia errada de uma palavra portuguesa (ex.: "hirearquia" -> "hierarquia",',
    '               "paralizado" -> "paralisado", "excessao" -> "excecao")',
    '  correto    — palavra portuguesa legítima, mesmo que fora do dicionário comum',
    '               (composto, regionalismo, termo técnico, flexão rara)',
    '  jargao     — sigla, acrônimo, abreviação, nome próprio ou termo do domínio',
    '               (ex.: pdm, sof, sei, mdo, sisconv, cnpj)',
    '  ingles     — palavra inglesa ou de outra língua usada no código',
    '  indefinido — não dá para decidir com o contexto dado',
    '',
    'Só use "erro" quando tiver certeza da grafia correta em pt-BR. Na dúvida entre erro e jargão,',
    'escolha jargão: um falso positivo aqui vira retrabalho de quem lê o relatório.',
].join('\n');

function promptLote(lote: Candidato[]): string {
    const itens = lote.map((c) => {
        const linhas = [`### ${c.termo.palavra}`, `- ocorrências: ${c.termo.total}`];
        if (c.acentoFaltando) linhas.push(`- forma acentuada no dicionário: ${c.acentoFaltando}`);
        if (c.sugestoesDicionario.length)
            linhas.push(`- vizinhos no dicionário pt-BR: ${c.sugestoesDicionario.slice(0, 5).join(', ')}`);
        if (c.sugestoesRepo.length)
            linhas.push(
                `- vizinhos no próprio código: ${c.sugestoesRepo
                    .slice(0, 3)
                    .map((s) => `${s.palavra} (${s.total}x)`)
                    .join(', ')}`
            );
        linhas.push(
            `- contexto:`,
            ...c.termo.ocorrencias.slice(0, 2).map((o) => `    ${o.arquivo}:${o.linha}  ${o.trecho}`)
        );
        return linhas.join('\n');
    });

    return [
        'Classifique cada palavra abaixo.',
        '',
        itens.join('\n\n'),
        '',
        'Responda SOMENTE com um array JSON, um objeto por palavra, nesta forma:',
        '[{"palavra":"...","veredito":"erro|correto|jargao|ingles|indefinido",' +
            '"correcao":"grafia correta ou null","confianca":0.0,"justificativa":"uma frase curta"}]',
    ].join('\n');
}

/** Extrai o primeiro array JSON da resposta, tolerando cercas de markdown e preâmbulo. */
function parseVereditos(texto: string): Veredito[] {
    const limpo = texto.replace(/^```(?:json)?/gm, '').replace(/```$/gm, '');
    const ini = limpo.indexOf('[');
    const fim = limpo.lastIndexOf(']');
    if (ini < 0 || fim <= ini) throw new Error(`resposta sem array JSON: ${texto.slice(0, 200)}`);
    return JSON.parse(limpo.slice(ini, fim + 1));
}

/**
 * Chama o Haiku pelo CLI do Claude Code, que já está instalado e autenticado na máquina
 * de quem desenvolve. Sem SDK e sem `ANTHROPIC_API_KEY`: uma dependência a menos no
 * `package.json` e nenhuma chave para provisionar por causa de um utilitário de revisão.
 */
function chamarModelo(prompt: string): string {
    return execFileSync('claude', ['-p', '--model', 'haiku', '--append-system-prompt', SISTEMA], {
        input: prompt,
        encoding: 'utf8',
        maxBuffer: 32 * 1024 * 1024,
    });
}

function lerCache(): Record<string, Veredito> {
    if (!fs.existsSync(CACHE)) return {};
    try {
        return JSON.parse(fs.readFileSync(CACHE, 'utf8'));
    } catch {
        return {};
    }
}

function julgar(candidatos: Candidato[]): Map<string, Veredito> {
    const cache = lerCache();
    const out = new Map<string, Veredito>();
    const pendentes: Candidato[] = [];

    for (const c of candidatos) {
        const hit = cache[c.termo.palavra];
        if (hit) out.set(c.termo.palavra, hit);
        else pendentes.push(c);
    }
    if (pendentes.length) console.error(`${out.size} em cache, ${pendentes.length} para o ${MODELO}...`);

    for (let i = 0; i < pendentes.length; i += LOTE) {
        const lote = pendentes.slice(i, i + LOTE);
        process.stderr.write(`  lote ${Math.floor(i / LOTE) + 1}/${Math.ceil(pendentes.length / LOTE)}... `);
        try {
            for (const v of parseVereditos(chamarModelo(promptLote(lote)))) {
                const chave = semAcento(String(v.palavra ?? ''));
                if (!chave) continue;
                out.set(chave, v);
                cache[chave] = v;
            }
            console.error('ok');
        } catch (e) {
            console.error(`falhou (${(e as Error).message.split('\n')[0]}) — lote ignorado`);
        }
    }

    fs.mkdirSync(path.dirname(CACHE), { recursive: true });
    fs.writeFileSync(CACHE, JSON.stringify(cache, null, 2));
    return out;
}

// ---------------------------------------------------------------------------
// Relatório
// ---------------------------------------------------------------------------

const ROTULO_VEREDITO: Record<Veredito['veredito'], string> = {
    erro: 'erro de grafia',
    correto: 'correta',
    jargao: 'jargão/sigla',
    ingles: 'inglês',
    indefinido: 'indefinido',
};

function relatorio(candidatos: Candidato[], vereditos: Map<string, Veredito>, usouLlm: boolean): string {
    const linhas: string[] = [
        '# Ortografia pt-BR — candidatos a erro',
        '',
        '<!-- Gerado por bin/spellcheck-ptbr.ts — não edite à mão. -->',
        '',
        `${candidatos.length} candidato(s) após a triagem` +
            (usouLlm ? `, classificados por \`${MODELO}\`.` : ' (sem classificação por LLM).'),
        '',
        'Palavras vêm sem acento porque foram extraídas de identificadores. Falso positivo aqui é',
        'esperado: confirme antes de renomear, e lembre que nome de campo de API e cabeçalho de CSV',
        'são contrato — a correção costuma ser depreciar o campo errado e adicionar o certo ao lado.',
        '',
    ];

    const erros = candidatos.filter((c) => vereditos.get(c.termo.palavra)?.veredito === 'erro');
    const resto = candidatos.filter((c) => !erros.includes(c));

    const tabela = (titulo: string, itens: Candidato[], nota?: string) => {
        if (!itens.length) return;
        linhas.push(`## ${titulo}`, '');
        if (nota) linhas.push(nota, '');
        linhas.push(
            '| Palavra | Correção | Veredito | Conf. | Ocorr. | Onde | Por quê |',
            '| --- | --- | --- | --- | --- | --- | --- |'
        );
        for (const c of itens) {
            const v = vereditos.get(c.termo.palavra);
            const oc = c.termo.ocorrencias[0];
            // Palpite do dicionário só vale como correção enquanto ninguém julgou, ou quando
            // o veredito foi "erro". Exibi-lo ao lado de "jargão" sugeriria trocar `tipado`
            // por `ripado`, que é o oposto do que o modelo disse.
            const correcao =
                v && v.veredito !== 'erro'
                    ? '—'
                    : (v?.correcao ?? c.acentoFaltando ?? c.sugestoesDicionario[0] ?? '—');
            linhas.push(
                `| \`${c.termo.palavra}\` | ${correcao === '—' ? '—' : `\`${correcao}\``} | ${
                    v ? ROTULO_VEREDITO[v.veredito] : '—'
                } | ${v ? v.confianca.toFixed(2) : '—'} | ${c.termo.total} | ${
                    oc ? `\`${oc.arquivo}:${oc.linha}\`` : '—'
                } | ${(v?.justificativa || c.motivos.join('; ')).replace(/\|/g, '\\|')} |`
            );
        }
        linhas.push('');
    };

    tabela('Erros confirmados', erros);
    tabela(
        'Demais candidatos',
        resto,
        'Classificados como corretos, jargão, inglês ou indefinidos — ou não enviados ao modelo. ' +
            'Vale uma olhada: o modelo erra para o lado de não acusar.'
    );

    return linhas.join('\n');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
    const args = process.argv.slice(2);
    const valor = (flag: string, padrao: string) => {
        const i = args.indexOf(flag);
        return i >= 0 && args[i + 1] ? args[i + 1] : padrao;
    };

    const dirs = args
        .flatMap((a, i) => (a === '--dir' ? [args[i + 1]] : []))
        .filter(Boolean)
        .map((d) => path.resolve(RAIZ, d));
    if (!dirs.length) dirs.push(path.resolve(RAIZ, 'src'));

    const semLlm = args.includes('--sem-llm');
    const modoAcentos = args.includes('--acentos');
    const incluirTestes = args.includes('--incluir-testes');
    const limite = parseInt(valor('--limite', '150'), 10);

    const ptbr = carregarDicionario(DICT_PTBR);
    if (!ptbr.size) {
        console.error(
            `Nenhum dicionário pt-BR encontrado em ${DICT_PTBR.join(', ')}.\n` +
                'Instale com: sudo apt install wbrazilian wportuguese wamerican\n' +
                'Sem dicionário a triagem não filtra nada e o relatório seria só ruído — nada foi escrito.'
        );
        process.exit(1);
    }
    const en = carregarDicionario(DICT_EN);
    const acentuadas = modoAcentos ? carregarAcentuadas(DICT_PTBR) : new Map<string, string>();

    console.error(`dicionários: ${ptbr.size} pt-BR, ${en.size} en`);

    const vocab = extrair(dirs, incluirTestes);
    console.error(`vocabulário: ${vocab.size} palavras distintas em ${dirs.map((d) => path.relative(RAIZ, d))}`);

    const todos = triar(vocab, ptbr, en, carregarStoplist(), acentuadas, modoAcentos);
    const candidatos = todos.slice(0, limite);
    console.error(`triagem: ${todos.length} candidatos, analisando os ${candidatos.length} melhores`);
    if (todos.length > candidatos.length) {
        console.error(`  (${todos.length - candidatos.length} abaixo do corte — use --limite para incluir)`);
    }

    const vereditos = semLlm ? new Map<string, Veredito>() : julgar(candidatos);
    const texto = relatorio(candidatos, vereditos, !semLlm);

    if (args.includes('--stdout')) {
        process.stdout.write(texto);
        return;
    }
    fs.mkdirSync(path.dirname(SAIDA), { recursive: true });
    fs.writeFileSync(SAIDA, texto);
    const erros = [...vereditos.values()].filter((v) => v.veredito === 'erro').length;
    console.error(`\nEscrito ${path.relative(RAIZ, SAIDA)} — ${erros} erro(s) de grafia confirmado(s).`);
}

main();
