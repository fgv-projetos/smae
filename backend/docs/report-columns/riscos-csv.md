# riscos.csv

Riscos registrados no projeto.
Uma linha por risco registrado nos projetos filtrados.

Fontes que produzem este arquivo: `Projeto`, `Projetos`

20 colunas.

## `RelProjetoRiscoCsvRow`

Colunas do CSV bruto de `riscos.csv` (uma linha por risco do projeto).

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `risco_id` | `BIGINT` | risco_id | sem formatação | — |
| `codigo` | `INTEGER` | codigo | sem formatação | — |
| `titulo` | `VARCHAR` | titulo | — | — |
| `descricao` | `VARCHAR` | descricao | — | — |
| `probabilidade` | `INTEGER` | probabilidade | sem formatação | — |
| `probabilidade_descricao` | `VARCHAR` | probabilidade_descricao | — | — |
| `impacto` | `INTEGER` | impacto | sem formatação | — |
| `impacto_descricao` | `VARCHAR` | impacto_descricao | — | — |
| `grau` | `INTEGER` | grau | sem formatação | — |
| `grau_descricao` | `VARCHAR` | grau_descricao | — | — |
| `status` | `VARCHAR` | status | — | — |

## `RelProjetosRiscosCsvRow`

`hierarquia sigla latência` por dependência, concatenadas com `/`.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `projeto_id` | `INTEGER` | ID Projeto | sem formatação | — |
| `projeto_codigo` | `VARCHAR` | Código do Projeto | — | — |
| `codigo` | `INTEGER` | Código | sem formatação | — |
| `titulo` | `VARCHAR` | Título | — | — |
| `data_registro` | `DATE` | Data de Registro | — | — |
| `status_risco` | `VARCHAR` | Status do Risco | — | — |
| `descricao` | `VARCHAR` | Descrição | — | — |
| `causa` | `VARCHAR` | Causa | — | — |
| `consequencia` | `VARCHAR` | Consequência | — | — |
| `probabilidade` | `INTEGER` | Probabilidade | sem formatação | — |
| `probabilidade_descricao` | `VARCHAR` | Descrição da Probabilidade | — | — |
| `impacto` | `INTEGER` | Impacto | sem formatação | — |
| `impacto_descricao` | `VARCHAR` | Descrição do Impacto | — | — |
| `nivel` | `INTEGER` | Nível | sem formatação | — |
| `grau` | `INTEGER` | Grau | sem formatação | — |
| `grau_descricao` | `VARCHAR` | Descrição do Grau | — | — |
| `resposta` | `VARCHAR` | Resposta | — | — |
| `tarefas_afetadas` | `VARCHAR` | Tarefas Afetadas | — | — |

[← todos os arquivos](../report-columns.md)
