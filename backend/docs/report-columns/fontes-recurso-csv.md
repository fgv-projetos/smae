# fontes_recurso.csv

Uma linha por fonte de recurso vinculada à obra.

Fontes que produzem este arquivo: `Obras`

5 colunas.

Classe de linha: `RelObrasFontesRecursoCsvRow`

Colunas do CSV bruto de `fontes_recurso.csv`.

Ordem do `SELECT` de `_queryDataFontesRecurso()` — o arquivo nunca teve `fields`
explícito, então o cabeçalho vinha da própria consulta.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `obra_id` | `BIGINT` | ID da Obra | sem formatação | — |
| `valor_percentual` | `DOUBLE` | Percentual | 2 casas | — |
| `valor_nominal` | `DECIMAL(18,2)` | Valor Nominal | R$, 2 casas | — |
| `fonte_recurso_ano` | `INTEGER` | Ano | sem formatação | — |
| `fonte_recurso_cod_sof` | `VARCHAR` | Código SOF | guard Excel | — |

[← todos os arquivos](../report-columns.md)
