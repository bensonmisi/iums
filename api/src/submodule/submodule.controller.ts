import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SubmoduleService } from './submodule.service';
import { CreateSubmoduleDto } from './dto/create-submodule.dto';
import { UpdateSubmoduleDto } from './dto/update-submodule.dto';
import { Submodule } from './entities/submodule.entity';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';

@Controller('api/admin/submodules')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class SubmoduleController {
  constructor(private readonly submoduleService: SubmoduleService) {}

  @Post()
  @HasPermission('CREATE_SUBMODULE')
 async create(@Body() createSubmoduleDto: CreateSubmoduleDto):Promise<any> {
    return await this.submoduleService.create(createSubmoduleDto);
  }

  @Get('all/:id')
  @HasPermission('GET_SUBMODULES')
  async findAll(@Param('id') id:string):Promise<Submodule[]> {
    return await this.submoduleService.findAll(id);
  }

  @Get('each/:id')
  @HasPermission('GET_SUBMODULE')
  async findOne(@Param('id') id: string):Promise<Submodule> {
    return await this.submoduleService.findOne(+id);
  }

  @Patch(':id')
  @HasPermission('UPDATE_SUBMODULE')
  update(@Param('id') id: string, @Body() updateSubmoduleDto: UpdateSubmoduleDto):Promise<any> {
    return this.submoduleService.update(+id, updateSubmoduleDto);
  }

  @Delete(':id')
  @HasPermission('DELETE_SUBMODULE')
  remove(@Param('id') id: string) :Promise<any>{
    return this.submoduleService.remove(+id);
  }

  @Get('assignedByRole/:id/:roleId')
  @HasPermission('GET_ASSIGN_SUBMODULE')
  async getSubmodulesByRole(@Param() param):Promise<any>{
    return await this.submoduleService.getSubModulesByRole(param.roleId,param.id)
  }
}
