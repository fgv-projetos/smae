# tribunal-de-contas.csv

Uma linha por distribuição de recurso das transferências, no layout do Tribunal de Contas.

Fontes que produzem este arquivo: `TribunalDeContas`

13 colunas.

Classe de linha: `RelTribunalDeContasCsvRow`

Colunas do CSV **bruto** de `tribunal-de-contas.csv`.

A ordem de declaração é a ordem das colunas no arquivo bruto e também a ordem padrão
quando nenhum modelo é aplicado. O schema é plano (uma linha por distribuição de
recurso), então nenhum nome precisa do `__` usado nos relatórios aninhados.

Regra geral: valores aqui são "compute store" — números como números, datas em ISO
(`YYYY-MM-DD`), sem máscara de moeda e sem o hack `="valor"`. Moeda, separador decimal,
`dd/mm/aaaa` são aplicados na etapa de pós-processamento.

Os rótulos abaixo reproduzem exatamente os cabeçalhos que o relatório já emitia hoje,
incluindo 'Dotação Orçamentaria' (sem o acento em "Orçamentária"): o arquivo é entregue
ao Tribunal de Contas e a correção do rótulo teria de ser combinada com o negócio.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `emenda` | `VARCHAR` | Emenda | — | — |
| `programa` | `VARCHAR` | Programa | — | — |
| `ano` | `INTEGER` | Ano | sem formatação | — |
| `parlamentar` | `VARCHAR` | Parlamentar | — | — |
| `valor_repasse` | `DECIMAL(18,2)` | Valor de Repasse | R$, 2 casas | — |
| `acao` | `VARCHAR` | Ação | — | — |
| `gestor_municipal` | `VARCHAR` | Gestor Municipal | — | — |
| `prazo_vigencia` | `DATE` | Prazo de Vigência | — | — |
| `dotacao_orcamentaria` | `VARCHAR` | Dotação Orçamentaria | — | — |
| `rubrica_de_receita` | `VARCHAR` | Rubrica de Receita | — | — |
| `finalidade` | `VARCHAR` | Política pública | — | — |
| `valor_empenho` | `DECIMAL(18,2)` | Empenho | R$, 2 casas | — |
| `liquidacao_pagamento` | `DECIMAL(18,2)` | Liquidação/Pagamento | R$, 2 casas | — |

[← todos os arquivos](../report-columns.md)
