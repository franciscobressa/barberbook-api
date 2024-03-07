import { Module } from '@nestjs/common';
import { BarbeiroModule } from './models/barbeiro/barbeiro.module';
import { UnidadeModule } from './models/unidade/unidade.module';
import { BarbeariaModule } from './models/barbearia/barbearia.module';
import { ClienteModule } from './models/cliente/cliente.module';
import { ServicoModule } from './models/servico/servico.module';
import { AgendamentoModule } from './models/agendamento/agendamento.module';
import { AuthModule } from './models/auth/auth.module';
@Module({
  imports: [
    AgendamentoModule,
    BarbeariaModule,
    BarbeiroModule,
    ClienteModule,
    ServicoModule,
    UnidadeModule,
    AuthModule,
  ],
})
export class AppModule {}
