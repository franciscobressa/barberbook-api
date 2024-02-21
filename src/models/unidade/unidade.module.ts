import { Module } from '@nestjs/common';
import { UnidadeService } from './unidade.service';
import { UnidadeController } from './unidade.controller';
import { PrismaService } from 'src/database/PrismaService';
import { ExcepetionService } from '../exception/exception.service';

@Module({
  controllers: [UnidadeController],
  providers: [UnidadeService, PrismaService, ExcepetionService],
})
export class UnidadeModule {}
