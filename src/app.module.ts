import { Module } from '@nestjs/common';
import { BarbeiroModule } from './models/barbeiro/barbeiro.module';
import { UnidadeModule } from './models/unidade/unidade.module';
import { BarbeariaModule } from './models/barbearia/barbearia.module';
import { ClienteModule } from './models/cliente/cliente.module';
@Module({
  imports: [BarbeariaModule, BarbeiroModule, ClienteModule, UnidadeModule],
})
export class AppModule {}
