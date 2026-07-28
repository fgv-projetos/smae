# arquivos.csv

Uma linha por documento anexado à obra.
Documentos anexados ao projeto.
Uma linha por documento anexado aos projetos filtrados.

Fontes que produzem este arquivo: `Obras`, `Projeto`, `Projetos`

16 colunas.

## `RelObrasArquivosCsvRow`

Colunas do CSV bruto de `arquivos.csv`.

Ordem do `SELECT` de `_queryDataArquivos()` — sem `fields` explícito.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `obra_id` | `BIGINT` | ID da Obra | sem formatação | — |
| `obra_codigo` | `VARCHAR` | Código da Obra | guard Excel | — |
| `nome_original` | `VARCHAR` | Nome do Arquivo | — | — |
| `criado_em` | `TIMESTAMP` | Criado em | — | — |
| `criador_id` | `BIGINT` | ID do Criador | sem formatação | — |
| `criador_nome_exibicao` | `VARCHAR` | Criador | — | — |
| `caminho` | `VARCHAR` | Caminho | — | — |
| `descricao` | `VARCHAR` | Descrição | — | — |
| `arquivo_id` | `BIGINT` | ID do Arquivo | sem formatação | — |

## `RelProjetoArquivoCsvRow`

Colunas do CSV bruto de `arquivos.csv` (uma linha por documento anexado ao projeto).

Este arquivo já tinha `fields` explícito: os rótulos abaixo são **byte-a-byte** os que o
relatório emite hoje, incluindo `descricao do Documento` (sem acento e com "do Documento"
em maiúscula) e `ID do arquivo` — corrigir rótulo entregue ao usuário é decisão de negócio.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `arquivo__nome_original` | `VARCHAR` | Nome Original | — | — |
| `criado_em` | `TIMESTAMP` | Criado em | — | — |
| `criador__id` | `BIGINT` | Criador (ID) | sem formatação | — |
| `criador__nome_exibicao` | `VARCHAR` | Criador (Nome de Exibição) | — | — |
| `arquivo__caminho` | `VARCHAR` | Caminho no Object Storage | — | — |
| `descricao` | `VARCHAR` | descricao do Documento | — | — |
| `arquivo__id` | `BIGINT` | ID do arquivo | sem formatação | — |

## `RelProjetosArquivosCsvRow`

`Decimal(7,4)` no banco. O rótulo já traz o `%`, então não há `unit`.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `projeto_id` | `INTEGER` | ID Projeto | sem formatação | — |
| `projeto_codigo` | `VARCHAR` | Código do Projeto | — | — |
| `nome_original` | `VARCHAR` | Nome Original | — | — |
| `criado_em` | `TIMESTAMP` | Criado em | — | — |
| `criador_id` | `INTEGER` | Criador (ID) | sem formatação | — |
| `criador_nome_exibicao` | `VARCHAR` | Criador (Nome de Exibição) | — | — |
| `caminho` | `VARCHAR` | Caminho no Object Storage | — | — |
| `descricao` | `VARCHAR` | Descrição do Documento | — | — |
| `arquivo_id` | `INTEGER` | ID do Arquivo | sem formatação | — |

[← todos os arquivos](../report-columns.md)
