import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBarbeiroDto } from './dto/create-barbeiro.dto';
import { UpdateBarbeiroDto } from './dto/update-barbeiro.dto';
import { PrismaService } from 'src/database/PrismaService';
import type { Barbeiro, DiaSemana, HorarioDisponivel } from '@prisma/client';
import { ExcepetionService } from '../exception/exception.service';
import { CreateHorarioDto } from './dto/create-horario.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class BarbeiroService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly exception: ExcepetionService,
  ) {}

  async create(newBarbeiro: CreateBarbeiroDto): Promise<Barbeiro> {
    const emailExists = await this.emailExists(newBarbeiro.email);

    if (emailExists) {
      throw this.exception.newError(
        HttpStatus.CONFLICT,
        'Email já cadastrado por outro usuário',
      );
    }

    const unidade = await this.prisma.unidade.findUnique({
      where: { id: newBarbeiro.unidade_id },
    });

    if (!unidade) {
      throw this.exception.newError(HttpStatus.CONFLICT, 'Unidade não existe');
    }

    newBarbeiro.senha = await bcrypt.hash(newBarbeiro.senha, 5);

    const createdUser = await this.prisma.barbeiro.create({
      data: newBarbeiro,
    });

    return {
      ...createdUser,
      senha: undefined,
    };
  }

  async findAll(): Promise<Barbeiro[]> {
    return this.prisma.barbeiro.findMany();
  }

  async findOne(id: string): Promise<Barbeiro> {
    const barbeiro = await this.prisma.barbeiro.findUnique({ where: { id } });
    if (!barbeiro) {
      throw this.exception.newError(
        HttpStatus.NOT_FOUND,
        'Barbeiro não encontrado',
      );
    }
    return barbeiro;
  }

  async update(id: string, updateBarbeiro: UpdateBarbeiroDto): Promise<any> {
    const barbeiro = await this.prisma.barbeiro.findUnique({ where: { id } });

    if (!barbeiro) {
      throw this.exception.newError(
        HttpStatus.NOT_FOUND,
        'Barbeiro não encontrado',
      );
    }

    const emailExists = await this.emailExists(updateBarbeiro.email);

    if (emailExists && updateBarbeiro.email !== barbeiro.email) {
      throw this.exception.newError(
        HttpStatus.CONFLICT,
        'Email já cadastrado por outro usuário',
      );
    }

    return this.prisma.barbeiro.update({
      where: { id },
      data: updateBarbeiro,
    });
  }

  async remove(id: string): Promise<void> {
    const barbeiro = await this.findOne(id);
    await this.prisma.barbeiro.delete({ where: { id: barbeiro.id } });
  }

  async findHorarioByBarbeiro(id: string) {
    return this.prisma.horarioDisponivel.findMany({
      where: { barbeiro_id: id },
    });
  }

  async findHorarioByBarbeiroAndDay(id: string, diaSemana: DiaSemana) {
    return this.prisma.horarioDisponivel.findMany({
      where: { barbeiro_id: id, diaSemana: diaSemana },
    });
  }

  async createHorarioDisponivel(newHorario: CreateHorarioDto) {
    if (new Date(newHorario.horaInicio) > new Date(newHorario.horaFim)) {
      throw this.exception.newError(
        HttpStatus.BAD_REQUEST,
        'Horário inicial não pode ser menor do que horário final',
      );
    }

    const horarios = await this.prisma.horarioDisponivel.findMany({
      where: {
        barbeiro_id: newHorario.barbeiro_id,
        diaSemana: newHorario.diaSemana,
      },
    });

    const conflito = this.verificaConflitoHorario(
      horarios,
      new Date(newHorario.horaInicio),
      new Date(newHorario.horaFim),
    );

    if (conflito) {
      throw this.exception.newError(HttpStatus.CONFLICT, 'Conflito de horário');
    }

    return this.prisma.horarioDisponivel.create({
      data: { ...newHorario, horaInicio: new Date(newHorario.horaInicio) },
    });
  }

  async removeHorarioDisponivel(id: string): Promise<void> {
    const horario = await this.prisma.horarioDisponivel.findUnique({
      where: { id },
    });
    await this.prisma.horarioDisponivel.delete({ where: { id: horario.id } });
  }

  verificaConflitoHorario(
    horariosExistentes: HorarioDisponivel[],
    novoHorarioInicio: Date,
    novoHorarioFim: Date,
  ) {
    return horariosExistentes.some(({ horaInicio, horaFim }) => {
      return (
        (novoHorarioInicio >= horaInicio && novoHorarioInicio <= horaFim) ||
        (novoHorarioFim >= horaInicio && novoHorarioFim <= horaFim)
      );
    });
  }

  async emailExists(email: string): Promise<Barbeiro | null> {
    return this.prisma.barbeiro.findUnique({
      where: { email: email },
    });
  }
}
