import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubmoduleService } from './submodule.service';
import { CreateSubmoduleDto } from './dto/create-submodule.dto';
import { UpdateSubmoduleDto } from './dto/update-submodule.dto';

@Controller('submodule')
export class SubmoduleController {
  constructor(private readonly submoduleService: SubmoduleService) {}

  @Post()
  create(@Body() createSubmoduleDto: CreateSubmoduleDto) {
    return this.submoduleService.create(createSubmoduleDto);
  }

  @Get()
  findAll() {
    return this.submoduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.submoduleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubmoduleDto: UpdateSubmoduleDto) {
    return this.submoduleService.update(+id, updateSubmoduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.submoduleService.remove(+id);
  }
}
