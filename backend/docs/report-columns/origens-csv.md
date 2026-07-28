# origens.csv

Uma linha por origem (meta / iniciativa / atividade do PdM) vinculada à obra.
Origens (meta/iniciativa/atividade do PdM) vinculadas ao projeto.
Uma linha por origem (meta/iniciativa/atividade de PDM) vinculada ao projeto.

Fontes que produzem este arquivo: `Obras`, `Projeto`, `Projetos`

10 colunas.

## `RelObrasOrigensCsvRow`

Colunas do CSV bruto de `origens.csv`.

Ordem do `SELECT` de `_queryDataOrigens()` — sem `fields` explícito.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `obra_id` | `BIGINT` | ID da Obra | sem formatação | — |
| `pdm_id` | `BIGINT` | ID do Programa de Metas | sem formatação | — |
| `pdm_titulo` | `VARCHAR` | Programa de Metas | — | — |
| `meta_id` | `BIGINT` | ID da Meta | sem formatação | — |
| `meta_titulo` | `VARCHAR` | Meta | — | — |
| `iniciativa_id` | `BIGINT` | ID da Iniciativa | sem formatação | — |
| `iniciativa_titulo` | `VARCHAR` | Iniciativa | — | — |
| `atividade_id` | `BIGINT` | ID da Atividade | sem formatação | — |
| `atividade_titulo` | `VARCHAR` | Atividade | — | — |

## `RelProjetoOrigemCsvRow`

Colunas do CSV bruto de `origens.csv` da fonte `Projeto`.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `projeto_id` | `BIGINT` | ID do Projeto | sem formatação | — |
| `pdm_id` | `BIGINT` | ID do PdM | sem formatação | — |
| `pdm_titulo` | `VARCHAR` | PdM | — | — |
| `meta_id` | `BIGINT` | ID da Meta | sem formatação | — |
| `meta_titulo` | `VARCHAR` | Meta | — | — |
| `iniciativa_id` | `BIGINT` | ID da Iniciativa | sem formatação | — |
| `iniciativa_titulo` | `VARCHAR` | Iniciativa | — | — |
| `atividade_id` | `BIGINT` | ID da Atividade | sem formatação | — |
| `atividade_titulo` | `VARCHAR` | Atividade | — | — |

## `RelProjetosOrigensCsvRow`

`Decimal(7,4)` no banco. O rótulo já traz o `%`, então não há `unit`.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `projeto_id` | `INTEGER` | ID Projeto | sem formatação | — |
| `pdm_id` | `INTEGER` | ID PDM | sem formatação | — |
| `pdm_titulo` | `VARCHAR` | Título do PDM | — | — |
| `meta_id` | `INTEGER` | ID Meta | sem formatação | — |
| `meta_titulo` | `VARCHAR` | Título da Meta | — | — |
| `iniciativa_id` | `INTEGER` | ID Iniciativa | sem formatação | — |
| `iniciativa_titulo` | `VARCHAR` | Título da Iniciativa | — | — |
| `atividade_id` | `INTEGER` | ID Atividade | sem formatação | — |
| `atividade_titulo` | `VARCHAR` | Título da Atividade | — | — |

[← todos os arquivos](../report-columns.md)
