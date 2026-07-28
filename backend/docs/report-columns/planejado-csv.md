# planejado.csv

Orçamento planejado. Uma linha por registro de orçamento planejado no Analítico, ou por dotação/ano agrupada no Consolidado. As colunas de meta/iniciativa/atividade só existem quando o relatório roda sobre um plano (sem plano, saem as colunas de projeto).

Fontes que produzem este arquivo: `PSOrcamento`, `ProjetoOrcamento`, `ObrasOrcamento`

27 colunas.

Classe de linha: `RelOrcamentoPlanejadoCsvRow`

Superconjunto das colunas de `planejado.csv`.

Mesmo bloco de meta/iniciativa/atividade/projeto do executado, sem as colunas de execução.
Ver o comentário de `fontes` em {@link RelOrcamentoExecutadoCsvRow}.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `ano` | `INTEGER` | ano | sem formatação | Ano de referência do orçamento planejado. |
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
| `logs` | `VARCHAR` | logs | — | — |

[← todos os arquivos](../report-columns.md)
