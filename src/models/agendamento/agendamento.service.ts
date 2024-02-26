import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';
import { DiaSemana } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';
import { ServicoService } from '../servico/servico.service';
import { ExcepetionService } from '../exception/exception.service';
import { BarbeiroService } from '../barbeiro/barbeiro.service';

@Injectable()
export class AgendamentoService {
  constructor(
    private readonly primsa: PrismaService,
    private readonly servicos: ServicoService,
    private readonly exception: ExcepetionService,
  ) {}
  async create(newAgendamento: CreateAgendamentoDto) {
    const { duracao } = await this.servicos.findOne(newAgendamento.servico_id);

    if (!duracao) {
      throw this.exception.newError(
        HttpStatus.NOT_FOUND,
        'Serviço não encontrado',
      );
    }
    const horaInicioDate = new Date(newAgendamento.horario_inicio);
    const horaFimDate = new Date(horaInicioDate.getTime() + duracao * 60000);
    const diaSemana = Object.values(DiaSemana)[horaInicioDate.getDay()];

    const barbeiroDisponível = await this.isBarbeiroDisponivel(
      newAgendamento.barbeiro_id,
      diaSemana,
      horaInicioDate,
      horaFimDate,
    );

    if (!barbeiroDisponível) {
      throw this.exception.newError(
        HttpStatus.CONFLICT,
        'Barbeiro não disponível',
      );
    }

    const conflitoHorario = await this.isAgendamentoConflitando(
      newAgendamento.barbeiro_id,
      horaInicioDate,
      horaFimDate,
    );

    if (conflitoHorario) {
      throw this.exception.newError(
        HttpStatus.CONFLICT,
        'Horário indisponível',
      );
    }

    return this.primsa.agendamento.create({
      data: {
        ...newAgendamento,
        horario_fim: horaFimDate,
      },
    });
  }

  async isAgendamentoConflitando(
    barbeiro_id: string,
    horaInicio: Date,
    horaFim: Date,
  ) {
    return this.primsa.agendamento.findFirst({
      where: {
        barbeiro_id: barbeiro_id,
        OR: [
          {
            horario_inicio: {
              lte: horaInicio,
            },
            horario_fim: {
              gt: horaInicio,
            },
          },
          {
            horario_inicio: {
              lte: horaFim,
            },
            horario_fim: {
              gte: horaFim,
            },
          },
        ],
      },
    });
  }

  async isBarbeiroDisponivel(
    barbeiro_id: string,
    diaSemana: DiaSemana,
    horaInicio: Date,
    horaFim: Date,
  ) {
    return this.primsa.horarioDisponivel.findFirst({
      where: {
        barbeiro_id: barbeiro_id,
        diaSemana: diaSemana,
        AND: [
          {
            horaInicio: {
              lte: this.ignoredDayDate(horaInicio),
            },
            horaFim: {
              gt: this.ignoredDayDate(horaInicio),
            },
          },
          {
            horaInicio: {
              lt: this.ignoredDayDate(horaFim),
            },
            horaFim: {
              gte: this.ignoredDayDate(horaFim),
            },
          },
        ],
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} agendamento`;
  }

  update(id: number, updateAgendamentoDto: UpdateAgendamentoDto) {
    return `This action updates a #${id} agendamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} agendamento`;
  }

  ignoredDayDate(date: Date) {
    let dateIgnoredDay = new Date(1970, 0, 1);
    return new Date(
      dateIgnoredDay.setHours(date.getHours(), date.getMinutes()),
    );
  }
}
