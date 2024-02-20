import { Module } from '@nestjs/common';
import { BarbeiroService } from './barbeiro.service';
import { BarbeiroController } from './barbeiro.controller';
import { PrismaService } from 'src/database/PrismaService';
import { ExcepetionService } from '../exception/exception.service';

@Module({
  controllers: [BarbeiroController],
  providers: [BarbeiroService, ExcepetionService, PrismaService],
})
export class BarbeiroModule {}
