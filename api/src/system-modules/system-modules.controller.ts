import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SystemModulesService } from './system-modules.service';
import { CreateSystemModuleDto } from './dto/create-system-module.dto';
import { UpdateSystemModuleDto } from './dto/update-system-module.dto';
import { SystemModule } from './entities/system-module.entity';

@Controller('api/admin/system-modules')
export class SystemModulesController {
  constructor(private readonly systemModulesService: SystemModulesService) {}

  @Post()
 async create(@Body() createSystemModuleDto: CreateSystemModuleDto) {
    return await this.systemModulesService.create(createSystemModuleDto);
  }

  @Get()
  async findAll():Promise<SystemModule[]> {
    return await this.systemModulesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string):Promise<SystemModule> {
    return await this.systemModulesService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSystemModuleDto: UpdateSystemModuleDto):Promise<any> {
    return await this.systemModulesService.update(+id, updateSystemModuleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string):Promise<any> {
    return await this.systemModulesService.remove(+id);
  }
}
