import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from 'src/database/PrismaService';
import type { Cliente } from '@prisma/client';
import { ExcepetionService } from '../exception/exception.service';
@Injectable()
export class ClienteService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly exception: ExcepetionService,
  ) {}

  async create(newCliente: CreateClienteDto): Promise<Cliente> {
    const emailExists = await this.emailExists(newCliente.email);

    if (emailExists) {
      throw this.exception.newError(
        HttpStatus.CONFLICT,
        'Email já cadastrado por outro usuário',
      );
    }
    return this.prisma.cliente.create({ data: newCliente });
  }

  async findAll(): Promise<Cliente[]> {
    return this.prisma.cliente.findMany();
  }

  async findOne(id: string): Promise<Cliente> {
    const cliente = await this.prisma.cliente.findUnique({ where: { id } });
    if (!cliente) {
      throw this.exception.newError(
        HttpStatus.NOT_FOUND,
        'Cliente não encontrado',
      );
    }
    return cliente;
  }

  async update(id: string, updateCliente: UpdateClienteDto): Promise<any> {
    const cliente = await this.prisma.cliente.findUnique({ where: { id } });

    if (!cliente) {
      throw this.exception.newError(
        HttpStatus.NOT_FOUND,
        'Cliente não encontrado',
      );
    }

    const emailExists = await this.emailExists(updateCliente.email);

    if (emailExists && updateCliente.email !== cliente.email) {
      throw this.exception.newError(
        HttpStatus.CONFLICT,
        'Email já cadastrado por outro usuário',
      );
    }

    return this.prisma.cliente.update({
      where: { id },
      data: updateCliente,
    });
  }

  async remove(id: string): Promise<void> {
    const cliente = await this.findOne(id);
    await this.prisma.cliente.delete({ where: { id: cliente.id } });
  }

  async emailExists(email: string): Promise<Cliente | null> {
    return this.prisma.cliente.findUnique({
      where: { email: email },
    });
  }
}
