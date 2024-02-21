import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateBarbeariaDto {
  @ApiProperty({ example: 'Macho Barber', description: 'Nome da Barbearia' })
  @IsString()
  nome: string;

  @ApiProperty({
    example: 'url_da_logo.jpg',
    description: 'URL da Logo da Barbearia',
    required: false,
  })
  @IsString()
  logo: string;
}
