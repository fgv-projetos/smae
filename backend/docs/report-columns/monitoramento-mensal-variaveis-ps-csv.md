# monitoramento-mensal-variaveis-ps.csv

Uma linha por série de variável (Previsto/Realizado/…) do ciclo mensal filtrado.

Fontes que produzem este arquivo: `PSMonitoramentoMensal`

23 colunas.

Classe de linha: `RelPsMonitoramentoMensalVariaveisCsvRow`

`monitoramento-mensal-variaveis-ps.csv` — uma linha por série de variável coletada no
mês/ano do filtro.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `codigo_indicador` | `VARCHAR` | Código do Indicador | — | — |
| `titulo_indicador` | `VARCHAR` | Título do Indicador | — | — |
| `indicador_id` | `BIGINT` | ID do Indicador | sem formatação | — |
| `codigo_variavel` | `VARCHAR` | Código da Variável | — | — |
| `titulo_variavel` | `VARCHAR` | Título da Variável | — | — |
| `variavel_id` | `BIGINT` | ID da Variável | sem formatação | — |
| `municipio` | `VARCHAR` | Município | — | — |
| `municipio_id` | `BIGINT` | Código do Município | sem formatação | — |
| `regiao` | `VARCHAR` | Região | — | — |
| `regiao_id` | `BIGINT` | ID da Região | sem formatação | — |
| `subprefeitura` | `VARCHAR` | Subprefeitura | — | — |
| `subprefeitura_id` | `BIGINT` | ID da Subprefeitura | sem formatação | — |
| `distrito` | `VARCHAR` | Distrito | — | — |
| `distrito_id` | `BIGINT` | ID do Distrito | sem formatação | — |
| `serie` | `VARCHAR` | Serie | — | — |
| `data_referencia` | `DATE` | Data de Referencia | — | — |
| `valor_nominal` | `DECIMAL(18,4)` | Valor Nominal | 4 casas | — |
| `valor_categorica` | `VARCHAR` | Valor Categórica | — | — |
| `eh_previa` | `VARCHAR` | É Prévia | — | Sempre vazia nesta fonte: `eh_previa` só existe em `serie_indicador` (nível indicador), e esta consulta lê `serie_variavel`. Mantida pelo layout histórico. |
| `data_preenchimento` | `TIMESTAMP` | Data da Coleta | — | — |
| `analise_qualitativa_coleta` | `VARCHAR` | Analise Qualitativa Coleta | — | — |
| `analise_qualitativa_aprovador` | `VARCHAR` | Analise Qualitativa Conferidor | — | — |
| `analise_qualitativa_liberador` | `VARCHAR` | Analise Qualitativa Liberador | — | — |

[← todos os arquivos](../report-columns.md)
