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
| `obra_id` | `BIGINT` | obra_id | sem formatação | — |
| `valor_percentual` | `DOUBLE` | valor_percentual | 2 casas | — |
| `valor_nominal` | `DECIMAL(18,2)` | valor_nominal | R$, 2 casas | — |
| `fonte_recurso_ano` | `INTEGER` | fonte_recurso_ano | sem formatação | — |
| `fonte_recurso_cod_sof` | `VARCHAR` | fonte_recurso_cod_sof | — | — |

[← todos os arquivos](../report-columns.md)
