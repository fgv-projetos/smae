import { ApiProperty } from '@nestjs/swagger';
import { TransferenciaHistoricoAcao, TransferenciaTipoEsfera } from '@prisma/client';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsOptional, IsString, MaxLength, IsInt, Max, Min, IsEnum, IsBoolean } from 'class-validator';
import { MAX_LENGTH_DEFAULT } from 'src/common/consts';

export enum FilterTransferenciaCancelada {
    /** Padrão: não apresenta transferências canceladas. */
    NaoIncluir = 'NaoIncluir',
    /** Apresenta todas as transferências, inclusive as canceladas. */
    Incluir = 'Incluir',
    /** Apresenta apenas as transferências canceladas. */
    Apenas = 'Apenas',
}

export class FilterTransferenciaDto {
    @IsOptional()
    @IsString()
    @MaxLength(1000)
    /**
     * token pra buscar proxima pagina
     */
    token_proxima_pagina?: string;

    /**
     * itens por pagina, padrão 25
     * @example "25"
     */
    @IsOptional()
    @IsInt()
    @Max(500)
    @Min(1)
    @Transform((a: TransformFnParams) => (a.value === '' ? undefined : +a.value))
    ipp?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    ano?: number;

    @IsOptional()
    @ApiProperty({ enum: TransferenciaTipoEsfera, enumName: 'TransferenciaTipoEsfera' })
    @IsEnum(TransferenciaTipoEsfera, {
        message: 'Precisa ser um dos seguintes valores: ' + Object.values(TransferenciaTipoEsfera).join(', '),
    })
    esfera?: TransferenciaTipoEsfera;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }: any) => value === 'true')
    preenchimento_completo?: boolean;

    @IsOptional()
    @IsString()
    @MaxLength(MAX_LENGTH_DEFAULT, {
        message: `O campo 'Palavra-Chave' deve ter no máximo ${MAX_LENGTH_DEFAULT} caracteres`,
    })
    palavra_chave?: string;

    /**
     * Controla a exibição das transferências canceladas:
     * - `NaoIncluir` (padrão/ausente): não apresenta as canceladas;
     * - `Incluir`: apresenta todas, inclusive as canceladas;
     * - `Apenas`: apresenta somente as canceladas.
     *
     * Aceita também os valores legados `true` (equivalente a `Incluir`) e `false`
     * (equivalente a `NaoIncluir`) por compatibilidade.
     */
    @IsOptional()
    @ApiProperty({ enum: FilterTransferenciaCancelada, enumName: 'FilterTransferenciaCancelada' })
    @IsEnum(FilterTransferenciaCancelada, {
        message: 'Precisa ser um dos seguintes valores: ' + Object.values(FilterTransferenciaCancelada).join(', '),
    })
    @Transform(({ value }: TransformFnParams) => {
        if (value === true || value === 'true') return FilterTransferenciaCancelada.Incluir;
        if (value === false || value === 'false') return FilterTransferenciaCancelada.NaoIncluir;
        return value;
    })
    cancelada?: FilterTransferenciaCancelada;
}

export class FilterTransferenciaHistoricoDto {
    @IsOptional()
    @ApiProperty({ enum: TransferenciaHistoricoAcao, enumName: 'TransferenciaHistoricoAcao', isArray: true })
    @IsEnum(TransferenciaHistoricoAcao, {
        each: true,
        message: 'Precisa ser um dos seguintes valores: ' + Object.values(TransferenciaHistoricoAcao).join(', '),
    })
    acao?: TransferenciaHistoricoAcao[];
}
