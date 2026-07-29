# projeto-status.csv

Uma linha por projeto do portfólio, com o status do cronograma e o último acompanhamento.

Fontes que produzem este arquivo: `ProjetoStatus`

11 colunas.

Classe de linha: `RelProjetoStatusCsvRow`

O nome do arquivo depende de `params.tipo_pdm` (`projeto-status.csv` para `PP`,
`obra-status.csv` caso contrário), e `@ReportRows.arquivo` é estático — daí duas classes.
As colunas são idênticas entre as duas variantes, então ficam declaradas uma única vez na
base: `getReportRowSchema` percorre a cadeia de protótipos e herda as colunas do pai.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `id` | `INTEGER` | id | sem formatação | — |
| `portfolio_id` | `INTEGER` | portfolio_id | sem formatação | — |
| `codigo` | `VARCHAR` | codigo | — | — |
| `nome` | `VARCHAR` | nome | — | — |
| `previsao_custo` | `DOUBLE` | previsao_custo | R$, 2 casas | — |
| `realizado_custo` | `DOUBLE` | realizado_custo | R$, 2 casas | — |
| `cronograma` | `VARCHAR` | cronograma | — | — |
| `orgao_responsavel_sigla` | `VARCHAR` | orgao_responsavel_sigla | — | — |
| `detalhamento` | `VARCHAR` | detalhamento | — | — |
| `pontos_atencao` | `VARCHAR` | pontos_atencao | — | — |
| `tarefas` | `VARCHAR` | tarefas | — | — |

[← todos os arquivos](../report-columns.md)
