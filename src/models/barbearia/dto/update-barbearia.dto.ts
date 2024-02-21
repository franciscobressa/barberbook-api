import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBarbeariaDto } from './create-barbearia.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateBarbeariaDto extends PartialType(CreateBarbeariaDto) {
  @ApiProperty({ example: 'Macho Barber', description: 'Nome da Barbearia' })
  @IsString()
  @IsOptional()
  nome?: string;

  @ApiProperty({
    example: 'url_da_logo.jpg',
    description: 'URL da Logo da Barbearia',
    required: false,
  })
  @IsOptional()
  @IsString()
  logo?: string;
}
