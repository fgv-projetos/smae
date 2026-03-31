import { Transform, TransformFnParams } from 'class-transformer';
import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

export class FilterWorkflowDto {
    @IsOptional()
    @IsBoolean({ message: 'Precisa ser um boolean' })
    @Transform(({ value }: any) => value === 'true')
    ativo?: boolean;

    @IsOptional()
    @IsNumber()
    transferencia_tipo_id?: number;

    @IsOptional()
    @IsString()
    @MaxLength(250)
    palavra_chave?: string;

    /**
     * Itens por página, padrão 25
     * @example "25"
     */
    @IsOptional()
    @IsInt()
    @Max(500)
    @Min(1)
    @Transform((a: TransformFnParams) => (a.value === '' ? undefined : +a.value))
    ipp?: number;

    /**
     * Número da página, padrão 1
     * @example "1"
     */
    @IsOptional()
    @IsInt()
    @Min(1)
    @Transform((a: TransformFnParams) => (a.value === '' ? undefined : +a.value))
    pagina?: number;

    /**
     * Token de paginação
     */
    @IsOptional()
    @IsString()
    @MaxLength(2000)
    token_paginacao?: string;
}

export class FilterWorkflowEtapaDto {
    @IsOptional()
    @IsBoolean({ message: 'Precisa ser um boolean' })
    @Transform(({ value }: any) => value === 'true')
    incluir_removidas?: boolean;
}
