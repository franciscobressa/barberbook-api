import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateServicoDto {
  @ApiProperty({
    example: 'Corte de Cabelo',
    description: 'Nome do serviço',
  })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({
    example: 'Degradê, buzzcut, corte social, etc.',
    description: 'Descrição do Serviço',
  })
  @IsNotEmpty()
  @IsString()
  descricao: string;

  @ApiProperty({
    example: 10.5,
    description: 'Preço do Serviço',
  })
  @IsNotEmpty()
  @IsNumber()
  preco: number;

  @ApiProperty({
    example: 30,
    description: 'Duração do Serviço',
  })
  @IsNotEmpty()
  @IsNumber()
  duracao: number;

  @ApiProperty({
    example: ['aaa', 'bbb', 'ccc'],
    description: 'Array de IDs que oferecem esse serviço',
  })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  barbeiros_ids?: string[];
}
