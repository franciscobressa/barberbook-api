import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUnidadeDto } from './dto/create-unidade.dto';
import { UpdateUnidadeDto } from './dto/update-unidade.dto';
import { PrismaService } from 'src/database/PrismaService';
import { ExcepetionService } from '../exception/exception.service';

@Injectable()
export class UnidadeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly exception: ExcepetionService,
  ) {}

  async create(createUnidadeDto: CreateUnidadeDto) {
    const createdUnidade = await this.prismaService.unidade.create({
      data: createUnidadeDto,
    });
    return createdUnidade;
  }

  async findAll() {
    const unidades = await this.prismaService.unidade.findMany();
    return unidades;
  }

  async findOne(id: string) {
    return this.prismaService.unidade.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateUnidadeDto: UpdateUnidadeDto) {
    const unidade = await this.prismaService.unidade.findUnique({
      where: { id },
    });

    if (!unidade) {
      throw this.exception.newError(
        HttpStatus.NOT_FOUND,
        'Unidade não encontrada',
      );
    }

    const updatedUnidade = await this.prismaService.unidade.update({
      where: { id },
      data: updateUnidadeDto,
    });

    return updatedUnidade;
  }

  async remove(id: string) {
    const unidadeExistis = await this.findOne(id);

    if (!unidadeExistis) {
      throw this.exception.newError(HttpStatus.NOT_FOUND, 'Unidade não existe');
    }

    return this.prismaService.unidade.delete({
      where: { id },
    });
  }
}
