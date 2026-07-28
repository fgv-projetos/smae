# cronograma.csv

Uma linha por tarefa do cronograma das obras filtradas.
Linhas do cronograma (tarefas) do projeto.
Uma linha por tarefa do cronograma dos projetos filtrados.
Linhas do cronograma (tarefas) das transferências filtradas.

Fontes que produzem este arquivo: `Obras`, `Projeto`, `Projetos`, `Transferencias`

26 colunas.

## `RelObrasCronogramaCsvRow`

Colunas do CSV bruto de `cronograma.csv` das obras.

Mesmo nome de arquivo do `cronograma.csv` de `Transferencias` — isso é esperado e não
conflita: `describeSchema` devolve só os schemas da execução corrente e `findFileSchema`
casa por nome dentro dessa lista.

A ordem reproduz exatamente o antigo array `cronogramaFields`.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `obra_id` | `BIGINT` | ID da Obra | sem formatação | — |
| `obra_codigo` | `VARCHAR` | Código da Obra | guard Excel | — |
| `tarefa_id` | `BIGINT` | ID da Tarefa | sem formatação | — |
| `hierarquia` | `VARCHAR` | Hierarquia | guard Excel | — |
| `numero` | `INTEGER` | Número | sem formatação | — |
| `nivel` | `INTEGER` | Nível | sem formatação | — |
| `tarefa` | `VARCHAR` | Tarefa | — | — |
| `inicio_planejado` | `DATE` | Início Planejado | — | — |
| `termino_planejado` | `DATE` | Término Planejado | — | — |
| `custo_estimado` | `VARCHAR` | Custo Estimado | — | — |
| `inicio_real` | `DATE` | Início Real | — | — |
| `termino_real` | `DATE` | Término Real | — | — |
| `duracao_real` | `INTEGER` | Duração Real | sem formatação | — |
| `percentual_concluido` | `DOUBLE` | Percentual Concluído | 2 casas | — |
| `custo_real` | `VARCHAR` | Custo Real | — | — |
| `dependencias` | `VARCHAR` | Dependências | — | — |
| `atraso` | `INTEGER` | Atraso (dias) | sem formatação | — |
| `responsavel_id` | `BIGINT` | ID do Responsável | sem formatação | — |
| `responsavel_nome_exibicao` | `VARCHAR` | Responsável | — | — |

## `RelProjetoCronogramaCsvRow`

Colunas do CSV bruto de `cronograma.csv` da fonte `Projeto` (uma linha por tarefa).

O nome `hirearquia` tem o typo de origem preservado: é o nome da propriedade no DTO
`RelProjetoCronogramaDto` (que também é resposta da API `POST /relatorio/projeto`) e
renomeá-lo mudaria o contrato daquele endpoint. O rótulo sai correto.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `projeto_id` | `BIGINT` | ID do Projeto | sem formatação | — |
| `tarefa_id` | `BIGINT` | ID da Tarefa | sem formatação | — |
| `hirearquia` | `VARCHAR` | Hierarquia | guard Excel | — |
| `tarefa` | `VARCHAR` | Tarefa | — | — |
| `inicio_planejado` | `DATE` | Início Planejado | — | — |
| `termino_planejado` | `DATE` | Término Planejado | — | — |
| `custo_estimado` | `VARCHAR` | Custo Estimado | — | — |
| `duracao_planejado` | `INTEGER` | Duração Planejada (dias) | sem formatação | — |
| `inicio_real` | `DATE` | Início Real | — | — |
| `termino_real` | `DATE` | Término Real | — | — |
| `duracao_real` | `INTEGER` | Duração Real (dias) | sem formatação | — |
| `percentual_concluido` | `DOUBLE` | Percentual Concluído | 2 casas, unidade `%` | — |
| `custo_real` | `VARCHAR` | Custo Real | — | — |

## `RelProjetosCronogramaCsvRow`

Código SOF: identificador, fica `VARCHAR` para não perder zeros à esquerda.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `projeto_id` | `INTEGER` | ID Projeto | sem formatação | — |
| `projeto_codigo` | `VARCHAR` | Código do Projeto | — | — |
| `tarefa_id` | `INTEGER` | ID da Tarefa | sem formatação | — |
| `hierarquia` | `VARCHAR` | Hierarquia | — | — |
| `numero` | `INTEGER` | Número | sem formatação | — |
| `nivel` | `INTEGER` | Nível | sem formatação | — |
| `tarefa` | `VARCHAR` | Tarefa | — | — |
| `inicio_planejado` | `DATE` | Início Planejado | — | — |
| `termino_planejado` | `DATE` | Término Planejado | — | — |
| `custo_estimado` | `VARCHAR` | Custo Estimado | — | — |
| `inicio_real` | `DATE` | Início Real | — | — |
| `termino_real` | `DATE` | Término Real | — | — |
| `duracao_real` | `INTEGER` | Duração Real (dias) | sem formatação | — |
| `percentual_concluido` | `DOUBLE` | % Concluído | 2 casas | — |
| `custo_real` | `VARCHAR` | Custo Real | — | — |
| `dependencias` | `VARCHAR` | Dependências | — | — |
| `atraso` | `INTEGER` | Atraso (dias) | sem formatação | — |
| `responsavel__id` | `INTEGER` | ID do Responsável | sem formatação | — |
| `responsavel__nome_exibicao` | `VARCHAR` | Nome do Responsável | — | — |

## `RelTransferenciaCronogramaCsvRow`

Colunas do CSV bruto de `cronograma.csv`.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `transferencia_id` | `BIGINT` | ID da Transferência | sem formatação | — |
| `hierarquia` | `VARCHAR` | Hierarquia | guard Excel | — |
| `tarefa` | `VARCHAR` | Tarefa | — | — |
| `inicio_planejado` | `DATE` | Início Planejado | — | — |
| `termino_planejado` | `DATE` | Término Planejado | — | — |
| `custo_estimado` | `DECIMAL(18,2)` | Custo Estimado | R$, 2 casas | — |
| `duracao_planejado` | `INTEGER` | Duração Planejada | sem formatação | — |

[← todos os arquivos](../report-columns.md)
