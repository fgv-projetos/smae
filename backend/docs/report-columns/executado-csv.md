# executado.csv

Orçamento executado (realizado). Uma linha por item de orçamento realizado no Analítico, ou por dotação/processo/nota agrupada no Consolidado. As colunas de ano/mês só existem no Analítico e as de meta/iniciativa/atividade só existem quando o relatório roda sobre um plano (sem plano, saem as colunas de projeto).

Fontes que produzem este arquivo: `PSOrcamento`, `ProjetoOrcamento`, `ObrasOrcamento`

40 colunas.

Classe de linha: `RelOrcamentoExecutadoCsvRow`

Superconjunto das colunas de `executado.csv`.

`fontes` lista apenas as três fontes ativas. A fonte `Orcamento` (PDM antigo) usa o **mesmo**
service e continua passando por este schema em tempo de execução — ela só ficou de fora da
listagem porque está sendo descontinuada e não deve aparecer como customizável na API.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `mes` | `INTEGER` | mês | sem formatação | — |
| `ano` | `INTEGER` | ano | sem formatação | — |
| `mes_corrente` | `VARCHAR` | mês corrente | — | — |
| `meta__codigo` | `VARCHAR` | Código da Meta | — | — |
| `meta__titulo` | `VARCHAR` | Título da Meta | — | — |
| `meta__id` | `INTEGER` | ID da Meta | sem formatação | — |
| `iniciativa__codigo` | `VARCHAR` | Código da Iniciativa | — | — |
| `iniciativa__titulo` | `VARCHAR` | Título da Iniciativa | — | — |
| `iniciativa__id` | `INTEGER` | ID da Iniciativa | sem formatação | — |
| `atividade__codigo` | `VARCHAR` | Código da Atividade | — | — |
| `atividade__titulo` | `VARCHAR` | Título da Atividade | — | — |
| `atividade__id` | `INTEGER` | ID da Atividade | sem formatação | — |
| `projeto__codigo` | `VARCHAR` | Código Projeto | — | — |
| `projeto__nome` | `VARCHAR` | Nome do Projeto | — | — |
| `projeto__id` | `INTEGER` | ID do Projeto | sem formatação | — |
| `dotacao` | `VARCHAR` | dotacao | — | — |
| `processo` | `VARCHAR` | processo | — | — |
| `nota_empenho` | `VARCHAR` | nota_empenho | — | — |
| `orgao__codigo` | `VARCHAR` | orgao.codigo | — | — |
| `orgao__nome` | `VARCHAR` | orgao.nome | — | — |
| `unidade__codigo` | `VARCHAR` | unidade.codigo | — | — |
| `unidade__nome` | `VARCHAR` | unidade.nome | — | — |
| `fonte__codigo` | `VARCHAR` | fonte.codigo | — | — |
| `fonte__nome` | `VARCHAR` | fonte.nome | — | — |
| `acao_orcamentaria` | `VARCHAR` | acao_orcamentaria | — | — |
| `plan_dotacao_sincronizado_em` | `VARCHAR` | plan_dotacao_sincronizado_em | — | — |
| `plan_sof_val_orcado_atualizado` | `DECIMAL(18,2)` | plan_sof_val_orcado_atualizado | — | — |
| `plan_valor_planejado` | `DECIMAL(18,2)` | plan_valor_planejado | — | — |
| `plan_dotacao_ano_utilizado` | `INTEGER` | plan_dotacao_ano_utilizado | sem formatação | — |
| `plan_dotacao_mes_utilizado` | `INTEGER` | plan_dotacao_mes_utilizado | sem formatação | — |
| `dotacao_sincronizado_em` | `VARCHAR` | dotacao_sincronizado_em | — | — |
| `dotacao_valor_empenhado` | `DECIMAL(18,2)` | dotacao_valor_empenhado | — | — |
| `dotacao_valor_liquidado` | `DECIMAL(18,2)` | dotacao_valor_liquidado | — | — |
| `dotacao_ano_utilizado` | `INTEGER` | dotacao_ano_utilizado | sem formatação | — |
| `dotacao_mes_utilizado` | `INTEGER` | dotacao_mes_utilizado | sem formatação | — |
| `smae_valor_empenhado` | `DECIMAL(18,2)` | smae_valor_empenhado | — | — |
| `smae_valor_liquidado` | `DECIMAL(18,2)` | smae_valor_liquidado | — | — |
| `smae_percentual_empenhado` | `VARCHAR` | smae_percentual_empenhado | — | Percentual empenhado apurado pelo SMAE (`smae_percentual_empenho` no DTO). |
| `smae_percentual_liquidado` | `VARCHAR` | smae_percentual_liquidado | — | — |
| `logs` | `VARCHAR` | logs | — | — |

[← todos os arquivos](../report-columns.md)
