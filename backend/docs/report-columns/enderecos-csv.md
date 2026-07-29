# enderecos.csv

Uma linha por endereço/geolocalização vinculada a uma demanda.
Uma linha por localização geográfica (ou região) vinculada à obra.
Endereços (geolocalização) vinculados ao projeto.

Fontes que produzem este arquivo: `Demandas`, `Obras`, `Projeto`

23 colunas.

## `RelDemandasEnderecosCsvRow`

Colunas do CSV bruto de `enderecos.csv`.

Arquivo **condicional**: só é emitido quando há ao menos uma referência de
geolocalização nas demandas filtradas. O schema, porém, é sempre declarado — do
contrário um modelo salvo não teria como referenciar o arquivo.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `demanda_id` | `BIGINT` | ID da Demanda | sem formatação | — |
| `nome_projeto` | `VARCHAR` | Nome do Projeto | — | — |
| `cep` | `VARCHAR` | CEP | — | — |
| `endereco` | `VARCHAR` | Endereço | — | — |
| `bairro` | `VARCHAR` | Bairro | — | — |
| `subprefeitura` | `VARCHAR` | Subprefeitura | — | — |
| `distrito` | `VARCHAR` | Distrito | — | — |

## `RelObrasEnderecosCsvRow`

Colunas do CSV bruto de `enderecos.csv`.

Único arquivo deste relatório que já declarava rótulos próprios (`fields` com
`{ value, label }`). Eles foram preservados **byte-a-byte**, inclusive os pontos de
`geojson.properties.*`: são o que documenta a proveniência de cada campo dentro do
GeoJSON e trocá-los mudaria o cabeçalho entregue hoje. Ponto no `label` é inofensivo —
a restrição de `.` vale só para o `name` da coluna.

Mesmo nome de arquivo do `enderecos.csv` de `Demandas`; veja a nota em
`RelObrasCronogramaCsvRow`.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `obra_id` | `BIGINT` | obra_id | sem formatação | — |
| `endereco` | `VARCHAR` | endereco | — | — |
| `zona` | `VARCHAR` | zona | — | — |
| `distrito` | `VARCHAR` | distrito | — | — |
| `subprefeitura` | `VARCHAR` | subprefeitura | — | — |
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

## `RelProjetoEnderecoCsvRow`

Colunas do CSV bruto de `enderecos.csv` da fonte `Projeto`.

Este arquivo já tinha `fields` explícito e os rótulos abaixo são **byte-a-byte** os que o
relatório emite hoje — incluindo os que são caminhos dentro do GeoJSON de origem
(`geojson.properties.cep`, `geojson.geometry_name`, ...) e os cinco primeiros, que são o
próprio nome técnico da coluna em minúsculas. Rótulo com ponto é permitido (é só o
cabeçalho); o que não pode ter ponto é o nome da coluna.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `projeto_id` | `BIGINT` | projeto_id | sem formatação | — |
| `endereco` | `VARCHAR` | endereco | — | — |
| `zona` | `VARCHAR` | zona | — | — |
| `distrito` | `VARCHAR` | distrito | — | — |
| `subprefeitura` | `VARCHAR` | subprefeitura | — | — |
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
