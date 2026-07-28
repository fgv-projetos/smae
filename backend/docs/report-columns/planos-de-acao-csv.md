# planos_de_acao.csv

Uma linha por plano de ação (contramedida) dos riscos dos projetos filtrados.

Fontes que produzem este arquivo: `Projetos`

13 colunas.

Classe de linha: `RelProjetosPlanoAcaoCsvRow`

Nomes das tarefas afetadas, concatenados com `|`.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `projeto_id` | `INTEGER` | ID Projeto | sem formatação | — |
| `projeto_codigo` | `VARCHAR` | Código do Projeto | — | — |
| `plano_acao_id` | `INTEGER` | ID do Plano de Ação | sem formatação | — |
| `risco_codigo` | `INTEGER` | Código do Risco | sem formatação | — |
| `contramedida` | `VARCHAR` | Contramedida | — | — |
| `contramedida_texto` | `VARCHAR` | Contramedida Texto | — | — |
| `medidas_de_contingencia` | `VARCHAR` | Medidas de Contingência | — | — |
| `medidas_de_contingencia_texto` | `VARCHAR` | Medidas de Contingência Texto | — | — |
| `prazo_contramedida` | `DATE` | Prazo da Contramedida | — | — |
| `custo` | `DOUBLE` | Custo (R$) | R$, 2 casas | — |
| `custo_percentual` | `DOUBLE` | Custo (%) | 2 casas | — |
| `responsavel` | `VARCHAR` | Responsável | — | — |
| `data_termino` | `DATE` | Data de Término | — | — |

[← todos os arquivos](../report-columns.md)
