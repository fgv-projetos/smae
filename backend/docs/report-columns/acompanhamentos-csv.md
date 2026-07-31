# acompanhamentos.csv

Uma linha por item de acompanhamento das obras (acompanhamento × item, via LEFT JOIN 1:N).
Acompanhamentos registrados no projeto.
Uma linha por item de acompanhamento (o acompanhamento se repete quando tem mais de um encaminhamento).

Fontes que produzem este arquivo: `Obras`, `Projeto`, `Projetos`

23 colunas.

## `RelObrasAcompanhamentosCsvRow`

Colunas do CSV bruto de `acompanhamentos.csv`.

A ordem reproduz exatamente o antigo array `acompanhamentosFields`.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `obra_id` | `BIGINT` | obra_id | sem formatação | — |
| `obra_codigo` | `VARCHAR` | obra_codigo | — | — |
| `data_registro` | `DATE` | data_registro | — | — |
| `participantes` | `VARCHAR` | participantes | — | — |
| `cronograma_paralisado` | `BOOLEAN` | cronograma_paralisado | — | — |
| `prazo_encaminhamento` | `DATE` | prazo_encaminhamento | — | — |
| `pauta` | `VARCHAR` | pauta | — | — |
| `pauta_texto` | `VARCHAR` | pauta_texto | — | — |
| `prazo_realizado` | `DATE` | prazo_realizado | — | — |
| `detalhamento` | `VARCHAR` | detalhamento | — | — |
| `detalhamento_texto` | `VARCHAR` | detalhamento_texto | — | — |
| `encaminhamento` | `VARCHAR` | encaminhamento | — | — |
| `responsavel` | `VARCHAR` | responsavel | — | — |
| `observacao` | `VARCHAR` | observacao | — | — |
| `detalhamento_status` | `VARCHAR` | detalhamento_status | — | — |
| `pontos_atencao` | `VARCHAR` | pontos_atencao | — | — |
| `pontos_atencao_texto` | `VARCHAR` | pontos_atencao_texto | — | — |
| `riscos` | `VARCHAR` | riscos | — | — |

## `RelProjetoAcompanhamentoCsvRow`

Colunas do CSV bruto de `acompanhamentos.csv` (uma linha por acompanhamento do projeto).

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `acompanhamento_id` | `BIGINT` | acompanhamento_id | sem formatação | — |
| `projeto_id` | `BIGINT` | projeto_id | sem formatação | — |
| `acompanhamento_tipo` | `VARCHAR` | acompanhamento_tipo | — | — |
| `numero` | `INTEGER` | numero | sem formatação | — |
| `data_registro` | `DATE` | data_registro | — | — |
| `participantes` | `VARCHAR` | participantes | — | — |
| `detalhamento` | `VARCHAR` | detalhamento | — | — |
| `observacao` | `VARCHAR` | observacao | — | — |
| `detalhamento_status` | `VARCHAR` | detalhamento_status | — | — |
| `pontos_atencao` | `VARCHAR` | pontos_atencao | — | — |
| `pauta` | `VARCHAR` | pauta | — | — |
| `cronograma_paralisado` | `BOOLEAN` | cronograma_paralisado | — | — |
| `riscos` | `VARCHAR` | riscos | — | — |
| `pauta_texto` | `VARCHAR` | pauta_texto | — | — |
| `detalhamento_texto` | `VARCHAR` | detalhamento_texto | — | — |
| `pontos_atencao_texto` | `VARCHAR` | pontos_atencao_texto | — | — |

## `RelProjetosAcompanhamentosCsvRow`

Custo em relação ao projeto todo. O rótulo já traz o `%`, então não há `unit`.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `projeto_id` | `INTEGER` | ID Projeto | sem formatação | — |
| `projeto_codigo` | `VARCHAR` | Código do Projeto | — | — |
| `data_registro` | `DATE` | Data do Registro | — | — |
| `participantes` | `VARCHAR` | Participantes | — | — |
| `cronograma_paralisado` | `BOOLEAN` | Cronograma Paralisado | — | — |
| `prazo_encaminhamento` | `DATE` | Prazo de Encaminhamento | — | — |
| `pauta` | `VARCHAR` | Pauta | — | — |
| `pauta_texto` | `VARCHAR` | Pauta Texto | — | — |
| `prazo_realizado` | `DATE` | Prazo Realizado | — | — |
| `detalhamento` | `VARCHAR` | Detalhamento | — | — |
| `detalhamento_texto` | `VARCHAR` | Detalhamento Texto | — | — |
| `encaminhamento` | `VARCHAR` | Encaminhamento | — | — |
| `responsavel` | `VARCHAR` | Responsável | — | — |
| `observacao` | `VARCHAR` | Observação | — | — |
| `detalhamento_status` | `VARCHAR` | Status Detalhado | — | — |
| `pontos_atencao` | `VARCHAR` | Pontos de Atenção | — | — |
| `pontos_atencao_texto` | `VARCHAR` | Pontos de Atenção Texto | — | — |
| `riscos` | `VARCHAR` | Códigos dos Riscos | — | — |

[← todos os arquivos](../report-columns.md)
