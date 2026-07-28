# geoloc.csv

Uma linha por endereço/geolocalização vinculada aos projetos filtrados.

Fontes que produzem este arquivo: `Projetos`

20 colunas.

Classe de linha: `RelProjetosGeolocCsvRow`

Os rótulos deste arquivo são caminhos do GeoJSON de origem (`geojson.properties.cep`, ...).
São técnicos, mas é o que o relatório entrega hoje — mantidos byte-a-byte. Os nomes de
máquina continuam sendo os campos planos do DTO (`cep`, `rua`, ...), sem ponto.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `projeto_id` | `INTEGER` | ID Projeto | sem formatação | — |
| `endereco` | `VARCHAR` | Endereço | — | — |
| `zona` | `VARCHAR` | Zona | — | — |
| `distrito` | `VARCHAR` | Distrito | — | — |
| `subprefeitura` | `VARCHAR` | Subprefeitura | — | — |
| `coordinates` | `VARCHAR` | geojson.geometry.coordinates | — | — |
| `geojson_type` | `VARCHAR` | geojson.type | — | — |
| `geometry_type` | `VARCHAR` | geojson.geometry.type | — | — |
| `cep` | `VARCHAR` | geojson.properties.cep | — | — |
| `rua` | `VARCHAR` | geojson.properties.rua | — | — |
| `pais` | `VARCHAR` | geojson.properties.pais | — | — |
| `bairro` | `VARCHAR` | geojson.properties.bairro | — | — |
| `cidade` | `VARCHAR` | geojson.properties.cidade | — | — |
| `estado` | `VARCHAR` | geojson.properties.estado | — | — |
| `rotulo` | `VARCHAR` | geojson.properties.rotulo | — | — |
| `osm_type` | `VARCHAR` | geojson.properties.osm_type | — | — |
| `codigo_pais` | `VARCHAR` | geojson.properties.codigo_pais | — | — |
| `string_endereco` | `VARCHAR` | geojson.properties.string_endereco | — | — |
| `geometry_name` | `VARCHAR` | geojson.geometry_name | — | — |
| `bbox` | `VARCHAR` | geojson.bbox | — | — |

[← todos os arquivos](../report-columns.md)
