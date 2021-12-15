import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BidbondthresholdService } from './bidbondthreshold.service';
import { CreateBidbondthresholdDto } from './dto/create-bidbondthreshold.dto';
import { UpdateBidbondthresholdDto } from './dto/update-bidbondthreshold.dto';

@Controller('bidbondthreshold')
export class BidbondthresholdController {
  constructor(private readonly bidbondthresholdService: BidbondthresholdService) {}

  @Post()
  create(@Body() createBidbondthresholdDto: CreateBidbondthresholdDto) {
    return this.bidbondthresholdService.create(createBidbondthresholdDto);
  }

  @Get()
  findAll() {
    return this.bidbondthresholdService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bidbondthresholdService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBidbondthresholdDto: UpdateBidbondthresholdDto) {
    return this.bidbondthresholdService.update(+id, updateBidbondthresholdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bidbondthresholdService.remove(+id);
  }
}
