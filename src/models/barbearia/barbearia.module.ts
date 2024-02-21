import { Module } from '@nestjs/common';
import { BarbeariaService } from './barbearia.service';
import { BarbeariaController } from './barbearia.controller';
import { PrismaService } from 'src/database/PrismaService';
import { ExcepetionService } from '../exception/exception.service';

@Module({
  controllers: [BarbeariaController],
  providers: [BarbeariaService, PrismaService, ExcepetionService],
})
export class BarbeariaModule {}
