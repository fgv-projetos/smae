import { ApiProperty } from '@nestjs/swagger';
import { FonteRelatorio, ModuloSistema, RelatorioVisibilidade } from '@prisma/client';
import { IsEnum } from 'class-validator';
import { VisibilidadeTipo } from '../helpers/visibilidade-templates';

export class RelatorioParamDto {
    filtro: string;
    valor: string | string[];
}

/**
 * Modelo usado na execução, embutido na listagem para o frontend não precisar de um
 * `GET /relatorio-modelo/:id` por linha — inclusive enquanto o relatório processa, quando
 * `resumo_saida` ainda está vazio e o modelo é a única pista do que vai sair.
 */
export class RelatorioModeloResumoDto {
    id: number;
    nome: string;
    @ApiProperty({ enum: FonteRelatorio, enumName: 'FonteRelatorio' })
    fonte: FonteRelatorio;
    /** `true` quando o modelo foi removido depois desta execução (o relatório continua válido). */
    removido: boolean;
}

export class RelatorioDto {
    id: number;
    criado_em: Date;
    criador: { nome_exibicao: string };
    fonte: string;
    /** Módulo do sistema a que o relatório pertence (`SMAE` = gerado pelo sistema). */
    @ApiProperty({ enum: ModuloSistema, enumName: 'ModuloSistema' })
    sistema: ModuloSistema;
    /** Modelo aplicado nesta execução; `null` = saída padrão do relatório. */
    @ApiProperty({ type: RelatorioModeloResumoDto, nullable: true })
    modelo: RelatorioModeloResumoDto | null;
    arquivo: string | null;
    parametros: any;
    progresso: number | null;
    // TODO: Remover isso aqui e mandar só enum de visibilidade.
    eh_publico: boolean;
    @IsEnum(RelatorioVisibilidade)
    visibilidade: RelatorioVisibilidade;
    @ApiProperty({ enum: ['publico', 'privado', 'meu_orgao'], nullable: true })
    visibilidade_tipo: VisibilidadeTipo | null;
    @ApiProperty({ nullable: true, description: 'Label legível de visibilidade_tipo (para exibição)' })
    visibilidade_tipo_label: string | null;
    processamento: RelatorioProcessamentoDto | null;
    @ApiProperty({
        type: RelatorioParamDto,
        isArray: true,
        description: 'Lista de parâmetros processados do relatório',
    })
    parametros_processados: RelatorioParamDto[] | null;
    resumo_saida: object[] | null;
    pdm_id: number | null;
    pode_remover: boolean;
}

export class VisibilidadeTipoItemDto {
    @ApiProperty({ enum: ['publico', 'privado', 'meu_orgao'] })
    tipo: VisibilidadeTipo;
    label: string;
    requer_confirmacao: boolean;
    mensagem_confirmacao: string | null;
}

export class ListVisibilidadeTipoDto {
    @ApiProperty({ type: VisibilidadeTipoItemDto, isArray: true })
    linhas: VisibilidadeTipoItemDto[];
}

export class RelatorioProcessamentoDto {
    @ApiProperty({
        deprecated: true,
    })
    id: number;
    congelado_em: Date | null;
    executado_em: Date | null;
    err_msg: string | null;
}
