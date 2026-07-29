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
| `obra_id` | `BIGINT` | obra_id | sem formatação | — |
| `pdm_id` | `BIGINT` | pdm_id | sem formatação | — |
| `pdm_titulo` | `VARCHAR` | pdm_titulo | — | — |
| `meta_id` | `BIGINT` | meta_id | sem formatação | — |
| `meta_titulo` | `VARCHAR` | meta_titulo | — | — |
| `iniciativa_id` | `BIGINT` | iniciativa_id | sem formatação | — |
| `iniciativa_titulo` | `VARCHAR` | iniciativa_titulo | — | — |
| `atividade_id` | `BIGINT` | atividade_id | sem formatação | — |
| `atividade_titulo` | `VARCHAR` | atividade_titulo | — | — |

## `RelProjetoOrigemCsvRow`

Colunas do CSV bruto de `origens.csv` da fonte `Projeto`.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `projeto_id` | `BIGINT` | projeto_id | sem formatação | — |
| `pdm_id` | `BIGINT` | pdm_id | sem formatação | — |
| `pdm_titulo` | `VARCHAR` | pdm_titulo | — | — |
| `meta_id` | `BIGINT` | meta_id | sem formatação | — |
| `meta_titulo` | `VARCHAR` | meta_titulo | — | — |
| `iniciativa_id` | `BIGINT` | iniciativa_id | sem formatação | — |
| `iniciativa_titulo` | `VARCHAR` | iniciativa_titulo | — | — |
| `atividade_id` | `BIGINT` | atividade_id | sem formatação | — |
| `atividade_titulo` | `VARCHAR` | atividade_titulo | — | — |

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
