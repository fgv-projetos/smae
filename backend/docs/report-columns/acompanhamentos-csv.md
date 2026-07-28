# acompanhamentos.csv

Uma linha por item de acompanhamento das obras (acompanhamento × item, via LEFT JOIN 1:N).
Acompanhamentos registrados no projeto.
Uma linha por item de acompanhamento (o acompanhamento se repete quando tem mais de um encaminhamento).

Fontes que produzem este arquivo: `Obras`, `Projeto`, `Projetos`

24 colunas.

## `RelObrasAcompanhamentosCsvRow`

Colunas do CSV bruto de `acompanhamentos.csv`.

A ordem reproduz exatamente o antigo array `acompanhamentosFields`.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `obra_id` | `BIGINT` | ID da Obra | sem formatação | — |
| `obra_codigo` | `VARCHAR` | Código da Obra | guard Excel | — |
| `data_registro` | `DATE` | Data do Registro | — | — |
| `participantes` | `VARCHAR` | Participantes | — | — |
| `cronograma_paralizado` | `BOOLEAN` | Cronograma Paralisado | — | — |
| `prazo_encaminhamento` | `DATE` | Prazo do Encaminhamento | — | — |
| `pauta` | `VARCHAR` | Pauta | — | — |
| `pauta_texto` | `VARCHAR` | Pauta (texto) | — | — |
| `prazo_realizado` | `DATE` | Prazo Realizado | — | — |
| `detalhamento` | `VARCHAR` | Detalhamento | — | — |
| `detalhamento_texto` | `VARCHAR` | Detalhamento (texto) | — | — |
| `encaminhamento` | `VARCHAR` | Encaminhamento | — | — |
| `responsavel` | `VARCHAR` | Responsável | — | — |
| `observacao` | `VARCHAR` | Observação | — | — |
| `detalhamento_status` | `VARCHAR` | Detalhamento do Status | — | — |
| `pontos_atencao` | `VARCHAR` | Pontos de Atenção | — | — |
| `pontos_atencao_texto` | `VARCHAR` | Pontos de Atenção (texto) | — | — |
| `riscos` | `VARCHAR` | Riscos | — | — |

## `RelProjetoAcompanhamentoCsvRow`

Colunas do CSV bruto de `acompanhamentos.csv` (uma linha por acompanhamento do projeto).

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `acompanhamento_id` | `BIGINT` | ID do Acompanhamento | sem formatação | — |
| `projeto_id` | `BIGINT` | ID do Projeto | sem formatação | — |
| `acompanhamento_tipo` | `VARCHAR` | Tipo de Acompanhamento | — | — |
| `numero` | `INTEGER` | Número | sem formatação | — |
| `data_registro` | `DATE` | Data do Registro | — | — |
| `participantes` | `VARCHAR` | Participantes | — | — |
| `detalhamento` | `VARCHAR` | Detalhamento | — | — |
| `observacao` | `VARCHAR` | Observação | — | — |
| `detalhamento_status` | `VARCHAR` | Detalhamento do Status | — | — |
| `pontos_atencao` | `VARCHAR` | Pontos de Atenção | — | — |
| `pauta` | `VARCHAR` | Pauta | — | — |
| `cronograma_paralisado` | `BOOLEAN` | Cronograma Paralisado | — | — |
| `riscos` | `VARCHAR` | Riscos | — | — |
| `pauta_texto` | `VARCHAR` | Pauta (texto) | — | — |
| `detalhamento_texto` | `VARCHAR` | Detalhamento (texto) | — | — |
| `pontos_atencao_texto` | `VARCHAR` | Pontos de Atenção (texto) | — | — |

## `RelProjetosAcompanhamentosCsvRow`

Custo em relação ao projeto todo. O rótulo já traz o `%`, então não há `unit`.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `projeto_id` | `INTEGER` | ID Projeto | sem formatação | — |
| `projeto_codigo` | `VARCHAR` | Código do Projeto | — | — |
| `data_registro` | `DATE` | Data do Registro | — | — |
| `participantes` | `VARCHAR` | Participantes | — | — |
| `cronograma_paralizado` | `BOOLEAN` | Cronograma Paralisado | — | — |
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
