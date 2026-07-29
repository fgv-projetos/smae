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
| `aditivo_id` | `BIGINT` | aditivo_id | sem formatação | — |
| `contrato_id` | `BIGINT` | contrato_id | sem formatação | — |
| `numero` | `VARCHAR` | numero | — | — |
| `tipo_aditivo_id` | `BIGINT` | tipo_aditivo_id | sem formatação | — |
| `tipo_aditivo_nome` | `VARCHAR` | tipo_aditivo_nome | — | — |
| `tipo_categoria` | `VARCHAR` | tipo_categoria | — | — |
| `data` | `DATE` | data | — | — |
| `data_termino_atual` | `DATE` | data_termino_atual | — | — |
| `valor` | `DECIMAL(18,2)` | valor | R$, 2 casas | — |
| `percentual_medido` | `DECIMAL(18,4)` | percentual_medido | 2 casas | — |

## `RelProjetoAditivoCsvRow`

Colunas do CSV bruto de `aditivos.csv` da fonte `Projeto` (uma linha por aditivo).

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `aditivo_id` | `BIGINT` | aditivo_id | sem formatação | — |
| `contrato_id` | `BIGINT` | contrato_id | sem formatação | — |
| `tipo_categoria` | `VARCHAR` | tipo_categoria | — | — |
| `tipo__id` | `BIGINT` | tipo.id | sem formatação | — |
| `tipo__nome` | `VARCHAR` | tipo.nome | — | — |
| `data` | `DATE` | data | — | — |
| `valor` | `DECIMAL(18,2)` | valor | R$, 2 casas | — |
| `percentual_medido` | `DECIMAL(18,4)` | percentual_medido | 2 casas, unidade `%` | — |
| `data_termino_atual` | `DATE` | data_termino_atual | — | — |

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
