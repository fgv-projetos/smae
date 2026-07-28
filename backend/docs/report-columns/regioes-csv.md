# regioes.csv

Uma linha por variável regionalizada do indicador, série e período, com a hierarquia de regiões resolvida.

Fontes que produzem este arquivo: `PSIndicadores`

37 colunas.

Classe de linha: `RelIndicadoresRegioesCsvRow`

`regioes.csv` — série das variáveis regionalizadas dos mesmos indicadores.

Mesmo cabeçalho base do `indicadores.csv`, acrescido do recorte de variável/órgão/região.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `pdm_nome` | `VARCHAR` | Plano Setorial | — | — |
| `meta__codigo` | `VARCHAR` | Código da Meta | — | — |
| `meta__titulo` | `VARCHAR` | Título da Meta | — | — |
| `meta__id` | `BIGINT` | ID da Meta | sem formatação | — |
| `meta_tags_descricao` | `VARCHAR` | Meta Tags | — | — |
| `meta_tags_ids` | `VARCHAR` | Tags IDs | — | — |
| `iniciativa__codigo` | `VARCHAR` | Código da Iniciativa | — | — |
| `iniciativa__titulo` | `VARCHAR` | Título da Iniciativa | — | — |
| `iniciativa__id` | `BIGINT` | ID da Iniciativa | sem formatação | — |
| `atividade__codigo` | `VARCHAR` | Código da Atividade | — | — |
| `atividade__titulo` | `VARCHAR` | Título da Atividade | — | — |
| `atividade__id` | `BIGINT` | ID da Atividade | sem formatação | — |
| `indicador__codigo` | `VARCHAR` | Código do Indicador | — | — |
| `indicador__titulo` | `VARCHAR` | Título do Indicador | — | — |
| `indicador__contexto` | `VARCHAR` | Contexto | — | — |
| `indicador__complemento` | `VARCHAR` | Complementação | — | — |
| `indicador__id` | `BIGINT` | ID do Indicador | sem formatação | — |
| `variavel__orgao__id` | `BIGINT` | ID do órgão | sem formatação | — |
| `variavel__orgao__sigla` | `VARCHAR` | Sigla do órgão | — | — |
| `variavel__codigo` | `VARCHAR` | Código da Variável | — | — |
| `variavel__titulo` | `VARCHAR` | Título da Variável | — | — |
| `variavel__id` | `BIGINT` | ID da Variável | sem formatação | — |
| `regiao_id` | `BIGINT` | ID da Região da Variável | sem formatação | — |
| `regiao_nivel_4__id` | `BIGINT` | ID do Distrito | sem formatação | — |
| `regiao_nivel_4__codigo` | `VARCHAR` | Código do Distrito | — | — |
| `regiao_nivel_4__descricao` | `VARCHAR` | Descrição do Distrito | — | — |
| `regiao_nivel_3__id` | `BIGINT` | ID do Subprefeitura | sem formatação | — |
| `regiao_nivel_3__codigo` | `VARCHAR` | Código da Subprefeitura | — | — |
| `regiao_nivel_3__descricao` | `VARCHAR` | Descrição da Subprefeitura | — | — |
| `regiao_nivel_2__id` | `BIGINT` | ID da Região | sem formatação | — |
| `regiao_nivel_2__codigo` | `VARCHAR` | Código da Região | — | — |
| `regiao_nivel_2__descricao` | `VARCHAR` | Descrição da Região | — | — |
| `data_referencia` | `DATE` | Data de Referência | — | — |
| `serie` | `VARCHAR` | Serie | — | — |
| `data` | `VARCHAR` | Data | — | — |
| `valor` | `VARCHAR` | Valor | — | — |
| `valores_categorica` | `VARCHAR` | Valor Categórica | — | — |

[← todos os arquivos](../report-columns.md)
