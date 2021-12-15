import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TenderapplicationService } from './tenderapplication.service';
import { CreateTenderapplicationDto } from './dto/create-tenderapplication.dto';
import { UpdateTenderapplicationDto } from './dto/update-tenderapplication.dto';

@Controller('admin/tenderapplication')
export class TenderapplicationController {
  constructor(private readonly tenderapplicationService: TenderapplicationService) {}

  @Post()
  create(@Body() createTenderapplicationDto: CreateTenderapplicationDto) {
    return this.tenderapplicationService.create(createTenderapplicationDto);
  }

  @Get()
  findAll() {
    return this.tenderapplicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenderapplicationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTenderapplicationDto: UpdateTenderapplicationDto) {
    return this.tenderapplicationService.update(+id, updateTenderapplicationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string):Promise<any> {
    return await this.tenderapplicationService.remove(+id);
  }
}
