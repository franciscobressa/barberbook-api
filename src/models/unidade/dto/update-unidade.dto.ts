import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUnidadeDto } from './create-unidade.dto';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdateUnidadeDto extends PartialType(CreateUnidadeDto) {
  @ApiProperty({
    description: 'Nome da unidade (opcional)',
    example: 'Novo Salão XYZ',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly nome?: string;

  @ApiProperty({
    description: 'Endereço da unidade (opcional)',
    example: 'Nova Rua ABC, 456',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly endereco?: string;

  @ApiProperty({
    description: 'Número de telefone da unidade (opcional)',
    example: '+55 11 9876-5432',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsPhoneNumber('BR', { message: 'Informe um número de telefone válido.' })
  readonly telefone?: string;
}
