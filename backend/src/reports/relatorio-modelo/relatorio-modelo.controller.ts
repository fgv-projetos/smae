import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { PessoaFromJwt } from '../../auth/models/PessoaFromJwt';
import { ListaDePrivilegios } from '../../common/ListaDePrivilegios';
import { FindOneParams } from '../../common/decorators/find-params';
import { RecordWithId } from '../../common/dto/record-with-id.dto';
import { CreateRelatorioModeloDto } from './dto/create-relatorio-modelo.dto';
import {
    ColunasParametrizadasDto,
    FilterColunasRelatorioDto,
    FilterFontesRelatorioDto,
    FilterRelatorioModeloDto,
} from './dto/filter-relatorio-modelo.dto';
import { UpdateRelatorioModeloDto } from './dto/update-relatorio-modelo.dto';
import {
    ListRelatorioColunasDto,
    ListRelatorioFontesDto,
    ListRelatorioModeloDto,
    RelatorioModeloDetailDto,
} from './entities/relatorio-modelo.entity';
import { RelatorioModeloService } from './relatorio-modelo.service';

/**
 * Gerenciar modelos exige o mesmo privilégio de executar o relatório da fonte — inclusive na
 * variante escopada por fonte, para atender perfis restritos (ex.: "Gestor(a) Transferências
 * Voluntárias", que tem só `Reports.executar.CasaCivil` ou `...:Transferencias`). O gate fino
 * (fonte × sistema da requisição) é aplicado no service; aqui é só o filtro grosso do guard.
 */
const PRIV_EXECUTAR: ListaDePrivilegios[] = [
    'Reports.executar.CasaCivil',
    'Reports.executar.CasaCivil:Demandas',
    'Reports.executar.PDM',
    'Reports.executar.Projetos',
    'Reports.executar.MDO',
    'Reports.executar.PlanoSetorial',
    'Reports.executar.ProgramaDeMetas',
];

// Remoção/edição também é liberada para quem só tem o privilégio de remover: o criador de um
// modelo pode apagá-lo com `executar`, e quem faz a faxinar de modelos de terceiros usa `remover`.
const PRIV_REMOVER: ListaDePrivilegios[] = [
    ...PRIV_EXECUTAR,
    'Reports.remover.CasaCivil',
    'Reports.remover.CasaCivil:Demandas',
    'Reports.remover.PDM',
    'Reports.remover.Projetos',
    'Reports.remover.MDO',
    'Reports.remover.PlanoSetorial',
    'Reports.remover.ProgramaDeMetas',
];

@ApiTags('Relatórios - Modelos')
@Controller('relatorio-modelo')
export class RelatorioModeloController {
    constructor(private readonly relatorioModeloService: RelatorioModeloService) {}

    @Post()
    @ApiBearerAuth('access-token')
    @Roles(PRIV_EXECUTAR, 'Criar modelo de relatório')
    async create(@Body() dto: CreateRelatorioModeloDto, @CurrentUser() user: PessoaFromJwt): Promise<RecordWithId> {
        return await this.relatorioModeloService.create(dto, user);
    }

    /**
     * Fontes que aceitam modelo no sistema da requisição, com as colunas de cada uma — é a primeira
     * chamada da tela de modelos, já que `GET colunas` exige `fonte`.
     * Rota declarada antes de `:id` para não ser capturada por ela.
     */
    @Get('fontes')
    @ApiBearerAuth('access-token')
    @Roles(PRIV_EXECUTAR, 'Listar fontes disponíveis para modelos')
    @ApiOkResponse({ type: ListRelatorioFontesDto })
    async fontes(
        @Query() filters: FilterFontesRelatorioDto,
        @CurrentUser() user: PessoaFromJwt
    ): Promise<ListRelatorioFontesDto> {
        return this.relatorioModeloService.listFontes(filters, user);
    }

    /**
     * União das colunas que a fonte declara, com os rótulos padrão — **é a lista para montar
     * um modelo**.
     *
     * O modelo é criado antes de se saber com que parâmetros vai rodar, e é reusado em
     * execuções diferentes; por isso ele cita a união das variantes. Quem recorta é a
     * execução: o pós-processamento fica com a interseção entre o modelo e o schema daquela
     * execução, preservando a ordem escolhida (ver `resolverColunas`).
     *
     * A resposta traz `parametrizado: false`. Para pré-visualizar o recorte de uma combinação
     * específica existe `POST /relatorio-modelo/colunas`.
     *
     * Rota declarada antes de `:id` para não ser capturada por ela.
     */
    @Get('colunas')
    @ApiBearerAuth('access-token')
    @Roles(PRIV_EXECUTAR, 'Listar colunas disponíveis de uma fonte')
    @ApiOkResponse({ type: ListRelatorioColunasDto })
    async colunas(
        @Query() filters: FilterColunasRelatorioDto,
        @CurrentUser() user: PessoaFromJwt
    ): Promise<ListRelatorioColunasDto> {
        return await this.relatorioModeloService.listColunas(filters.fonte, undefined, user);
    }

    /**
     * Pré-visualização: colunas de uma fonte **para uma combinação de parâmetros**.
     *
     * Recebe os mesmos `parametros` que irão para `POST /relatorios` e devolve o schema que
     * aquela execução produz — sem as colunas das variantes que não se aplicam (as de
     * meta/iniciativa/atividade num orçamento de projeto, por exemplo) e já com os rótulos
     * configurados no PDM ("Ação estratégica" no lugar de "Iniciativa").
     *
     * **Opcional.** Montar modelo não depende disto: a lista para montar é a união
     * (`GET /colunas`), e o recorte acontece na execução. Serve para responder "com estes
     * parâmetros, o que este modelo vai me dar?" antes de rodar.
     *
     * É `POST` por causa do corpo: `parametros` é um objeto aninhado, que não cabe bem numa
     * query string. Não escreve nada.
     */
    @Post('colunas')
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth('access-token')
    @Roles(PRIV_EXECUTAR, 'Listar colunas de uma fonte para os parâmetros informados')
    @ApiOkResponse({ type: ListRelatorioColunasDto })
    async colunasParametrizadas(
        @Body() dto: ColunasParametrizadasDto,
        @CurrentUser() user: PessoaFromJwt
    ): Promise<ListRelatorioColunasDto> {
        return await this.relatorioModeloService.listColunas(dto.fonte, dto.parametros ?? {}, user);
    }

    @Get()
    @ApiBearerAuth('access-token')
    @Roles(PRIV_EXECUTAR, 'Listar modelos de relatório')
    @ApiOkResponse({ type: ListRelatorioModeloDto })
    async findAll(
        @Query() filters: FilterRelatorioModeloDto,
        @CurrentUser() user: PessoaFromJwt
    ): Promise<ListRelatorioModeloDto> {
        return { linhas: await this.relatorioModeloService.findAll(filters, user) };
    }

    @Get(':id')
    @ApiBearerAuth('access-token')
    @Roles(PRIV_EXECUTAR, 'Detalhe de um modelo de relatório')
    @ApiOkResponse({ type: RelatorioModeloDetailDto })
    async findOne(
        @Param() params: FindOneParams,
        @CurrentUser() user: PessoaFromJwt
    ): Promise<RelatorioModeloDetailDto> {
        return await this.relatorioModeloService.findOne(params.id, user);
    }

    @Patch(':id')
    @ApiBearerAuth('access-token')
    @Roles(PRIV_REMOVER, 'Editar modelo de relatório')
    async update(
        @Param() params: FindOneParams,
        @Body() dto: UpdateRelatorioModeloDto,
        @CurrentUser() user: PessoaFromJwt
    ): Promise<RecordWithId> {
        return await this.relatorioModeloService.update(params.id, dto, user);
    }

    @Delete(':id')
    @ApiBearerAuth('access-token')
    @Roles(PRIV_REMOVER, 'Remover modelo de relatório')
    @ApiResponse({ description: 'sucesso ao remover', status: 204 })
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param() params: FindOneParams, @CurrentUser() user: PessoaFromJwt) {
        await this.relatorioModeloService.remove(params.id, user);
        return null;
    }
}
