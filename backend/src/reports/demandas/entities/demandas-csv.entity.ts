import { ReportColumn, ReportRows } from '../../post-process/report-column.decorator';

/**
 * Colunas do CSV **bruto** de `demandas.csv`.
 *
 * A ordem de declaração é a ordem das colunas no arquivo bruto e também a ordem padrão
 * quando nenhum modelo é aplicado. O schema é plano (uma linha por demanda), então nenhum
 * nome precisa do `__` usado nos relatórios aninhados.
 *
 * Regra geral: valores aqui são "compute store" — números como números, datas em ISO
 * (`YYYY-MM-DD`), sem máscara de moeda e sem o hack `="valor"`. Moeda, separador decimal,
 * `dd/mm/aaaa` são aplicados na etapa de pós-processamento.
 *
 * `status` e `finalidade` saem com o valor cru do enum do Prisma (`DemandaStatus` /
 * `DemandaFinalidade`), exatamente como o relatório já fazia — não existe hoje tradução
 * humana desses valores e inventá-la aqui mudaria o conteúdo entregue.
 *
 * A extração antiga envolvia **todo** campo string em `="..."` (`formatExcelString`), e a
 * migração reproduziu isso declarando o guard no schema. O guard foi removido do pipeline:
 * o CSV agora entrega o valor cru. Quem abre o arquivo direto no Excel perde zeros à
 * esquerda em CEP e vê código virar número — o caminho para o Excel é o `.xlsx` que sai ao
 * lado do CSV, onde a célula nasce VARCHAR.
 */
@ReportRows({
    arquivo: 'demandas.csv',
    fontes: ['Demandas'],
    descricao: 'Uma linha por demanda, com os dados de responsável, projeto, valor e área temática.',
})
export class RelDemandasCsvRow {
    @ReportColumn({ type: 'BIGINT', label: 'ID', format: { raw: true } })
    id: number;

    /** Valor cru do enum `DemandaStatus` (ex.: `Registrado`), como já era emitido. */
    @ReportColumn({ type: 'VARCHAR', label: 'Status' })
    status: string;

    @ReportColumn({ type: 'DATE', label: 'Data de Registro' })
    data_registro: string | null;

    @ReportColumn({ type: 'DATE', label: 'Data de Publicação' })
    data_publicado: string | null;

    /** Nome de exibição do órgão gestor (`orgao.descricao`). */
    @ReportColumn({ type: 'VARCHAR', label: 'Gestor Municipal' })
    orgao_gestor: string | null;

    @ReportColumn({ type: 'VARCHAR', label: 'Unidade Responsável' })
    unidade_responsavel: string | null;

    @ReportColumn({ type: 'VARCHAR', label: 'Nome do Responsável' })
    nome_responsavel: string | null;

    @ReportColumn({ type: 'VARCHAR', label: 'Cargo do Responsável' })
    cargo_responsavel: string | null;

    @ReportColumn({ type: 'VARCHAR', label: 'E-mail do Responsável' })
    email_responsavel: string | null;

    @ReportColumn({ type: 'VARCHAR', label: 'Telefone do Responsável' })
    telefone_responsavel: string | null;

    @ReportColumn({ type: 'VARCHAR', label: 'Nome do Projeto' })
    nome_projeto: string | null;

    @ReportColumn({ type: 'VARCHAR', label: 'Descrição' })
    descricao: string | null;

    @ReportColumn({ type: 'VARCHAR', label: 'Justificativa' })
    justificativa: string | null;

    /**
     * Emitido como string na extração para não perder precisão do `Decimal` do Prisma —
     * o DuckDB relê a coluna como `DECIMAL(18,2)` sem passar por `double`.
     */
    @ReportColumn({ type: 'DECIMAL(18,2)', label: 'Valor', format: { currency: 'R$', decimalPlaces: 2 } })
    valor: string | null;

    /** Valor cru do enum `DemandaFinalidade`, como já era emitido. */
    @ReportColumn({ type: 'VARCHAR', label: 'Finalidade' })
    finalidade: string;

    @ReportColumn({ type: 'VARCHAR', label: 'Observação' })
    observacao: string | null;

    @ReportColumn({ type: 'VARCHAR', label: 'Área Temática' })
    area_tematica: string | null;

    /**
     * Nomes das ações vinculadas à demanda, concatenados por `, `. O rótulo está no
     * singular ('Ação') no relatório entregue hoje; mantido byte-a-byte para não mudar
     * o cabeçalho sem decisão de negócio.
     */
    @ReportColumn({ type: 'VARCHAR', label: 'Ação' })
    acoes: string | null;
}

/**
 * Colunas do CSV bruto de `enderecos.csv`.
 *
 * Arquivo **condicional**: só é emitido quando há ao menos uma referência de
 * geolocalização nas demandas filtradas. O schema, porém, é sempre declarado — do
 * contrário um modelo salvo não teria como referenciar o arquivo.
 */
@ReportRows({
    arquivo: 'enderecos.csv',
    fontes: ['Demandas'],
    descricao: 'Uma linha por endereço/geolocalização vinculada a uma demanda.',
})
export class RelDemandasEnderecosCsvRow {
    /** Chave de conciliação com `demandas.csv`. */
    @ReportColumn({ type: 'BIGINT', label: 'ID da Demanda', format: { raw: true } })
    demanda_id: number;

    @ReportColumn({ type: 'VARCHAR', label: 'Nome do Projeto' })
    nome_projeto: string | null;

    /** `01234-567` (e principalmente CEPs só-dígitos) o Excel lê como número. */
    @ReportColumn({ type: 'VARCHAR', label: 'CEP' })
    cep: string | null;

    @ReportColumn({ type: 'VARCHAR', label: 'Endereço' })
    endereco: string | null;

    @ReportColumn({ type: 'VARCHAR', label: 'Bairro' })
    bairro: string | null;

    /** Regiões de nível 3 do georreferenciamento, concatenadas por `, `. */
    @ReportColumn({ type: 'VARCHAR', label: 'Subprefeitura' })
    subprefeitura: string | null;

    /** Regiões de nível 4 do georreferenciamento, concatenadas por `, `. */
    @ReportColumn({ type: 'VARCHAR', label: 'Distrito' })
    distrito: string | null;
}
