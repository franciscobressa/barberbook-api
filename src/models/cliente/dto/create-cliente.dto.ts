import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({ example: 'Cliente da Silva', description: 'Nome do Cliente' })
  @IsString()
  nome: string;

  @ApiProperty({
    example: 'cliente@example.com',
    description: 'Endereço de e-mail do Cliente',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Senha do Cliente' })
  @IsString()
  senha: string;

  @ApiProperty({
    example: 'url_da_foto.jpg',
    description: 'URL da foto de perfil do Cliente',
    required: false,
  })
  @IsOptional()
  @IsString()
  foto_perfil?: string;
}
