import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuspenseService } from './suspense.service';
import { CreateSuspenseDto } from './dto/create-suspense.dto';
import { UpdateSuspenseDto } from './dto/update-suspense.dto';
import { SearchSuspenseDto } from './dto/searchsuspense.dto';

@Controller('admin/suspense')
export class SuspenseController {
  constructor(private readonly suspenseService: SuspenseService) {}

  @Post()
  create(@Body() createSuspenseDto: CreateSuspenseDto) {
    return this.suspenseService.create(createSuspenseDto);
  }

  @Get()
  findAll() {
    return this.suspenseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suspenseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSuspenseDto: UpdateSuspenseDto) {
    return this.suspenseService.update(+id, updateSuspenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suspenseService.remove(+id);
  }
  @Post('searchByCode')
  async searchbycode(@Body() searchSuspenseDto:SearchSuspenseDto){
    return await this.suspenseService.seachBycode(searchSuspenseDto)
  }
}
