import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBarbeiroDto } from './create-barbeiro.dto';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateBarbeiroDto extends PartialType(CreateBarbeiroDto) {
  @ApiProperty({
    example: 'John Doe',
    description: 'Novo nome do Barbeiro',
    required: false,
  })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Novo endereço de e-mail do Barbeiro',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: 'newpassword123',
    description: 'Nova senha do Barbeiro',
    required: false,
  })
  @IsOptional()
  @IsString()
  senha?: string;

  @ApiProperty({
    example: 'url_da_nova_foto.jpg',
    description: 'Nova URL da foto de perfil do Barbeiro',
    required: false,
  })
  @IsOptional()
  @IsString()
  foto_perfil?: string;

  @ApiProperty({
    example: '1',
    description: 'Nova Unidade do Barbeiro',
    required: false,
  })
  @IsOptional()
  @IsString()
  unidade_id?: string;
}
