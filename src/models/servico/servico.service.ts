import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { PrismaService } from 'src/database/PrismaService';
import { BarbeiroService } from '../barbeiro/barbeiro.service';
import { ExcepetionService } from '../exception/exception.service';

@Injectable()
export class ServicoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly barbeiroService: BarbeiroService,
    private readonly exception: ExcepetionService,
  ) {}

  async create(newServico: CreateServicoDto) {
    let barbeirosPromises = null;

    if (newServico.barbeiros_ids && newServico.barbeiros_ids.length > 0) {
      barbeirosPromises = newServico.barbeiros_ids.map(async (id) => {
        const barbeiro = await this.barbeiroService.findOne(id);
        return barbeiro;
      });
    }

    const barbeiros = barbeirosPromises
      ? await Promise.all(barbeirosPromises)
      : [];

    delete newServico.barbeiros_ids;
    return this.prisma.servico.create({
      data: {
        ...newServico,
        barbeiros: {
          connect: barbeiros,
        },
      },
      include: { barbeiros: true },
    });
  }

  async findAll() {
    return this.prisma.servico.findMany();
  }

  async findOne(id: number) {
    return this.prisma.servico.findUnique({
      where: { id },
      include: { barbeiros: true },
    });
  }

  async findByBarbeiro(idBarbeiro: string) {
    return this.prisma.servico.findMany({
      where: { barbeiros: { some: { id: idBarbeiro } } },
    });
  }

  async update(id: number, updateServico: UpdateServicoDto) {
    const servico = await this.findOne(id);

    if (!servico) {
      throw this.exception.newError(
        HttpStatus.NOT_FOUND,
        'Serviço não encontrado',
      );
    }

    let barbeirosPromises = null;

    if (updateServico.barbeiros_ids && updateServico.barbeiros_ids.length > 0) {
      barbeirosPromises = updateServico.barbeiros_ids.map(async (id) => {
        const barbeiro = await this.barbeiroService.findOne(id);
        return barbeiro;
      });
    }

    const barbeiros = barbeirosPromises
      ? await Promise.all(barbeirosPromises)
      : [];

    delete updateServico.barbeiros_ids;

    return this.prisma.servico.update({
      where: { id },
      data: {
        ...updateServico,
        barbeiros: {
          set: barbeiros,
        },
      },
    });
  }

  async remove(id: number) {
    const servicoExistis = await this.findOne(id);

    if (!servicoExistis) {
      throw this.exception.newError(HttpStatus.NOT_FOUND, 'Serviço não existe');
    }

    return this.prisma.servico.delete({
      where: { id },
    });
  }
}
