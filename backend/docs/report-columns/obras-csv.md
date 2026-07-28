# obras.csv

Uma linha por combinação de obra × fonte de recurso × órgão participante (efeito dos LEFT JOINs 1:N).

Fontes que produzem este arquivo: `Obras`

74 colunas.

Classe de linha: `RelObrasCsvRow`

Colunas do CSV bruto de `obras.csv`.

As colunas seguem exatamente a ordem do `SELECT` de `buildObrasBaseQuery()` — era dele
que o cabeçalho nascia, já que este arquivo nunca passou uma lista `fields` explícita.

Uma obra pode aparecer em mais de uma linha: a consulta faz `LEFT JOIN` com
`projeto_fonte_recurso` e `projeto_orgao_participante`, que são 1:N.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `obra_id` | `BIGINT` | ID da Obra | sem formatação | — |
| `codigo` | `VARCHAR` | Código | guard Excel | — |
| `portfolio_id` | `BIGINT` | ID do Portfólio | sem formatação | — |
| `nome` | `VARCHAR` | Nome | — | — |
| `portfolio_titulo` | `VARCHAR` | Portfólio | — | — |
| `etiquetas` | `VARCHAR` | Etiquetas | — | — |
| `status` | `VARCHAR` | Status | — | — |
| `projeto_etapa` | `VARCHAR` | Etapa | — | — |
| `inicio_planejado` | `DATE` | Início Planejado | — | — |
| `termino_planejado` | `DATE` | Término Planejado | — | — |
| `previsao_inicio` | `DATE` | Previsão de Início | — | — |
| `previsao_termino` | `DATE` | Previsão de Término | — | — |
| `previsao_duracao` | `INTEGER` | Previsão de Duração | sem formatação | — |
| `previsao_custo` | `DECIMAL(18,2)` | Previsão de Custo | R$, 2 casas | — |
| `custo_planejado` | `DECIMAL(18,2)` | Custo Planejado | R$, 2 casas | — |
| `objeto` | `VARCHAR` | Objeto | — | — |
| `objetivo` | `VARCHAR` | Objetivo | — | — |
| `escopo` | `VARCHAR` | Escopo | — | — |
| `nao_escopo` | `VARCHAR` | Não Escopo | — | — |
| `grupo_tematico_id` | `BIGINT` | ID do Grupo Temático | sem formatação | — |
| `grupo_tematico_nome` | `VARCHAR` | Grupo Temático | — | — |
| `tipo_intervencao_id` | `BIGINT` | ID do Tipo de Intervenção | sem formatação | — |
| `tipo_intervencao_nome` | `VARCHAR` | Tipo de Intervenção | — | — |
| `tipo_intervencao_conceito` | `VARCHAR` | Conceito do Tipo de Intervenção | — | — |
| `equipamento_id` | `BIGINT` | ID do Equipamento | sem formatação | — |
| `equipamento_nome` | `VARCHAR` | Equipamento | — | — |
| `orgao_responsavel_id` | `BIGINT` | ID do Órgão Responsável | sem formatação | — |
| `orgao_responsavel_sigla` | `VARCHAR` | Sigla do Órgão Responsável | — | — |
| `orgao_responsavel_descricao` | `VARCHAR` | Órgão Responsável | — | — |
| `responsavel_id` | `BIGINT` | ID do Responsável | sem formatação | — |
| `responsavel_nome_exibicao` | `VARCHAR` | Responsável | — | — |
| `orgao_gestor_id` | `BIGINT` | ID do Órgão Gestor | sem formatação | — |
| `orgao_gestor_sigla` | `VARCHAR` | Sigla do Órgão Gestor | — | — |
| `orgao_gestor_descricao` | `VARCHAR` | Órgão Gestor | — | — |
| `orgao_id` | `BIGINT` | ID do Órgão Participante | sem formatação | — |
| `orgao_sigla` | `VARCHAR` | Sigla do Órgão Participante | — | — |
| `orgao_descricao` | `VARCHAR` | Órgão Participante | — | — |
| `orgao_executor_id` | `BIGINT` | ID do Órgão Executor | sem formatação | — |
| `orgao_executor_sigla` | `VARCHAR` | Sigla do Órgão Executor | — | — |
| `orgao_executor_descricao` | `VARCHAR` | Órgão Executor | — | — |
| `orgao_origem_id` | `BIGINT` | ID do Órgão de Origem | sem formatação | — |
| `orgao_origem_sigla` | `VARCHAR` | Sigla do Órgão de Origem | — | — |
| `orgao_origem_descricao` | `VARCHAR` | Órgão de Origem | — | — |
| `orgao_colaborador_id` | `BIGINT` | ID do Órgão Colaborador | sem formatação | — |
| `orgao_colaborador_sigla` | `VARCHAR` | Sigla do Órgão Colaborador | — | — |
| `orgao_colaborador_descricao` | `VARCHAR` | Órgão Colaborador | — | — |
| `meta_id` | `BIGINT` | ID da Meta | sem formatação | — |
| `meta_nome` | `VARCHAR` | Meta | — | — |
| `pdm_id` | `BIGINT` | ID do Programa de Metas | sem formatação | — |
| `pdm_nome` | `VARCHAR` | Programa de Metas | — | — |
| `assessores` | `VARCHAR` | Assessores | — | — |
| `pontos_focais_colaboradores` | `VARCHAR` | Pontos Focais Colaboradores | — | — |
| `fonte_recurso_valor_pct` | `DOUBLE` | Fonte de Recurso - Percentual | 2 casas | — |
| `fonte_recurso_valor_nominal` | `DECIMAL(18,2)` | Fonte de Recurso - Valor Nominal | R$, 2 casas | — |
| `detalhamento` | `VARCHAR` | Detalhamento | — | — |
| `origem_tipo` | `VARCHAR` | Tipo de Origem | — | — |
| `descricao` | `VARCHAR` | Descrição da Origem | — | — |
| `secretario_colaborador` | `VARCHAR` | Secretário Colaborador | — | — |
| `data_inauguracao_planejada` | `DATE` | Data de Inauguração Planejada | — | — |
| `subprefeituras` | `VARCHAR` | Subprefeituras | — | — |
| `programa_habitacional` | `VARCHAR` | Programa Habitacional | — | — |
| `empreendimento_id` | `BIGINT` | ID do Empreendimento | sem formatação | — |
| `empreendimento_identificador` | `VARCHAR` | Identificador do Empreendimento | guard Excel | — |
| `mdo_observacoes` | `VARCHAR` | Observações | — | — |
| `portfolios_compartilhados_titulos` | `VARCHAR` | Portfólios Compartilhados | — | — |
| `secretario_responsavel` | `VARCHAR` | Secretário Responsável | — | — |
| `secretario_executivo` | `VARCHAR` | Secretário Executivo | — | — |
| `coordenador_ue` | `VARCHAR` | Coordenador da Unidade Executora | — | — |
| `data_aprovacao` | `DATE` | Data de Aprovação | — | — |
| `data_revisao` | `DATE` | Data de Revisão | — | — |
| `versao` | `VARCHAR` | Versão | guard Excel | — |
| `n_unidades_habitacionais` | `INTEGER` | Nº de Unidades Habitacionais | sem formatação | — |
| `n_familias_beneficiadas` | `INTEGER` | Nº de Famílias Beneficiadas | sem formatação | — |
| `n_unidades_atendidas` | `INTEGER` | Nº de Unidades Atendidas | sem formatação | — |

[← todos os arquivos](../report-columns.md)
