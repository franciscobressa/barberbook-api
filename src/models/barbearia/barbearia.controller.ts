import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BarbeariaService } from './barbearia.service';
import { CreateBarbeariaDto } from './dto/create-barbearia.dto';
import { UpdateBarbeariaDto } from './dto/update-barbearia.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Barbearia')
@Controller('barbearia')
export class BarbeariaController {
  constructor(private readonly barbeariaService: BarbeariaService) {}

  @Post()
  create(@Body() createBarbeariaDto: CreateBarbeariaDto) {
    return this.barbeariaService.create(createBarbeariaDto);
  }

  @Get()
  find() {
    return this.barbeariaService.find();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBarbeariaDto: UpdateBarbeariaDto,
  ) {
    return this.barbeariaService.update(id, updateBarbeariaDto);
  }
}
