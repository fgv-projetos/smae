# transferencias.csv

Uma linha por distribuição de recurso da transferência (ou por transferência, sem distribuição).

Fontes que produzem este arquivo: `Transferencias`

68 colunas.

Classe de linha: `RelTransferenciasCsvRow`

Colunas do CSV **bruto** de `transferencias.csv`.

A ordem de declaração é a ordem das colunas no arquivo bruto e também a ordem padrão
quando nenhum modelo é aplicado. Os nomes usam `__` no lugar de `.` para o aninhamento
(`distribuicao_recurso`, `orgao_concedente`) porque o builder DuckDB interpreta ponto
como referência qualificada por fonte.

Regra geral: valores aqui são "compute store" — números como números, datas em ISO
(`YYYY-MM-DD`), sem máscara de moeda e sem o hack `="valor"`. Moeda, separador decimal,
`dd/mm/aaaa` e o guard de texto do Excel são aplicados na etapa de pós-processamento.

Booleanos que o negócio exibe como `Sim`/`Não` continuam sendo traduzidos na extração:
é tradução de domínio (e não formatação de locale), então permanece `VARCHAR`.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `id` | `BIGINT` | ID | sem formatação | — |
| `identificador` | `VARCHAR` | Identificador | — | — |
| `ano` | `INTEGER` | Ano | sem formatação | — |
| `objeto` | `VARCHAR` | Objeto | guard Excel | — |
| `detalhamento` | `VARCHAR` | Detalhamento | guard Excel | — |
| `clausula_suspensiva` | `VARCHAR` | Clausula Suspensiva | — | — |
| `clausula_suspensiva_vencimento` | `DATE` | Data de vencimento da Suspensiva | — | — |
| `normativa` | `VARCHAR` | Normativa | guard Excel | — |
| `observacoes` | `VARCHAR` | Observações | guard Excel | — |
| `nome_programa` | `VARCHAR` | Nome Programa / Portfólio | guard Excel | — |
| `empenho` | `VARCHAR` | Empenho | — | — |
| `valor` | `DECIMAL(18,2)` | Valor do Repasse | R$, 2 casas | — |
| `valor_total` | `DECIMAL(18,2)` | Valor Total | R$, 2 casas | — |
| `valor_contrapartida` | `DECIMAL(18,2)` | Contrapartida | R$, 2 casas | — |
| `emenda` | `VARCHAR` | Emenda | guard Excel | — |
| `dotacao` | `VARCHAR` | Dotação Orçamentária | guard Excel | — |
| `demanda` | `VARCHAR` | Número da Demanda/Proposta | guard Excel | — |
| `banco_fim` | `VARCHAR` | Conta - Banco da Secretaria fim | guard Excel | — |
| `conta_fim` | `VARCHAR` | Conta - Número da Secretaria fim | guard Excel | — |
| `agencia_fim` | `VARCHAR` | Conta - Agência da Secretaria fim | guard Excel | — |
| `banco_aceite` | `VARCHAR` | Conta - Banco do aceite | guard Excel | — |
| `agencia_aceite` | `VARCHAR` | Conta - Agência do aceite | guard Excel | — |
| `conta_aceite` | `VARCHAR` | Conta - Número do aceite | guard Excel | — |
| `emenda_unitaria` | `VARCHAR` | Emenda Unitária | guard Excel | — |
| `distribuicao_recurso__orgao_gestor_descricao` | `VARCHAR` | Gestor Municipal do Contrato (secretaria) | guard Excel | — |
| `ordenador_despesa` | `VARCHAR` | Ordenador de despesas | guard Excel | — |
| `secretaria_concedente` | `VARCHAR` | Secretaria do órgão concedente | guard Excel | — |
| `plano_de_acao` | `VARCHAR` | Plano de Ação | guard Excel | Código do detalhamento do uso dos repasses parlamentares nas transferências especiais. |
| `interface` | `VARCHAR` | Interface | — | — |
| `esfera` | `VARCHAR` | Esfera | — | — |
| `parlamentares_info` | `VARCHAR` | Parlamentares | guard Excel | — |
| `orgao_concedente__descricao` | `VARCHAR` | Orgão Concedente | — | — |
| `distribuicao_recurso__id` | `BIGINT` | ID Distribuição de Recurso | sem formatação | — |
| `distribuicao_recurso__nome_responsavel` | `VARCHAR` | Gestor Municipal (servidor) | guard Excel | — |
| `distribuicao_recurso__objeto` | `VARCHAR` | Objeto detalhado | guard Excel | — |
| `distribuicao_recurso__valor` | `DECIMAL(18,2)` | Distribuição - Valor do Repasse | R$, 2 casas | — |
| `distribuicao_recurso__valor_total` | `DECIMAL(18,2)` | Distribuição - Valor Total | R$, 2 casas | — |
| `distribuicao_recurso__valor_contrapartida` | `DECIMAL(18,2)` | Distribuição - Valor da Contrapartida | R$, 2 casas | — |
| `distribuicao_recurso__empenho` | `VARCHAR` | Distribuição - Empenho | — | — |
| `distribuicao_recurso__programa_orcamentario_estadual` | `VARCHAR` | Programa Orçamentário Estadual ou Federal | guard Excel | — |
| `distribuicao_recurso__programa_orcamentario_municipal` | `VARCHAR` | Programa Orçamentário Municipal | guard Excel | — |
| `distribuicao_recurso__dotacao` | `VARCHAR` | Distribuição - Dotação Orçamentária | guard Excel | — |
| `distribuicao_recurso__proposta` | `VARCHAR` | N° Proposta | guard Excel | — |
| `distribuicao_recurso__contrato` | `VARCHAR` | Número do Instrumento | guard Excel | — |
| `distribuicao_recurso__convenio` | `VARCHAR` | Nº do Convênio/Pré Convênio | guard Excel | — |
| `distribuicao_recurso__assinatura_termo_aceite` | `DATE` | Data de assinatura do termo de aceite | — | — |
| `distribuicao_recurso__assinatura_municipio` | `DATE` | Data de assinatura do representante do Município | — | — |
| `distribuicao_recurso__assinatura_estado` | `DATE` | Data de assinatura do representante do Estado | — | — |
| `distribuicao_recurso__vigencia` | `DATE` | Data de início da vigência | — | — |
| `distribuicao_recurso__conclusao_suspensiva` | `DATE` | Data de conclusão da Suspensiva | — | — |
| `distribuicao_recurso__registro_sei` | `VARCHAR` | Nº SEI | — | — |
| `distribuicao_recurso__status_nome_base` | `VARCHAR` | Status da Demanda | — | — |
| `distribuicao_recurso__pct_custeio` | `DOUBLE` | Custeio/Corrente (%) | 2 casas, unidade `%` | — |
| `distribuicao_recurso__pct_investimento` | `DOUBLE` | Investimento/Capital (%) | 2 casas, unidade `%` | — |
| `distribuicao_recurso__banco` | `VARCHAR` | Distribuição - Banco | guard Excel | — |
| `distribuicao_recurso__agencia` | `VARCHAR` | Distribuição - Agência | guard Excel | — |
| `distribuicao_recurso__conta` | `VARCHAR` | Distribuição - Conta Corrente | guard Excel | — |
| `distribuicao_recurso__gestor_conta` | `VARCHAR` | Distribuição - Gestor da Conta | guard Excel | — |
| `orgao_concedente__sigla` | `VARCHAR` | Sigla do Orgão Concedente | — | — |
| `orgao_concedente__id` | `BIGINT` | ID do Orgão Concedente | sem formatação | — |
| `programa` | `VARCHAR` | Programa | guard Excel | — |
| `pendente_preenchimento_valores` | `VARCHAR` | Pendente preenchimento de valores | — | — |
| `gestor_contrato` | `VARCHAR` | Gestor do Contrato | guard Excel | — |
| `numero_identificacao` | `VARCHAR` | Número de Identificação | guard Excel | — |
| `tipo_transferencia` | `VARCHAR` | Tipo de Transferência | guard Excel | — |
| `classificacao` | `VARCHAR` | Classificação | guard Excel | — |
| `distribuicao_recurso__transferencia_id` | `BIGINT` | ID da Transferência (Distribuição) | sem formatação | — |
| `distribuicao_recurso__orgao_gestor_id` | `BIGINT` | ID do Órgão Gestor (Distribuição) | sem formatação | — |

[← todos os arquivos](../report-columns.md)
