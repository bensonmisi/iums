import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { AssignModuleDto } from './dto/assign-module.dto';
import { AssignSubmoduleDto } from './dto/assign-submodule.dto';
import { AssignPermissionDto } from './dto/assign-permission.dto';

@Controller('api/admin/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto):Promise<any> {
    return await this.roleService.create(createRoleDto);
  }

  @Get()
  async findAll():Promise<Role[]> {
    return await this.roleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string):Promise<Role> {
    return await this.roleService.findOne(+id);
  }

  @Patch(':id')
 async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto):Promise<any> {
    return await this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string):Promise<any> {
    return await this.roleService.remove(+id);
  }

  @Post('assignsystemmodule')
  async assignsystemmodule(@Body() assignmoduleDto:AssignModuleDto):Promise<any>{
    return await this.roleService.assignsystemmodule(assignmoduleDto)
  }

  @Post('unassignsystemmodule')
  async unassignsystemmodule(@Body() assignmoduleDto:AssignModuleDto):Promise<any>{
    return await this.roleService.unassignsystemmodule(assignmoduleDto)
  }

  @Post('assignsubmodule')
  async assignsubmodule(@Body() assignsubmoduleDto:AssignSubmoduleDto):Promise<any>{
    return await this.roleService.assignsubmodule(assignsubmoduleDto)
  }

  @Post('unassignsubmodule')
  async unassignsubmodule(@Body() assignsubmoduleDto:AssignSubmoduleDto):Promise<any>{
    return await this.roleService.unassignsubmodule(assignsubmoduleDto)
  }

  @Post('assignpermission')
  async assignpermission(@Body() assignpermissionDto:AssignPermissionDto):Promise<any>{
    return await this.roleService.assignpermission(assignpermissionDto)
  }
}
