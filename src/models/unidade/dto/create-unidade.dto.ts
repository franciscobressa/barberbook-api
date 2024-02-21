import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateUnidadeDto {
  @ApiProperty({ description: 'Nome da unidade', example: 'Salão XYZ' })
  @IsNotEmpty()
  @IsString()
  readonly nome: string;

  @ApiProperty({ description: 'Endereço da unidade', example: 'Rua ABC, 123' })
  @IsNotEmpty()
  @IsString()
  readonly endereco: string;

  @ApiProperty({
    description: 'Número de telefone da unidade',
    example: '11998661752',
  })
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  readonly telefone: string;
}
