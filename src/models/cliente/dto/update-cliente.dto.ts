import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateClienteDto } from './create-cliente.dto';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
  @ApiProperty({
    example: 'Costumer Billy',
    description: 'Novo nome do Cliente',
    required: false,
  })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiProperty({
    example: 'costumer@example.com',
    description: 'Novo endereço de e-mail do Cliente',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: 'newpassword123',
    description: 'Nova senha do Cliente',
    required: false,
  })
  @IsOptional()
  @IsString()
  senha?: string;

  @ApiProperty({
    example: 'url_da_nova_foto.jpg',
    description: 'Nova URL da foto de perfil do Cliente',
    required: false,
  })
  @IsOptional()
  @IsString()
  foto_perfil?: string;
}
