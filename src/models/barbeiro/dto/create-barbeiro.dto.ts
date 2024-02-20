import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateBarbeiroDto {
  @ApiProperty({ example: 'John Doe', description: 'Nome do Barbeiro' })
  @IsString()
  nome: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Endereço de e-mail do Barbeiro',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Senha do Barbeiro' })
  @IsString()
  senha: string;

  @ApiProperty({
    example: 'url_da_foto.jpg',
    description: 'URL da foto de perfil do Barbeiro',
    required: false,
  })
  @IsOptional()
  @IsString()
  foto_perfil?: string;

  @ApiProperty({ example: '1', description: 'Unidade ID' })
  @IsString()
  unidade_id: string;
}
