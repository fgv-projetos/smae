# monitoramento_planos_de_acao.csv

Uma linha por aferição de monitoramento dos planos de ação.

Fontes que produzem este arquivo: `Projetos`

6 colunas.

Classe de linha: `RelProjetosPlanoAcaoMonitoramentoCsvRow`

Custo em relação ao projeto todo. O rótulo já traz o `%`, então não há `unit`.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `projeto_id` | `INTEGER` | ID Projeto | sem formatação | — |
| `projeto_codigo` | `VARCHAR` | Código Projeto | — | — |
| `risco_codigo` | `INTEGER` | Código Risco | sem formatação | — |
| `plano_acao_id` | `INTEGER` | ID Plano de Ação | sem formatação | — |
| `data_afericao` | `DATE` | Data de aferição | — | — |
| `descricao` | `VARCHAR` | Descrição | — | — |

[← todos os arquivos](../report-columns.md)
