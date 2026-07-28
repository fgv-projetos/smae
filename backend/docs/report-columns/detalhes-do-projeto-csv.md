# detalhes-do-projeto.csv

Linha única com o cabeçalho/detalhes do projeto.

Fontes que produzem este arquivo: `Projeto`

62 colunas.

Classe de linha: `RelProjetoDetalheCsvRow`

Colunas do CSV bruto de `detalhes-do-projeto.csv` (sempre uma única linha).

A ordem reproduz a ordem de inserção das chaves no objeto `detail` montado em `asJSON()`
— que era exatamente o que definia o cabeçalho antes, já que não havia `fields`.

Dois campos do `detail` são objetos e, portanto, achatados: `projeto_etapa` (`IdDesc`) e
`meta` (`ProjetoMetaDetailDto`).

| Coluna | Tipo | Rótulo | Formatação | Descrição |
| --- | --- | --- | --- | --- |
| `projeto_id` | `BIGINT` | ID do Projeto | sem formatação | — |
| `codigo` | `VARCHAR` | Código | guard Excel | — |
| `portfolio_id` | `BIGINT` | ID do Portfólio | sem formatação | — |
| `nome` | `VARCHAR` | Nome | — | — |
| `portfolio_titulo` | `VARCHAR` | Portfólio | — | — |
| `etiquetas` | `VARCHAR` | Etiquetas | — | — |
| `status` | `VARCHAR` | Status | — | — |
| `projeto_etapa__id` | `BIGINT` | Etapa - ID | sem formatação | — |
| `projeto_etapa__descricao` | `VARCHAR` | Etapa | — | — |
| `previsao_inicio` | `DATE` | Previsão de Início | — | — |
| `previsao_termino` | `DATE` | Previsão de Término | — | — |
| `previsao_duracao` | `INTEGER` | Previsão de Duração (dias) | sem formatação | — |
| `previsao_custo` | `DECIMAL(18,2)` | Previsão de Custo | R$, 2 casas | — |
| `objeto` | `VARCHAR` | Objeto | — | — |
| `objetivo` | `VARCHAR` | Objetivo | — | — |
| `nao_escopo` | `VARCHAR` | Não Escopo | — | — |
| `orgao_responsavel_id` | `BIGINT` | Órgão Responsável - ID | sem formatação | — |
| `orgao_responsavel_sigla` | `VARCHAR` | Órgão Responsável (Sigla) | — | — |
| `orgao_responsavel_descricao` | `VARCHAR` | Órgão Responsável | — | — |
| `responsavel_id` | `BIGINT` | Responsável - ID | sem formatação | — |
| `responsavel_nome_exibicao` | `VARCHAR` | Responsável | — | — |
| `orgao_gestor_id` | `BIGINT` | Órgão Gestor - ID | sem formatação | — |
| `orgao_gestor_sigla` | `VARCHAR` | Órgão Gestor (Sigla) | — | — |
| `orgao_gestor_descricao` | `VARCHAR` | Órgão Gestor | — | — |
| `meta_id` | `BIGINT` | ID da Meta | sem formatação | — |
| `responsaveis_no_orgao_gestor` | `VARCHAR` | Responsáveis no Órgão Gestor | — | — |
| `origem_tipo` | `VARCHAR` | Tipo de Origem | — | — |
| `origem_outro` | `VARCHAR` | Origem (Outro) | — | — |
| `secretario_responsavel` | `VARCHAR` | Secretário Responsável | — | — |
| `secretario_executivo` | `VARCHAR` | Secretário Executivo | — | — |
| `coordenador_ue` | `VARCHAR` | Coordenador da UE | — | — |
| `data_aprovacao` | `DATE` | Data de Aprovação | — | — |
| `data_revisao` | `DATE` | Data de Revisão | — | — |
| `versao` | `VARCHAR` | Versão | guard Excel | — |
| `arquivado` | `BOOLEAN` | Arquivado | — | — |
| `iniciativa_id` | `BIGINT` | ID da Iniciativa | sem formatação | — |
| `atividade_id` | `BIGINT` | ID da Atividade | sem formatação | — |
| `meta_codigo` | `VARCHAR` | Código da Meta | guard Excel | — |
| `resumo` | `VARCHAR` | Resumo | — | — |
| `publico_alvo` | `VARCHAR` | Público Alvo | — | — |
| `realizado_inicio` | `DATE` | Início Realizado | — | — |
| `realizado_termino` | `DATE` | Término Realizado | — | — |
| `realizado_custo` | `DECIMAL(18,2)` | Custo Realizado | R$, 2 casas | — |
| `principais_etapas` | `VARCHAR` | Principais Etapas | — | — |
| `eh_prioritario` | `BOOLEAN` | É Prioritário | — | — |
| `atraso` | `INTEGER` | Atraso (dias) | sem formatação | — |
| `em_atraso` | `BOOLEAN` | Em Atraso | — | — |
| `tolerancia_atraso` | `INTEGER` | Tolerância de Atraso (dias) | sem formatação | — |
| `projecao_termino` | `DATE` | Projeção de Término | — | — |
| `realizado_duracao` | `INTEGER` | Duração Realizada (dias) | sem formatação | — |
| `percentual_concluido` | `DOUBLE` | Percentual Concluído | 2 casas, unidade `%` | — |
| `portfolio_nivel_maximo_tarefa` | `INTEGER` | Nível Máximo de Tarefa do Portfólio | sem formatação | — |
| `meta__id` | `BIGINT` | Meta - ID | sem formatação | — |
| `meta__codigo` | `VARCHAR` | Meta - Código | guard Excel | — |
| `meta__titulo` | `VARCHAR` | Meta - Título | — | — |
| `meta__pdm_id` | `BIGINT` | Meta - ID do PdM | sem formatação | — |
| `meta__pdm_nome` | `VARCHAR` | Meta - PdM | — | — |
| `fonte_recursos` | `VARCHAR` | Fontes de Recurso | — | — |
| `premissas` | `VARCHAR` | Premissas | — | — |
| `restricoes` | `VARCHAR` | Restrições | — | — |
| `orgaos_participantes` | `VARCHAR` | Órgãos Participantes | — | — |
| `status_traduzido` | `VARCHAR` | status-traduzido | — | — |

[← todos os arquivos](../report-columns.md)
