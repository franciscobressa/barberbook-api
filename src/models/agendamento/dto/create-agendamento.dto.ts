import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAgendamentoDto {
  @ApiProperty({
    example: '1970-01-04T12:00:00.000Z',
    description: 'Horário de Início',
  })
  @IsNotEmpty()
  horario_inicio: Date;

  @ApiProperty({
    example: '0ceade42-da66-4655-9f0b-c2da2cbd82cf',
    description: 'ID do Cliente',
  })
  @IsString()
  cliente_id: string;

  @ApiProperty({
    example: 'c0d58262-58db-4b15-83cd-2024abf389a8',
    description: 'ID do barbeiro vinculado ao horário',
  })
  @IsString()
  barbeiro_id: string;

  @ApiProperty({
    example: 15,
    description: 'ID do Serviço',
  })
  @IsNotEmpty()
  @IsNumber()
  servico_id: number;
}
