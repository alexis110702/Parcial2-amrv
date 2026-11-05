import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventosCulturalesService } from './eventos-culturales.service';
import { CreateEventoCulturalDto } from './dto/create-evento-cultural.dto';
import { UpdateEventoCulturalDto } from './dto/update-evento-cultural.dto';

@ApiTags('eventos-culturales')
@Controller('eventos-culturales')
export class EventosCulturalesController {
  constructor(private readonly eventosCulturalesService: EventosCulturalesService) {}

  @Post()
  create(@Body() createEventoCulturalDto: CreateEventoCulturalDto) {
    return this.eventosCulturalesService.create(createEventoCulturalDto);
  }

  @Get()
  findAll() {
    return this.eventosCulturalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventosCulturalesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventoCulturalDto: UpdateEventoCulturalDto) {
    return this.eventosCulturalesService.update(+id, updateEventoCulturalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventosCulturalesService.remove(+id);
  }
}
