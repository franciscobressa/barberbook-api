import { Module } from '@nestjs/common';
import { BarbeiroModule } from './models/barbeiro/barbeiro.module';

@Module({
  imports: [BarbeiroModule],
})
export class AppModule {}
