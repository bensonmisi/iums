import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SystemModulesService } from './system-modules.service';
import { CreateSystemModuleDto } from './dto/create-system-module.dto';
import { UpdateSystemModuleDto } from './dto/update-system-module.dto';
import { SystemModule } from './entities/system-module.entity';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';

@Controller('admin/system-modules')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class SystemModulesController {
  constructor(private readonly systemModulesService: SystemModulesService) {}

  @Post()
  @HasPermission('CREATE_SYSTEMMODULE')
 async create(@Body() createSystemModuleDto: CreateSystemModuleDto) {
    return await this.systemModulesService.create(createSystemModuleDto);
  }

  @Get()
  @HasPermission('GET_SYSTEMMODULES')
  async findAll():Promise<SystemModule[]> {
    return await this.systemModulesService.findAll();
  }

  @Get(':id')
  @HasPermission('GET_SYSTEMMODULE')
  async findOne(@Param('id') id: string):Promise<SystemModule> {
    return await this.systemModulesService.findOne(+id);
  }

  @Patch(':id')
  @HasPermission('UPDATE_SYSTEMMODULE')
  async update(@Param('id') id: string, @Body() updateSystemModuleDto: UpdateSystemModuleDto):Promise<any> {
    return await this.systemModulesService.update(+id, updateSystemModuleDto);
  }

  @Delete(':id')
  @HasPermission('DELETE_SYSTEMMODULE')
  async remove(@Param('id') id: string):Promise<any> {
    return await this.systemModulesService.remove(+id);
  }

  @Get('assignByRole/:id')
  @HasPermission('GET_ASSIGNED_SYSTEMMODULES')
  async getAssignedByRole(@Param() id:number):Promise<any>{
    return await this.systemModulesService.getModulesByRole(id)
  }
}
