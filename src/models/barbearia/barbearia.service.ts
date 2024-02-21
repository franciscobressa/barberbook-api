import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBarbeariaDto } from './dto/create-barbearia.dto';
import { UpdateBarbeariaDto } from './dto/update-barbearia.dto';
import { PrismaService } from 'src/database/PrismaService';
import { ExcepetionService } from '../exception/exception.service';
import type { Barbearia } from '@prisma/client';

@Injectable()
export class BarbeariaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly exception: ExcepetionService,
  ) {}

  async create(newBarbearia: CreateBarbeariaDto) {
    const barbearias = await this.prisma.barbearia.findMany();

    if (barbearias.length > 0) {
      throw this.exception.newError(
        HttpStatus.CONFLICT,
        'Barbearia já cadastrada',
      );
    }

    return this.prisma.barbearia.create({ data: newBarbearia });
  }

  async find(): Promise<Barbearia> {
    const barbearias = await this.prisma.barbearia.findMany();
    return barbearias[0];
  }

  async update(id: string, updateBarbearia: UpdateBarbeariaDto) {
    const barbearia = await this.prisma.barbearia.findUnique({ where: { id } });

    if (!barbearia) {
      throw this.exception.newError(
        HttpStatus.NOT_FOUND,
        'Barbearia não encontrado',
      );
    }

    return this.prisma.barbearia.update({
      where: { id },
      data: updateBarbearia,
    });
  }
}
