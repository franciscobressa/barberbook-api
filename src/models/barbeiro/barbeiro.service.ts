import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBarbeiroDto } from './dto/create-barbeiro.dto';
import { UpdateBarbeiroDto } from './dto/update-barbeiro.dto';
import { PrismaService } from 'src/database/PrismaService';
import type { Barbeiro } from '@prisma/client';
import { ExcepetionService } from '../exception/exception.service';
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
    return this.prisma.barbeiro.create({ data: newBarbeiro });
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

  async emailExists(email: string): Promise<Barbeiro | null> {
    return this.prisma.barbeiro.findUnique({
      where: { email: email },
    });
  }
}
