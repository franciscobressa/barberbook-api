import { Module } from '@nestjs/common';
import { BarbeiroModule } from './models/barbeiro/barbeiro.module';
import { UnidadeModule } from './models/unidade/unidade.module';
import { BarbeariaModule } from './models/barbearia/barbearia.module';

@Module({
  imports: [BarbeariaModule, BarbeiroModule, UnidadeModule],
})
export class AppModule {}
