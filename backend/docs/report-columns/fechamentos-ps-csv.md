# fechamentos-ps.csv

Uma linha por fechamento de meta no ciclo mensal.

Fontes que produzem este arquivo: `PSMonitoramentoMensal`

8 colunas.

Classe de linha: `RelPsMonitoramentoMensalFechamentoCsvRow`

`fechamentos-ps.csv` — uma linha por fechamento de meta do ciclo
(só as metas que têm fechamento entram).

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `id` | `BIGINT` | ID | sem formatação | — |
| `criador_nome_exibicao` | `VARCHAR` | Criador | — | — |
| `criado_em` | `TIMESTAMP` | Criado Em | — | — |
| `comentario` | `VARCHAR` | Comentário | — | — |
| `referencia_data` | `DATE` | Data de Referência | — | — |
| `meta_id` | `BIGINT` | ID da Meta | sem formatação | — |
| `meta_titulo` | `VARCHAR` | Título da Meta | — | — |
| `meta_codigo` | `VARCHAR` | Código da Meta | — | — |

[← todos os arquivos](../report-columns.md)
