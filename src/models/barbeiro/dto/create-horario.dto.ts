import { ApiProperty } from '@nestjs/swagger';
import { DiaSemana } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateHorarioDto {
  @ApiProperty({
    enum: DiaSemana,
    example: 'DOMINGO',
  })
  @IsEnum(DiaSemana)
  diaSemana: DiaSemana;

  @ApiProperty({
    example: '1970-01-01T12:00:00.000Z',
    description: 'Horário de Início',
  })
  @IsNotEmpty()
  horaInicio: Date;

  @ApiProperty({
    example: '1970-01-01T16:00:00.000Z',
    description: 'Horário de Fim',
  })
  @IsNotEmpty()
  horaFim: Date;

  @ApiProperty({
    example: 'f4ec1d2a-a6ba-4b55-ba2a-b3f9bed08d12',
    description: 'ID do barbeiro vinculado ao horário',
  })
  @IsString()
  barbeiro_id: string;
}
