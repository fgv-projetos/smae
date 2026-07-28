# contratos.csv

Uma linha por contrato vinculado à obra.
Contratos vinculados ao projeto.
Uma linha por contrato vinculado aos projetos filtrados.

Fontes que produzem este arquivo: `Obras`, `Projeto`, `Projetos`

35 colunas.

## `RelObrasContratosCsvRow`

Colunas do CSV bruto de `contratos.csv`.

A ordem reproduz exatamente o antigo array `contratosFields`.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `contrato_id` | `BIGINT` | ID do Contrato | sem formatação | — |
| `obra_id` | `BIGINT` | ID da Obra | sem formatação | — |
| `numero` | `VARCHAR` | Número | guard Excel | — |
| `exclusivo` | `BOOLEAN` | Exclusivo | — | — |
| `status` | `VARCHAR` | Status | — | — |
| `objeto` | `VARCHAR` | Objeto | — | — |
| `descricao_detalhada` | `VARCHAR` | Descrição Detalhada | — | — |
| `contratante` | `VARCHAR` | Contratante | — | — |
| `empresa_contratada` | `VARCHAR` | Empresa Contratada | — | — |
| `cnpj_contratada` | `VARCHAR` | CNPJ da Contratada | guard Excel | — |
| `prazo` | `INTEGER` | Prazo | sem formatação | — |
| `unidade_prazo` | `VARCHAR` | Unidade do Prazo | — | — |
| `data_base` | `VARCHAR` | Data Base | guard Excel | — |
| `data_inicio` | `DATE` | Data de Início | — | — |
| `data_termino` | `DATE` | Data de Término | — | — |
| `data_termino_atualizada` | `DATE` | Data de Término Atualizada | — | — |
| `valor` | `DECIMAL(18,2)` | Valor | R$, 2 casas | — |
| `observacoes` | `VARCHAR` | Observações | — | — |
| `valor_contrato_atualizado` | `DECIMAL(18,2)` | Valor do Contrato Atualizado | R$, 2 casas | — |
| `total_aditivos` | `DECIMAL(18,2)` | Total de Aditivos | R$, 2 casas | — |
| `total_reajustes` | `DECIMAL(18,2)` | Total de Reajustes | R$, 2 casas | — |
| `modalidade_contratacao_id` | `BIGINT` | ID da Modalidade de Contratação | sem formatação | — |
| `modalidade_contratacao_nome` | `VARCHAR` | Modalidade de Contratação | — | — |
| `orgao_id` | `BIGINT` | ID da Área Gestora | sem formatação | — |
| `orgao_sigla` | `VARCHAR` | Sigla da Área Gestora | — | — |
| `orgao_descricao` | `VARCHAR` | Área Gestora | — | — |
| `percentual_medido` | `DECIMAL(18,4)` | Percentual Medido | 2 casas | — |
| `processos_sei` | `VARCHAR` | Processos SEI | guard Excel | — |
| `fontes_recurso` | `VARCHAR` | Fontes de Recurso | guard Excel | — |

## `RelProjetoContratoCsvRow`

Colunas do CSV bruto de `contratos.csv` da fonte `Projeto` (uma linha por contrato).

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `contrato_id` | `BIGINT` | ID do Contrato | sem formatação | — |
| `projeto_id` | `BIGINT` | ID do Projeto | sem formatação | — |
| `numero` | `VARCHAR` | Número do Contrato | guard Excel | — |
| `exclusivo` | `BOOLEAN` | Exclusivo | — | — |
| `status` | `VARCHAR` | Status | — | — |
| `objeto` | `VARCHAR` | Objeto | — | — |
| `descricao_detalhada` | `VARCHAR` | Descrição Detalhada | — | — |
| `contratante` | `VARCHAR` | Contratante | — | — |
| `empresa_contratada` | `VARCHAR` | Empresa Contratada | — | — |
| `prazo` | `INTEGER` | Prazo | sem formatação | — |
| `unidade_prazo` | `VARCHAR` | Unidade do Prazo | — | — |
| `data_base` | `VARCHAR` | Data Base | guard Excel | — |
| `data_inicio` | `DATE` | Data de Início | — | — |
| `data_termino` | `DATE` | Data de Término | — | — |
| `data_termino_atualizada` | `DATE` | Data de Término Atualizada | — | — |
| `valor` | `DECIMAL(18,2)` | Valor | R$, 2 casas | — |
| `observacoes` | `VARCHAR` | Observações | — | — |
| `valor_contrato_atualizado` | `DECIMAL(18,2)` | Valor do Contrato Atualizado | R$, 2 casas | — |
| `total_aditivos` | `DECIMAL(18,2)` | Total de Aditivos | R$, 2 casas | — |
| `total_reajustes` | `DECIMAL(18,2)` | Total de Reajustes | R$, 2 casas | — |
| `modalidade_licitacao__id` | `BIGINT` | Modalidade de Licitação - ID | sem formatação | — |
| `modalidade_licitacao__nome` | `VARCHAR` | Modalidade de Licitação | — | — |
| `area_gestora__id` | `BIGINT` | Área Gestora - ID | sem formatação | — |
| `area_gestora__sigla` | `VARCHAR` | Área Gestora (Sigla) | — | — |
| `area_gestora__descricao` | `VARCHAR` | Área Gestora | — | — |
| `percentual_medido` | `DECIMAL(18,4)` | Percentual Medido | 2 casas, unidade `%` | — |
| `processos_sei` | `VARCHAR` | Processos SEI | guard Excel | — |
| `fontes_recurso` | `VARCHAR` | Fontes de Recurso | guard Excel | — |
| `cnpj_contratada` | `VARCHAR` | CNPJ da Contratada | guard Excel | — |

## `RelProjetosContratosCsvRow`

Códigos dos riscos associados ao acompanhamento, concatenados com `|`.

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `contrato_id` | `INTEGER` | contrato_id | sem formatação | — |
| `projeto_id` | `INTEGER` | ID Projeto | sem formatação | — |
| `numero` | `VARCHAR` | Número | — | — |
| `exclusivo` | `BOOLEAN` | Exclusivo | — | — |
| `status` | `VARCHAR` | Status | — | — |
| `objeto` | `VARCHAR` | Objeto | — | — |
| `descricao_detalhada` | `VARCHAR` | Descrição Detalhada | — | — |
| `contratante` | `VARCHAR` | Contratante | — | — |
| `empresa_contratada` | `VARCHAR` | Empresa Contratada | — | — |
| `prazo` | `INTEGER` | Prazo | sem formatação | — |
| `unidade_prazo` | `VARCHAR` | Unidade Prazo | — | — |
| `data_base` | `VARCHAR` | Data-base | — | — |
| `data_inicio` | `DATE` | Data Início | — | — |
| `data_termino` | `DATE` | Data Término | — | — |
| `data_termino_atualizada` | `DATE` | Data Término Atualizada | — | — |
| `valor` | `DECIMAL(18,2)` | Valor | R$, 2 casas | — |
| `observacoes` | `VARCHAR` | Observações | — | — |
| `valor_contrato_atualizado` | `DECIMAL(18,2)` | Valor Contrato Atualizado | R$, 2 casas | — |
| `total_aditivos` | `DECIMAL(18,2)` | Total Aditivos | R$, 2 casas | — |
| `total_reajustes` | `DECIMAL(18,2)` | Total Reajustes | R$, 2 casas | — |
| `modalidade_licitacao__id` | `INTEGER` | Modalidade de Licitação - ID | sem formatação | — |
| `modalidade_licitacao__nome` | `VARCHAR` | Modalidade de Licitação - Nome | — | — |
| `area_gestora__id` | `INTEGER` | Área Gestora - ID | sem formatação | — |
| `area_gestora__sigla` | `VARCHAR` | Área Gestora - Sigla | — | — |
| `area_gestora__descricao` | `VARCHAR` | Área Gestora - Descrição | — | — |
| `percentual_medido` | `DECIMAL(18,4)` | Máximo % Execução | 4 casas | — |
| `processos_sei` | `VARCHAR` | Processos SEI | — | — |
| `fontes_recurso` | `VARCHAR` | Fontes de Recurso | — | — |
| `cnpj_contratada` | `VARCHAR` | CNPJ Contratada | — | — |

[← todos os arquivos](../report-columns.md)
