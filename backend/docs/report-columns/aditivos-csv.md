# aditivos.csv

Uma linha por aditivo dos contratos vinculados às obras.
Aditivos e reajustes dos contratos vinculados ao projeto.
Uma linha por aditivo/reajuste dos contratos dos projetos filtrados.

Fontes que produzem este arquivo: `Obras`, `Projeto`, `Projetos`

12 colunas.

## `RelObrasAditivosCsvRow`

Colunas do CSV bruto de `aditivos.csv`.

Ordem do `SELECT` de `_queryDataAditivos()` — sem `fields` explícito.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `aditivo_id` | `BIGINT` | ID do Aditivo | sem formatação | — |
| `contrato_id` | `BIGINT` | ID do Contrato | sem formatação | — |
| `numero` | `VARCHAR` | Número | guard Excel | — |
| `tipo_aditivo_id` | `BIGINT` | ID do Tipo de Aditivo | sem formatação | — |
| `tipo_aditivo_nome` | `VARCHAR` | Tipo de Aditivo | — | — |
| `tipo_categoria` | `VARCHAR` | Categoria do Tipo | — | — |
| `data` | `DATE` | Data | — | — |
| `data_termino_atual` | `DATE` | Data de Término Atual | — | — |
| `valor` | `DECIMAL(18,2)` | Valor | R$, 2 casas | — |
| `percentual_medido` | `DECIMAL(18,4)` | Percentual Medido | 2 casas | — |

## `RelProjetoAditivoCsvRow`

Colunas do CSV bruto de `aditivos.csv` da fonte `Projeto` (uma linha por aditivo).

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `aditivo_id` | `BIGINT` | ID do Aditivo | sem formatação | — |
| `contrato_id` | `BIGINT` | ID do Contrato | sem formatação | — |
| `tipo_categoria` | `VARCHAR` | Categoria do Tipo | — | — |
| `tipo__id` | `BIGINT` | Tipo de Aditivo - ID | sem formatação | — |
| `tipo__nome` | `VARCHAR` | Tipo de Aditivo | — | — |
| `data` | `DATE` | Data | — | — |
| `valor` | `DECIMAL(18,2)` | Valor | R$, 2 casas | — |
| `percentual_medido` | `DECIMAL(18,4)` | Percentual Medido | 2 casas, unidade `%` | — |
| `data_termino_atual` | `DATE` | Data de Término Atual | — | — |

## `RelProjetosAditivosCsvRow`

Já formatado por `f_formata_cnpj` — limpeza/máscara de domínio, feita no SQL.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `aditivo_id` | `INTEGER` | ID Aditivo | sem formatação | — |
| `contrato_id` | `INTEGER` | ID Contrato | sem formatação | — |
| `tipo_categoria` | `VARCHAR` | Categoria | — | — |
| `tipo__nome` | `VARCHAR` | Tipo Aditivo | — | — |
| `data` | `DATE` | Data | — | — |
| `valor` | `DECIMAL(18,2)` | Valor | R$, 2 casas | — |
| `percentual_medido` | `DECIMAL(18,4)` | % Execução | 4 casas | — |
| `data_termino_atual` | `DATE` | Data Término Atual | — | — |

[← todos os arquivos](../report-columns.md)
