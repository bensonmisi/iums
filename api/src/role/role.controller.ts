import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { AssignModuleDto } from './dto/assign-module.dto';
import { AssignSubmoduleDto } from './dto/assign-submodule.dto';
import { AssignPermissionDto } from './dto/assign-permission.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { HasPermission } from 'src/decorators/hasPermission.decorator';
import { PermissionGuard } from 'src/guards/permission.guard';

@Controller('admin/role')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
   @HasPermission('CREATE_ROLE')
  async create(@Body() createRoleDto: CreateRoleDto,@Request() req):Promise<any> {
    const user = req.user
    createRoleDto.creator = user.userId
    return await this.roleService.create(createRoleDto);
  }

  @Get()
  @HasPermission('GET_ROLES')
  async findAll():Promise<Role[]> { 
    return await this.roleService.findAll();
  }

  @Get(':id')
  @HasPermission('GET_ROLE')
  async findOne(@Param('id') id: string):Promise<Role> {
    return await this.roleService.findOne(+id);
  }

  @Patch(':id')
  @HasPermission('UPDATE_ROLE')
 async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto,@Request() req):Promise<any> {
   const user = req.user
    return await this.roleService.update(+id, updateRoleDto,user.userId);
  }

  @Delete(':id')
  @HasPermission('DELETE_ROLE')
  async remove(@Param('id') id: string,@Request() req):Promise<any> {
    const user = req.user
    return await this.roleService.remove(+id,user.userId);
  }

  @Post('assignsystemmodule')
  @HasPermission('ASSIGN_SYSTEMMODULE')
  async assignsystemmodule(@Body() assignmoduleDto:AssignModuleDto):Promise<any>{
    return await this.roleService.assignsystemmodule(assignmoduleDto)
  }

  @Post('unassignsystemmodule')
  @HasPermission('UNASSIGN_SYSTEMMODULE')
  async unassignsystemmodule(@Body() assignmoduleDto:AssignModuleDto):Promise<any>{
    return await this.roleService.unassignsystemmodule(assignmoduleDto)
  }

  @Post('assignsubmodule')
  @HasPermission('ASSIGN_SUBMODULE')
  async assignsubmodule(@Body() assignsubmoduleDto:AssignSubmoduleDto):Promise<any>{
    return await this.roleService.assignsubmodule(assignsubmoduleDto)
  }

  @Post('unassignsubmodule')
  @HasPermission('UNASSIGN_SUBMODULE')
  async unassignsubmodule(@Body() assignsubmoduleDto:AssignSubmoduleDto):Promise<any>{
    return await this.roleService.unassignsubmodule(assignsubmoduleDto)
  }

  @Post('assignpermission')
  @HasPermission('ASSIGN_PERMISSION')
  async assignpermission(@Body() assignpermissionDto:AssignPermissionDto):Promise<any>{
    return await this.roleService.assignpermission(assignpermissionDto)
  }
  @Post('unassignpermission')
  @HasPermission('ASSIGN_PERMISSION')
  async unassignpermission(@Body() assignpermissionDto:AssignPermissionDto):Promise<any>{
    return await this.roleService.unassignpermission(assignpermissionDto)
  }
}
