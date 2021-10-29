import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SystemModulesService } from './system-modules.service';
import { CreateSystemModuleDto } from './dto/create-system-module.dto';
import { UpdateSystemModuleDto } from './dto/update-system-module.dto';

@Controller('system-modules')
export class SystemModulesController {
  constructor(private readonly systemModulesService: SystemModulesService) {}

  @Post()
  create(@Body() createSystemModuleDto: CreateSystemModuleDto) {
    return this.systemModulesService.create(createSystemModuleDto);
  }

  @Get()
  findAll() {
    return this.systemModulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.systemModulesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSystemModuleDto: UpdateSystemModuleDto) {
    return this.systemModulesService.update(+id, updateSystemModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemModulesService.remove(+id);
  }
}
