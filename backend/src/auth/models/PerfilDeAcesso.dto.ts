import { ApiProperty } from '@nestjs/swagger';
import { PerfilAcessoPrivilegios } from '../../pessoa/dto/perfil-acesso-privilegios.dto';

export class PerfilDeAcessoLinhaDto {
    @ApiProperty({ description: 'Lista de perfil de acesso' })
    linhas: PerfilAcessoPrivilegios[];
}
