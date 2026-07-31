import { RelatorioModeloArquivoDto } from './dto/relatorio-modelo.dto';
import { ReportColumnDef, ReportColumnFormat, ReportFileSchema } from './report-schema';

/** Referência do modelo que o schema desta execução não tem. */
export type ModeloReferenciaIgnorada = {
    arquivo: string;
    onde: 'colunas' | 'filtros' | 'order_by';
    coluna: string;
};

/**
 * Colunas que a fonte declara somando **todas** as variantes, por arquivo.
 *
 * Serve só para separar duas ausências que são muito diferentes entre si: coluna que existe
 * na fonte mas não nesta execução (recorte esperado) e coluna que a fonte não tem mais
 * (schema mudou embaixo do modelo). Sem isto, as duas viravam o mesmo aviso.
 */
export type ColunasDaFonte = Map<string, Set<string>>;

export type RegistrarReferencia = (onde: ModeloReferenciaIgnorada['onde'], coluna: string) => void;

/**
 * Coluna final com o rastro do que o modelo sobrescreveu.
 *
 * A escrita do arquivo só olha `name`/`label`/`format` — os campos `*_original` existem para a
 * prévia de `GET /relatorio-modelo/:id/colunas`, que precisa mostrar os dois lados ("Objeto" da
 * fonte × "Descrição do objeto" do modelo). Sem eles o rótulo padrão era destruído no `...def` e
 * a resposta não permitia distinguir renomeado de herdado.
 *
 * Só é preenchido quando houve sobrescrita — quem consome usa o efetivo como fallback (é o que a
 * própria fonte declara nesse caso).
 */
export type ColunaResolvida = ReportColumnDef & {
    /** Rótulo declarado no `@ReportColumn`, quando o modelo trocou o rótulo. */
    label_original?: string;
    /** Formatação declarada no `@ReportColumn`, quando o modelo trocou decimais/formato de data. */
    format_original?: ReportColumnFormat;
};

/**
 * Resolve a lista final de colunas: a seleção do modelo (na ordem escolhida) ou,
 * na ausência dela, todas as colunas do schema na ordem declarada. Labels e
 * formatação do modelo sobrescrevem os padrões do schema, que ficam preservados em
 * `label_original`/`format_original` (ver {@link ColunaResolvida}).
 *
 * A seleção do modelo é um **superconjunto**, e aqui ela é *recortada* contra o schema
 * desta execução: fica a interseção, na ordem que o modelo pediu. Isso é o que permite
 * criar o modelo antes de saber com que parâmetros ele vai rodar — que é a ordem natural,
 * já que o modelo é montado uma vez e reusado em execuções diferentes.
 *
 * Uma coluna pedida e ausente é **descartada**, não emitida como NULL. Emitir NULL
 * entregava uma coluna vazia com o nome de máquina no cabeçalho (`meta__titulo` em vez de
 * "Título da Meta") toda vez que o modelo cobria uma variante que aquela execução não
 * tem — por exemplo meta/iniciativa/atividade num orçamento de projeto.
 *
 * Em nenhum caso a ausência derruba o relatório: perder uma extração de horas por uma
 * coluna cosmética seria um péssimo negócio. A validação estrita segue na criação/edição
 * do modelo (`validaConfig`), onde coluna inexistente é erro de digitação.
 *
 * Mora fora do `ReportPostProcessService` porque duas rotas precisam do **mesmo** resultado:
 * a execução (que escreve o CSV/XLSX) e a pré-visualização de
 * `GET /relatorio-modelo/:id/colunas`. Uma prévia que divergisse do arquivo entregue seria
 * pior que não ter prévia nenhuma, então a regra é uma função pura compartilhada em vez de
 * duas implementações que combinam hoje.
 */
export function resolverColunasDoModelo(
    schema: ReportFileSchema,
    cfg: RelatorioModeloArquivoDto,
    registrar: RegistrarReferencia
): ColunaResolvida[] {
    if (!cfg.colunas?.length) return schema.colunas;

    const porNome = new Map(schema.colunas.map((c) => [c.name, c]));
    const out: ColunaResolvida[] = [];

    for (const sel of cfg.colunas) {
        const def = porNome.get(sel.coluna);

        if (!def) {
            registrar('colunas', sel.coluna);
            continue;
        }

        // `sel.label` definido é sobrescrita mesmo quando repete o texto do schema: o modelo fixou
        // aquele rótulo e continua fixo se a fonte renomear a coluna depois.
        const trocouFormato = sel.decimais !== undefined || sel.formato_data !== undefined;

        out.push({
            ...def,
            label: sel.label ?? def.label,
            format: {
                ...def.format,
                ...(sel.decimais !== undefined ? { decimalPlaces: sel.decimais } : {}),
                ...(sel.formato_data !== undefined ? { dateFormat: sel.formato_data } : {}),
            },
            ...(sel.label !== undefined ? { label_original: def.label } : {}),
            ...(trocouFormato ? { format_original: def.format ?? {} } : {}),
        });
    }

    // Recorte que zerou a seleção: entrega o schema inteiro em vez de um CSV sem coluna
    // nenhuma. Acontece com modelo montado só para outra variante da fonte.
    if (!out.length) return schema.colunas;

    return out;
}

/**
 * Fábrica do `registrar` que separa recorte esperado de deriva de schema.
 *
 * Sem o mapa da fonte não dá para distinguir os dois; nesse caso tudo cai em `ignoradas`,
 * que é o comportamento conservador (avisa demais, nunca de menos).
 */
export function registradorDeReferencias(
    arquivo: string,
    conhecidas: Set<string> | undefined,
    ignoradas: ModeloReferenciaIgnorada[],
    recortadas: ModeloReferenciaIgnorada[],
    aoIgnorar?: (coluna: string, onde: ModeloReferenciaIgnorada['onde']) => void
): RegistrarReferencia {
    return (onde, coluna) => {
        if (conhecidas?.has(coluna)) {
            recortadas.push({ arquivo, onde, coluna });
            return;
        }
        ignoradas.push({ arquivo, onde, coluna });
        aoIgnorar?.(coluna, onde);
    };
}
