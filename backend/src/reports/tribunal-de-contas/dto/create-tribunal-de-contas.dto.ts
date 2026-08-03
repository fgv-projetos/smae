import { ApiProperty } from '@nestjs/swagger';
import { TransferenciaTipoEsfera } from '@prisma/client';
import { IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import { OptionalBooleanTransform } from '../../../auth/transforms/boolean.transform';

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
     * Quando `true`, inclui transferências e distribuições canceladas/declinadas/impedidas
     * tecnicamente/redirecionadas. Padrão (`false`/ausente): não apresenta essas linhas.
     * Mesmo padrão do relatório de transferências.
     */
    @IsOptional()
    @IsBoolean()
    @Transform(OptionalBooleanTransform)
    @Expose()
    cancelada?: boolean;
}
