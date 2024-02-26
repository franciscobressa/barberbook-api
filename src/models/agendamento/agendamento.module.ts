import { Module } from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { AgendamentoController } from './agendamento.controller';
import { PrismaService } from 'src/database/PrismaService';
import { ServicoService } from '../servico/servico.service';
import { ExcepetionService } from '../exception/exception.service';
import { BarbeiroService } from '../barbeiro/barbeiro.service';

@Module({
  controllers: [AgendamentoController],
  providers: [
    AgendamentoService,
    PrismaService,
    ServicoService,
    ExcepetionService,
    BarbeiroService,
  ],
})
export class AgendamentoModule {}
