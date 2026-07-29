# demandas.csv

Uma linha por demanda, com os dados de responsável, projeto, valor e área temática.

Fontes que produzem este arquivo: `Demandas`

18 colunas.

Classe de linha: `RelDemandasCsvRow`

Colunas do CSV **bruto** de `demandas.csv`.

A ordem de declaração é a ordem das colunas no arquivo bruto e também a ordem padrão
quando nenhum modelo é aplicado. O schema é plano (uma linha por demanda), então nenhum
nome precisa do `__` usado nos relatórios aninhados.

Regra geral: valores aqui são "compute store" — números como números, datas em ISO
(`YYYY-MM-DD`), sem máscara de moeda e sem o hack `="valor"`. Moeda, separador decimal,
`dd/mm/aaaa` são aplicados na etapa de pós-processamento.

`status` e `finalidade` saem com o valor cru do enum do Prisma (`DemandaStatus` /
`DemandaFinalidade`), exatamente como o relatório já fazia — não existe hoje tradução
humana desses valores e inventá-la aqui mudaria o conteúdo entregue.

A extração antiga envolvia **todo** campo string em `="..."` (`formatExcelString`), e a
migração reproduziu isso declarando o guard no schema. O guard foi removido do pipeline:
o CSV agora entrega o valor cru. Quem abre o arquivo direto no Excel perde zeros à
esquerda em CEP e vê código virar número — o caminho para o Excel é o `.xlsx` que sai ao
lado do CSV, onde a célula nasce VARCHAR.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `id` | `BIGINT` | ID | sem formatação | — |
| `status` | `VARCHAR` | Status | — | — |
| `data_registro` | `DATE` | Data de Registro | — | — |
| `data_publicado` | `DATE` | Data de Publicação | — | — |
| `orgao_gestor` | `VARCHAR` | Gestor Municipal | — | — |
| `unidade_responsavel` | `VARCHAR` | Unidade Responsável | — | — |
| `nome_responsavel` | `VARCHAR` | Nome do Responsável | — | — |
| `cargo_responsavel` | `VARCHAR` | Cargo do Responsável | — | — |
| `email_responsavel` | `VARCHAR` | E-mail do Responsável | — | — |
| `telefone_responsavel` | `VARCHAR` | Telefone do Responsável | — | — |
| `nome_projeto` | `VARCHAR` | Nome do Projeto | — | — |
| `descricao` | `VARCHAR` | Descrição | — | — |
| `justificativa` | `VARCHAR` | Justificativa | — | — |
| `valor` | `DECIMAL(18,2)` | Valor | R$, 2 casas | — |
| `finalidade` | `VARCHAR` | Finalidade | — | — |
| `observacao` | `VARCHAR` | Observação | — | — |
| `area_tematica` | `VARCHAR` | Área Temática | — | — |
| `acoes` | `VARCHAR` | Ação | — | — |

[← todos os arquivos](../report-columns.md)
