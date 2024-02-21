import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { PrismaService } from 'src/database/PrismaService';
import { ExcepetionService } from '../exception/exception.service';

@Module({
  controllers: [ClienteController],
  providers: [ClienteService, ExcepetionService, PrismaService],
})
export class ClienteModule {}
