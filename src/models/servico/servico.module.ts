import { Module } from '@nestjs/common';
import { ServicoService } from './servico.service';
import { ServicoController } from './servico.controller';
import { PrismaService } from 'src/database/PrismaService';
import { ExcepetionService } from '../exception/exception.service';
import { BarbeiroService } from '../barbeiro/barbeiro.service';

@Module({
  controllers: [ServicoController],
  providers: [
    ServicoService,
    PrismaService,
    ExcepetionService,
    BarbeiroService,
  ],
})
export class ServicoModule {}
