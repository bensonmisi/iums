import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TenderfeetypeService } from './tenderfeetype.service';
import { CreateTenderfeetypeDto } from './dto/create-tenderfeetype.dto';
import { UpdateTenderfeetypeDto } from './dto/update-tenderfeetype.dto';

@Controller('tenderfeetype')
export class TenderfeetypeController {
  constructor(private readonly tenderfeetypeService: TenderfeetypeService) {}

  @Post()
  create(@Body() createTenderfeetypeDto: CreateTenderfeetypeDto) {
    return this.tenderfeetypeService.create(createTenderfeetypeDto);
  }

  @Get()
  findAll() {
    return this.tenderfeetypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenderfeetypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTenderfeetypeDto: UpdateTenderfeetypeDto) {
    return this.tenderfeetypeService.update(+id, updateTenderfeetypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tenderfeetypeService.remove(+id);
  }
}
