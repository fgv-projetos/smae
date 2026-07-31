# Ortografia pt-BR — candidatos a erro

<!-- Gerado por bin/spellcheck-ptbr.ts — não edite à mão. -->

64 candidato(s) após a triagem, classificados por `claude-haiku-4-5`.

Palavras vêm sem acento porque foram extraídas de identificadores. Falso positivo aqui é
esperado: confirme antes de renomear, e lembre que nome de campo de API e cabeçalho de CSV
são contrato — a correção costuma ser depreciar o campo errado e adicionar o certo ao lado.

## Erros confirmados

| Palavra | Correção | Veredito | Conf. | Ocorr. | Onde | Por quê |
| --- | --- | --- | --- | --- | --- | --- |
| `acompanhament` | `acompanhamento` | erro de grafia | 0.95 | 2 | `src/pp/acompanhamento-tipo/acompanhamento-tipo.controller.ts:12` | Falta a terminação '-o' da palavra acompanhamento em nomes de DTOs |
| `atividaes` | `atividades` | erro de grafia | 0.99 | 2 | `src/reports/casa-civil-atividades-pendentes/casa-civil-atividades-pendentes.controller.ts:6` | Falta de 'd' na sequência correta de 'atividades' |
| `atividiade` | `atividade` | erro de grafia | 0.95 | 1 | `src/importacao-orcamento/entities/importacao-orcamento.entity.ts:75` | Duplicação indevida de vogal (ati-vi-di-ade vs. ati-vi-da-de) |
| `crongorama` | `cronograma` | erro de grafia | 0.95 | 1 | `src/pp/tarefa/tarefa.service.ts:2046` | Falta a letra 'o' (crongorama vs. cronograma) |
| `projeot` | `projeto` | erro de grafia | 0.95 | 1 | `src/importacao-orcamento/entities/importacao-orcamento.entity.ts:56` | Transposição de letras (projeot vs. projeto) |
| `acompanhanmento` | `acompanhamento` | erro de grafia | 0.95 | 3 | `src/pp/acompanhamento/acompanhamento.service.ts:69` | Transposição de letras na sequência 'nm' para 'n' |
| `anterioes` | `anteriores` | erro de grafia | 0.95 | 3 | `src/pdm/pdm.service.ts:268` | Falta a letra 'r' antes de 'es' (anterioes vs. anteriores) |
| `detailhamento` | `detalhamento` | erro de grafia | 0.95 | 2 | `src/sof-api/sof-api.service.ts:393` | Letra 'i' indevida entre 't' e 'l' |
| `intervecao` | `intervencao` | erro de grafia | 0.90 | 6 | `src/common/ListaDePrivilegios.ts:204` | Letra 'c' no lugar de 'n' (intervecao vs. intervencao) |
| `mandatoo` | `mandato` | erro de grafia | 0.95 | 1 | `src/parlamentar/parlamentar.controller.ts:154` | Duplicação indevida de 'o' no final |
| `orgaoes` | `orgaos` | erro de grafia | 0.90 | 2 | `src/orcamento-realizado/orcamento-realizado.service.ts:872` | Estrutura de plural incorreta (orgaoes vs. orgaos) |
| `perifl` | `perfil` | erro de grafia | 0.95 | 3 | `src/auth/models/PerfilDeAcesso.dto.ts:2` | Transposição de 'f' e 'l' |
| `procesado` | `processado` | erro de grafia | 0.99 | 2 | `src/reports/relatorios/helpers/reports.params-processado.ts:8` | Falta duplo 's' na grafia correta de 'processado' |
| `seriese` | `series` | erro de grafia | 0.95 | 2 | `src/mf/metas/metas.service.ts:76` | Letra 'e' indevida no final (seriese vs. series) |
| `classficacao` | `classificacao` | erro de grafia | 0.95 | 6 | `src/transferencias-voluntarias/classificacao/classificacao.controller.ts:15` | Sequência 'ficacao' incorreta (classficacao vs. classificacao) |
| `cronogorama` | `cronograma` | erro de grafia | 0.95 | 5 | `src/cronograma/cronograma.service.ts:137` | Letra 'o' indevida entre 'n' e 'g' |
| `distruicoes` | `distribuicoes` | erro de grafia | 0.95 | 2 | `src/casa-civil/distribuicao-recurso/distribuicao-recurso.service.ts:339` | Falta a letra 'b' (distruicoes vs. distribuicoes) |
| `hirearquia` | `hierarquia` | erro de grafia | 0.99 | 4 | `src/reports/pp-obras/entities/obras.entity.ts:80` | Transposição de letras: 'hir' em vez de 'hier' na grafia correta |
| `parlamnetar` | `parlamentar` | erro de grafia | 0.95 | 8 | `src/casa-civil/dash/dto/transferencia.dto.ts:12` | Transposição de 'n' e 'e' (parlamnetar vs. parlamentar) |
| `permisao` | `permissao` | erro de grafia | 0.95 | 5 | `src/pp/projeto/projeto.service.ts:118` | Falta um 's' (permisao vs. permissao) |
| `planjeado` | `planejado` | erro de grafia | 0.95 | 10 | `src/pp/tarefa/tarefa.service.ts:539` | Sequência 'njeado' incorreta (planjeado vs. planejado) |
| `portifolio` | `portfolio` | erro de grafia | 0.90 | 4 | `src/gestao-projetos/painel-estrategico/painel-estrategico.service.ts:819` | Ordem de letras incorreta (portifolio vs. portfolio) |
| `premisa` | `premissa` | erro de grafia | 0.98 | 4 | `src/reports/pp-projetos/pp-projetos.service.ts:108` | Forma correta em pt-BR tem duplo 's': 'premissa' |
| `tranferencias` | `transferencias` | erro de grafia | 0.95 | 7 | `src/casa-civil/dash/dto/transferencia.dto.ts:173` | Sequência 'trans' incorreta (tranferencias vs. transferencias) |
| `variave` | `variavel` | erro de grafia | 0.95 | 7 | `src/variavel/dto/create-variavel.dto.ts:270` | Falta a letra 'l' final (variave vs. variavel) |
| `escopadas` | `escapadas` | erro de grafia | 0.60 | 3 | `src/reports/relatorios/reports.service.ts:860` | Palavra não existe em português; provável erro de digitação, contexto sugere 'selecionadas' ou similar |
| `fillter` | `filter` | erro de grafia | 0.95 | 3 | `src/cronograma/cronograma.controller.ts:14` | Duplicação indevida de 'l' (fillter vs. filter) |
| `paralizado` | `paralisado` | erro de grafia | 0.99 | 13 | `src/reports/pp-obras/entities/obras.entity.ts:105` | Grafia correta usa 's', não 'z': 'paralisado' |
| `sobreescrever` | `sobrescrever` | erro de grafia | 0.95 | 22 | `src/auth/auth.service.ts:98` | A forma correta em português possui apenas um 'e' entre 'sobr' e 'screver'. |
| `sucess` | `sucesso` | erro de grafia | 0.90 | 7 | `src/sof-api/sof-api.service.ts:29` | Grafia incorreta; faltam a segunda 's' e o 'o' final. 'Sucesso' é a forma correta em português. |
| `planilia` | `planilha` | erro de grafia | 0.98 | 6 | `src/upload/upload.service.ts:425` | Grafia incorreta; falta o 'h'. A forma correta em português é 'planilha'. |
| `serivce` | `service` | erro de grafia | 0.95 | 2 | `src/cronograma-termino-planejado-config/ctp-config.controller.ts:13` | Erro de digitação com letras fora de ordem; deveria ser 'service'. |
| `workflo` | `workflow` | erro de grafia | 0.98 | 6 | `src/casa-civil/workflow/andamento/fase/workflow-andamento-fase.service.ts:254` | Falta a letra 'w' do final; a forma correta é 'workflow'. |
| `loookup` | `lookup` | erro de grafia | 0.98 | 4 | `src/task/aviso_email_cronograma_tp/ae_cronograma_tp.service.ts:275` | Erro de digitação com três 'o's; a forma correta é 'lookup' com dois 'o's. |

## Demais candidatos

Classificados como corretos, jargão, inglês ou indefinidos — ou não enviados ao modelo. Vale uma olhada: o modelo erra para o lado de não acusar.

| Palavra | Correção | Veredito | Conf. | Ocorr. | Onde | Por quê |
| --- | --- | --- | --- | --- | --- | --- |
| `parsear` | — | inglês | 0.85 | 1 | `src/common/services/cache-kv.service.ts:24` | Anglicismo derivado de 'parse'; em PT-BR seria 'analisar' ou 'decompor' |
| `reponsavel` | — | correta | 0.95 | 2 | `src/pp/projeto/projeto.service.ts:4250` | Grafia correta de responsável (sem acento, conforme padrão de código) |
| `deletado` | — | inglês | 0.85 | 1 | `src/task/refresh_demanda/refresh-demanda.service.ts:241` | Anglicismo derivado de 'delete'; em PT-BR seria 'apagado' ou 'removido' |
| `ouvidoria` | — | correta | 0.95 | 2 | `src/sei-api/sei-api.service.ts:41` | Termo português legítimo para órgão de ouvidoria |
| `postgres` | — | jargão/sigla | 0.95 | 2 | `src/task/importacao_parlamentar/parlamentar.service.ts:32` | Nome de tecnologia/banco de dados (PostgreSQL) |
| `recalculos` | — | correta | 0.95 | 1 | `src/variavel/variavel.service.ts:2816` | Grafia correta de recálculos (sem acento, conforme padrão de código) |
| `resetar` | — | jargão/sigla | 0.80 | 1 | `src/pp/termo-encerramento/dto/termo-encerramento.entity.ts:24` | Termo técnico consolidado em programação, embora seja anglicismo |
| `resolvers` | — | inglês | 0.90 | 2 | `src/common/services/smae-config-dto/smae-config.email.dto.ts:98` | Termo inglês de programação (especialmente em GraphQL/arquitetura) |
| `retentavas` | — | indefinido | 0.20 | 1 | `src/dotacao/dotacao.controller.ts:34` | Palavra não identificada; contexto truncado impede classificação segura |
| `assignado` | — | inglês | 0.85 | 5 | `src/pp/projeto/projeto.service.ts:2242` | Anglicismo derivado de 'assigned'; em PT-BR seria 'designado' ou 'atribuído' |
| `configs` | — | jargão/sigla | 0.95 | 15 | `src/common/services/smae-config.service.ts:27` | Abreviação padrão em código (configurations → configs) |
| `dataset` | — | inglês | 0.95 | 1 | `src/casa-civil/dash/dto/transferencia.dto.ts:298` | Termo inglês consolidado em TI; em PT-BR seria 'conjunto de dados' |
| `delecao` | — | correta | 0.95 | 1 | `src/casa-civil/transferencia/transferencia.service.ts:2420` | Grafia correta de deleção (sem acento, conforme padrão de código) |
| `inativar` | — | correta | 0.95 | 13 | `src/common/ListaDePrivilegios.ts:28` | Verbo português legítimo, derivado de 'inativo' |
| `liberador` | — | correta | 0.85 | 6 | `src/reports/ps-monitoramento-mensal/entities/ps-monitoramento-mensal-csv.entity.ts:150` | Agente válido: aquele que libera; formação regular a partir de 'liberar' |
| `logamos` | — | correta | 0.85 | 1 | `src/variavel/variavel.service.ts:3060` | Conjugação legítima do verbo 'logar' (derivado de 'log' em contexto técnico), primeira pessoa plural do passado. |
| `plainjs` | — | jargão/sigla | 0.95 | 4 | `src/common/helpers/CsvWriter.ts:1` | Nome de pacote NPM (@json2csv/plainjs), parte do ecossistema técnico |
| `valids` | — | inglês | 1.00 | 4 | `src/variavel/variavel.service.ts:3935` | Palavra inglesa, plural de 'valid', usada como identificador em código TypeScript. |
| `agrupador` | — | correta | 0.85 | 5 | `src/indicador/indicador.service.ts:1016` | Forma derivada legítima de 'agrupar' em português; refere-se a quem ou aquilo que agrupa. |
| `canceladora` | — | correta | 0.85 | 4 | `src/casa-civil/transferencia/transferencia.service.ts:1460` | Forma feminina legítima de agente derivada de 'cancelar'; refere-se a quem ou aquilo que cancela. |
| `colabs` | — | jargão/sigla | 0.95 | 2 | `src/equipe-resp/equipe-resp.service.ts:667` | Abreviação informal de 'colaboradores', comum em código e mensagens técnicas. |
| `decrement` | — | inglês | 1.00 | 7 | `src/bloco-nota/nota/nota.service.ts:380` | Palavra inglesa, parte da API Prisma; significa 'decrementar'. |
| `httpfs` | — | jargão/sigla | 0.95 | 2 | `src/common/duckdb/duckdb-provider.service.ts:36` | Extensão técnica específica do DuckDB (HTTP File System); acrônimo de domínio. |
| `issuer` | — | inglês | 1.00 | 1 | `src/common/middleware/logger.middleware.ts:154` | Palavra inglesa em contexto de certificado SSL; refere-se ao emissor de certificado. |
| `limiter` | — | inglês | 1.00 | 4 | `src/app.module.ts:73` | Palavra inglesa usada em configuração técnica de throttling. |
| `metabase` | — | jargão/sigla | 0.95 | 8 | `src/dashboard/dashboard.service.ts:8` | Nome próprio de ferramenta de BI (Metabase); marca registrada usada como identificador. |
| `tipado` | — | correta | 0.90 | 2 | `src/reports/post-process/dto/relatorio-modelo.dto.ts:185` | Particípio válido: 'linguagem tipada' é expressão consagrada em português técnico |
| `resize` | — | inglês | 1.00 | 5 | `src/upload/preview.service.ts:57` | Palavra inglesa usada em nome de função; refere-se a redimensionamento. |
| `tuples` | — | inglês | 1.00 | 4 | `src/variavel/variavel.service.ts:721` | Palavra inglesa, plural de 'tuple'; termo técnico de estrutura de dados. |
| `qualif` | — | jargão/sigla | 0.85 | 4 | `src/mf/ps-dash/ps-dash.service.ts:489` | Abreviação de 'qualificação' usada em campo de schema/DTO; jargão de domínio. |
