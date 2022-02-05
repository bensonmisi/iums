import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NoticecategoryService } from './noticecategory.service';
import { CreateNoticecategoryDto } from './dto/create-noticecategory.dto';
import { UpdateNoticecategoryDto } from './dto/update-noticecategory.dto';

@Controller('noticecategory')
export class NoticecategoryController {
  constructor(private readonly noticecategoryService: NoticecategoryService) {}

  @Post()
  create(@Body() createNoticecategoryDto: CreateNoticecategoryDto) {
    return this.noticecategoryService.create(createNoticecategoryDto);
  }

  @Get()
  findAll() {
    return this.noticecategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noticecategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoticecategoryDto: UpdateNoticecategoryDto) {
    return this.noticecategoryService.update(+id, updateNoticecategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noticecategoryService.remove(+id);
  }
}
