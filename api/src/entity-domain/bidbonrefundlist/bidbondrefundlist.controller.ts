import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BidbondrefundlistService } from './bidbondrefundlist.service';
import { CreateBidbondrefundlistDto } from './dto/create-bidbondrefundlist.dto';
import { UpdateBidbondrefundlistDto } from './dto/update-bidbondrefundlist.dto';

@Controller('bidbonrefundlist')
export class BidbonrefundlistController {
  constructor(private readonly bidbonrefundlistService: BidbondrefundlistService) {}

  @Post()
  create(@Body() createBidbondrefundlistDto: CreateBidbondrefundlistDto) {
    return this.bidbonrefundlistService.create(createBidbondrefundlistDto);
  }

  @Get()
  findAll() {
    return this.bidbonrefundlistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bidbonrefundlistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBidbondrefundlistDto: UpdateBidbondrefundlistDto) {
    return this.bidbonrefundlistService.update(+id, updateBidbondrefundlistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bidbonrefundlistService.remove(+id);
  }
}
