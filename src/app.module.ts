import { Module } from '@nestjs/common';
import { BarbeiroModule } from './models/barbeiro/barbeiro.module';
import { UnidadeModule } from './models/unidade/unidade.module';
import { BarbeariaModule } from './models/barbearia/barbearia.module';
import { ClienteModule } from './models/cliente/cliente.module';
import { ServicoModule } from './models/servico/servico.module';
@Module({
  imports: [
    BarbeariaModule,
    BarbeiroModule,
    ClienteModule,
    ServicoModule,
    UnidadeModule,
  ],
})
export class AppModule {}
