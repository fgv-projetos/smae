import { ApiProperty } from '@nestjs/swagger';
import { TransferenciaTipoEsfera } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import { FilterTransferenciaCancelada } from 'src/casa-civil/transferencia/dto/filter-transferencia.dto';

export class CreateRelTribunalDeContasDto {
    @IsOptional()
    @ApiProperty({ enum: TransferenciaTipoEsfera, enumName: 'TransferenciaTipoEsfera' })
    @IsEnum(TransferenciaTipoEsfera, {
        message: 'Precisa ser um dos seguintes valores: ' + Object.values(TransferenciaTipoEsfera).join(', '),
    })
    @Expose()
    esfera?: TransferenciaTipoEsfera;

    @IsOptional()
    @IsNumber()
    @Expose()
    ano_inicio?: number;

    @IsOptional()
    @IsNumber()
    @Expose()
    ano_fim?: number;

    @IsOptional()
    @IsNumber()
    @Expose()
    tipo_id?: number;

    /**
     * Controla a exibição das transferências canceladas e das distribuições
     * canceladas/declinadas/impedidas tecnicamente/redirecionadas:
     * - `NaoIncluir` (padrão/ausente): não apresenta essas linhas;
     * - `Incluir`: apresenta todas, inclusive as canceladas;
     * - `Apenas`: apresenta somente as canceladas.
     *
     * Aceita também os valores legados `true` (equivalente a `Incluir`) e `false`
     * (equivalente a `NaoIncluir`) por compatibilidade. Mesmo padrão do relatório de transferências.
     */
    @IsOptional()
    @ApiProperty({ enum: FilterTransferenciaCancelada, enumName: 'FilterTransferenciaCancelada' })
    @IsEnum(FilterTransferenciaCancelada, {
        message: 'Precisa ser um dos seguintes valores: ' + Object.values(FilterTransferenciaCancelada).join(', '),
    })
    @Transform(({ value }) => {
        if (value === true || value === 'true') return FilterTransferenciaCancelada.Incluir;
        if (value === false || value === 'false') return FilterTransferenciaCancelada.NaoIncluir;
        return value;
    })
    @Expose()
    cancelada?: FilterTransferenciaCancelada;
}
