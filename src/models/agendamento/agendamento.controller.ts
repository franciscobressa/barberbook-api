import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Agendamento')
@Controller('agendamento')
export class AgendamentoController {
  constructor(private readonly agendamentoService: AgendamentoService) {}

  @Post()
  create(@Body() newAgendamento: CreateAgendamentoDto) {
    return this.agendamentoService.create(newAgendamento);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agendamentoService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agendamentoService.remove(+id);
  }
}
