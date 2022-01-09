import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NoticefeeService } from './noticefee.service';
import { CreateNoticefeeDto } from './dto/create-noticefee.dto';
import { UpdateNoticefeeDto } from './dto/update-noticefee.dto';

@Controller('noticefee')
export class NoticefeeController {
  constructor(private readonly noticefeeService: NoticefeeService) {}

  @Post()
  create(@Body() createNoticefeeDto: CreateNoticefeeDto) {
    return this.noticefeeService.create(createNoticefeeDto);
  }

  @Get()
  findAll() {
    return this.noticefeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noticefeeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoticefeeDto: UpdateNoticefeeDto) {
    return this.noticefeeService.update(+id, updateNoticefeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noticefeeService.remove(+id);
  }
}
