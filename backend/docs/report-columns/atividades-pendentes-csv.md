# atividades-pendentes.csv

Uma linha por tarefa de cronograma de transferência com término planejado vencido e sem término real.

Fontes que produzem este arquivo: `AtvPendentes`

9 colunas.

Classe de linha: `RelCasaCivilAtividadesPendentesCsvRow`

Colunas do CSV **bruto** de `atividades-pendentes.csv`.

A ordem de declaração é a ordem das colunas no arquivo bruto e também a ordem padrão
quando nenhum modelo é aplicado — ela reproduz exatamente o array `fields` que o
relatório usava antes da migração.

O relatório é plano (uma linha por tarefa atrasada, vinda de um `$queryRaw` sem
objetos aninhados), então nenhum nome precisa do separador `__` usado nos relatórios
aninhados.

Regra geral: valores aqui são "compute store" — números como números, datas em ISO
(`YYYY-MM-DD`), `null` para ausência de valor, sem máscara de moeda e sem o hack
`="valor"`. Moeda, separador decimal, `dd/mm/aaaa` e o guard de texto do Excel são
aplicados na etapa de pós-processamento.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `identificador` | `VARCHAR` | Identificador | — | — |
| `parlamentares` | `VARCHAR` | Parlamentares | — | — |
| `valor` | `DECIMAL(18,2)` | Valor do Repasse | R$, 2 casas | — |
| `atividade` | `VARCHAR` | Atividade | — | — |
| `inicio_planejado` | `DATE` | Previsão de Início | — | — |
| `termino_planejado` | `DATE` | Previsão de Término | — | — |
| `inicio_real` | `DATE` | Início Real | — | — |
| `orgao_responsavel` | `VARCHAR` | Orgão Responsável | — | — |
| `responsavel_atividade` | `VARCHAR` | Responsável pela Atividade | — | — |

[← todos os arquivos](../report-columns.md)
