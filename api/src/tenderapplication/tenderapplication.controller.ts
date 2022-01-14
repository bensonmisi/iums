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

  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenderapplicationService.findOne(+id);
  }
  @Get('type/:type')
  findAll(@Param('type') type:string) {
    return this.tenderapplicationService.findAll(type);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTenderapplicationDto: UpdateTenderapplicationDto):Promise<any> {
    return await this.tenderapplicationService.update(+id, updateTenderapplicationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string):Promise<any> {
    return await this.tenderapplicationService.remove(+id);
  }
}
