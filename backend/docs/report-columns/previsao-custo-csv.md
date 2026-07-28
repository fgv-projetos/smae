# previsao-custo.csv

Uma linha por orçamento previsto (última revisão) do ano de referência, com o recorte de Meta/Iniciativa/Atividade.
Uma linha por orçamento previsto (última revisão) do ano de referência, com o recorte de Projeto/Obra.

Fontes que produzem este arquivo: `PSPrevisaoCusto`, `ProjetoPrevisaoCusto`, `ObrasPrevisaoCusto`

20 colunas.

## `RelPrevisaoCustoPdmCsvRow`

Variante com PDM: as três primeiras colunas descrevem Meta / Iniciativa / Atividade.

Os rótulos de iniciativa e atividade são configuráveis por PDM (`rotulo_iniciativa` /
`rotulo_atividade`). Aqui ficam os padrões do banco ("Iniciativa"/"Atividade"); o
`describeSchema()` do serviço sobrescreve com os rótulos do PDM da execução, reproduzindo
o `'Código da ' + pdm.rotulo_iniciativa` que a extração montava antes.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `meta__codigo` | `VARCHAR` | Código da Meta | — | — |
| `meta__titulo` | `VARCHAR` | Título da Meta | — | — |
| `meta__id` | `BIGINT` | ID da Meta | sem formatação | — |
| `iniciativa__codigo` | `VARCHAR` | Código da Iniciativa | — | — |
| `iniciativa__titulo` | `VARCHAR` | Título da Iniciativa | — | — |
| `iniciativa__id` | `BIGINT` | ID da Iniciativa | sem formatação | — |
| `atividade__codigo` | `VARCHAR` | Código da Atividade | — | — |
| `atividade__titulo` | `VARCHAR` | Título da Atividade | — | — |
| `atividade__id` | `BIGINT` | ID da Atividade | sem formatação | — |
| `id` | `BIGINT` | id | sem formatação | — |
| `versao_anterior_id` | `BIGINT` | id_versao_anterior | sem formatação | ID da revisão anterior deste orçamento previsto (vazio na primeira versão). |
| `projeto_atividade` | `VARCHAR` | projeto_atividade | — | — |
| `criado_em` | `TIMESTAMP` | criado_em | — | — |
| `ano_referencia` | `INTEGER` | ano_referencia | sem formatação | — |
| `custo_previsto` | `DECIMAL(18,2)` | custo_previsto | 2 casas | — |
| `parte_dotacao` | `VARCHAR` | parte_dotacao | — | — |
| `atualizado_em` | `TIMESTAMP` | atualizado_em | — | — |

## `RelPrevisaoCustoProjetoCsvRow`

Variante sem PDM (Portfólio de Projetos / Obras): as três primeiras colunas descrevem o
Projeto. As demais são idênticas às da variante de PDM.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `projeto__codigo` | `VARCHAR` | Código Projeto | — | — |
| `projeto__nome` | `VARCHAR` | Nome do Projeto | — | — |
| `projeto__id` | `BIGINT` | ID do Projeto | sem formatação | — |
| `id` | `BIGINT` | id | sem formatação | — |
| `versao_anterior_id` | `BIGINT` | id_versao_anterior | sem formatação | ID da revisão anterior deste orçamento previsto (vazio na primeira versão). |
| `projeto_atividade` | `VARCHAR` | projeto_atividade | — | — |
| `criado_em` | `TIMESTAMP` | criado_em | — | — |
| `ano_referencia` | `INTEGER` | ano_referencia | sem formatação | — |
| `custo_previsto` | `DECIMAL(18,2)` | custo_previsto | 2 casas | — |
| `parte_dotacao` | `VARCHAR` | parte_dotacao | — | — |
| `atualizado_em` | `TIMESTAMP` | atualizado_em | — | — |

[← todos os arquivos](../report-columns.md)
