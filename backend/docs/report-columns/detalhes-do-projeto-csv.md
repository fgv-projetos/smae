# detalhes-do-projeto.csv

Linha única com o cabeçalho/detalhes do projeto.

Fontes que produzem este arquivo: `Projeto`

62 colunas.

Classe de linha: `RelProjetoDetalheCsvRow`

Colunas do CSV bruto de `detalhes-do-projeto.csv` (sempre uma única linha).

A ordem reproduz a ordem de inserção das chaves no objeto `detail` montado em `asJSON()`
— que era exatamente o que definia o cabeçalho antes, já que não havia `fields`.

Dois campos do `detail` são objetos e, portanto, achatados: `projeto_etapa` (`IdDesc`) e
`meta` (`ProjetoMetaDetailDto`).

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `projeto_id` | `BIGINT` | projeto_id | sem formatação | — |
| `codigo` | `VARCHAR` | codigo | guard Excel | — |
| `portfolio_id` | `BIGINT` | portfolio_id | sem formatação | — |
| `nome` | `VARCHAR` | nome | — | — |
| `portfolio_titulo` | `VARCHAR` | portfolio_titulo | — | — |
| `etiquetas` | `VARCHAR` | etiquetas | — | — |
| `status` | `VARCHAR` | status | — | — |
| `projeto_etapa__id` | `BIGINT` | projeto_etapa.id | sem formatação | — |
| `projeto_etapa__descricao` | `VARCHAR` | projeto_etapa.descricao | — | — |
| `previsao_inicio` | `DATE` | previsao_inicio | — | — |
| `previsao_termino` | `DATE` | previsao_termino | — | — |
| `previsao_duracao` | `INTEGER` | previsao_duracao | sem formatação | — |
| `previsao_custo` | `DECIMAL(18,2)` | previsao_custo | R$, 2 casas | — |
| `objeto` | `VARCHAR` | objeto | — | — |
| `objetivo` | `VARCHAR` | objetivo | — | — |
| `nao_escopo` | `VARCHAR` | nao_escopo | — | — |
| `orgao_responsavel_id` | `BIGINT` | orgao_responsavel_id | sem formatação | — |
| `orgao_responsavel_sigla` | `VARCHAR` | orgao_responsavel_sigla | — | — |
| `orgao_responsavel_descricao` | `VARCHAR` | orgao_responsavel_descricao | — | — |
| `responsavel_id` | `BIGINT` | responsavel_id | sem formatação | — |
| `responsavel_nome_exibicao` | `VARCHAR` | responsavel_nome_exibicao | — | — |
| `orgao_gestor_id` | `BIGINT` | orgao_gestor_id | sem formatação | — |
| `orgao_gestor_sigla` | `VARCHAR` | orgao_gestor_sigla | — | — |
| `orgao_gestor_descricao` | `VARCHAR` | orgao_gestor_descricao | — | — |
| `meta_id` | `BIGINT` | meta_id | sem formatação | — |
| `responsaveis_no_orgao_gestor` | `VARCHAR` | responsaveis_no_orgao_gestor | — | — |
| `origem_tipo` | `VARCHAR` | origem_tipo | — | — |
| `origem_outro` | `VARCHAR` | origem_outro | — | — |
| `secretario_responsavel` | `VARCHAR` | secretario_responsavel | — | — |
| `secretario_executivo` | `VARCHAR` | secretario_executivo | — | — |
| `coordenador_ue` | `VARCHAR` | coordenador_ue | — | — |
| `data_aprovacao` | `DATE` | data_aprovacao | — | — |
| `data_revisao` | `DATE` | data_revisao | — | — |
| `versao` | `VARCHAR` | versao | guard Excel | — |
| `arquivado` | `BOOLEAN` | arquivado | — | — |
| `iniciativa_id` | `BIGINT` | iniciativa_id | sem formatação | — |
| `atividade_id` | `BIGINT` | atividade_id | sem formatação | — |
| `meta_codigo` | `VARCHAR` | meta_codigo | guard Excel | — |
| `resumo` | `VARCHAR` | resumo | — | — |
| `publico_alvo` | `VARCHAR` | publico_alvo | — | — |
| `realizado_inicio` | `DATE` | realizado_inicio | — | — |
| `realizado_termino` | `DATE` | realizado_termino | — | — |
| `realizado_custo` | `DECIMAL(18,2)` | realizado_custo | R$, 2 casas | — |
| `principais_etapas` | `VARCHAR` | principais_etapas | — | — |
| `eh_prioritario` | `BOOLEAN` | eh_prioritario | — | — |
| `atraso` | `INTEGER` | atraso | sem formatação | — |
| `em_atraso` | `BOOLEAN` | em_atraso | — | — |
| `tolerancia_atraso` | `INTEGER` | tolerancia_atraso | sem formatação | — |
| `projecao_termino` | `DATE` | projecao_termino | — | — |
| `realizado_duracao` | `INTEGER` | realizado_duracao | sem formatação | — |
| `percentual_concluido` | `DOUBLE` | percentual_concluido | 2 casas, unidade `%` | — |
| `portfolio_nivel_maximo_tarefa` | `INTEGER` | portfolio_nivel_maximo_tarefa | sem formatação | — |
| `meta__id` | `BIGINT` | meta.id | sem formatação | — |
| `meta__codigo` | `VARCHAR` | meta.codigo | guard Excel | — |
| `meta__titulo` | `VARCHAR` | meta.titulo | — | — |
| `meta__pdm_id` | `BIGINT` | meta.pdm_id | sem formatação | — |
| `meta__pdm_nome` | `VARCHAR` | meta.pdm_nome | — | — |
| `fonte_recursos` | `VARCHAR` | fonte_recursos | — | — |
| `premissas` | `VARCHAR` | premissas | — | — |
| `restricoes` | `VARCHAR` | restricoes | — | — |
| `orgaos_participantes` | `VARCHAR` | orgaos_participantes | — | — |
| `status_traduzido` | `VARCHAR` | status-traduzido | — | — |

[← todos os arquivos](../report-columns.md)
