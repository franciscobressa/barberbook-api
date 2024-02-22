import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BarbeiroService } from './barbeiro.service';
import { CreateBarbeiroDto } from './dto/create-barbeiro.dto';
import { UpdateBarbeiroDto } from './dto/update-barbeiro.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateHorarioDto } from './dto/create-horario.dto';

@ApiTags('Barbeiro')
@Controller('barbeiro')
export class BarbeiroController {
  constructor(private readonly barbeiroService: BarbeiroService) {}

  @Post()
  create(@Body() createBarbeiroDto: CreateBarbeiroDto) {
    return this.barbeiroService.create(createBarbeiroDto);
  }

  @Get()
  findAll() {
    return this.barbeiroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.barbeiroService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBarbeiroDto: UpdateBarbeiroDto,
  ) {
    return this.barbeiroService.update(id, updateBarbeiroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.barbeiroService.remove(id);
  }

  @Post('horario-disponivel')
  createHorarioDisponivel(@Body() newHorario: CreateHorarioDto) {
    return this.barbeiroService.createHorarioDisponivel(newHorario);
  }

  @Get('horario-disponivel/:id')
  findHorarioByBarbeiro(@Param('id') id: string) {
    return this.barbeiroService.findHorarioByBarbeiro(id);
  }

  @Delete('horario-disponivel/:id')
  removeHorarioDisponivel(@Param('id') id: string) {
    return this.barbeiroService.removeHorarioDisponivel(id);
  }
}
