import { IsArray, IsEnum, IsOptional, ValidateIf } from 'class-validator';
import { IsOnlyDate } from '../../../common/decorators/IsDateOnly';
import { Transform } from 'class-transformer';
import { DateTransform } from '../../../auth/transforms/date.transform';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TransferenciaTipoEsfera } from '@prisma/client';
import { FilterTransferenciaCancelada } from 'src/casa-civil/transferencia/dto/filter-transferencia.dto';

export class CreateCasaCivilAtividadesPendentesFilterDto {
    @IsOptional()
    @IsArray({ message: 'tipo_id: precisa ser uma array.' })
    @Expose()
    tipo_id?: number[];

    @IsOptional()
    @Transform(DateTransform)
    @IsOnlyDate()
    @ValidateIf((object, value) => value !== null)
    @Expose()
    data_inicio?: Date;

    @IsOptional()
    @IsOnlyDate()
    @Transform(DateTransform)
    @ValidateIf((object, value) => value !== null)
    @Expose()
    data_termino?: Date;

    @Expose()
    @IsOptional()
    @ApiProperty({ enum: TransferenciaTipoEsfera, enumName: 'TransferenciaTipoEsfera' })
    @IsEnum(TransferenciaTipoEsfera, { message: 'esfera: valor inválido.' })
    esfera?: TransferenciaTipoEsfera;

    @IsOptional()
    @IsArray({ message: 'orgao_id: precisa ser uma array.' })
    @Expose()
    orgao_id?: number[];

    /**
     * Controla a exibição das atividades de transferências canceladas:
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
