import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';

@Controller('api/admin/permission')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  @HasPermission('CREATE_PERMISSION')
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Get()
  @HasPermission('GET_PERMISSIONS')
  findAll() {
    return this.permissionService.findAll();
  }

  @Get(':id')
  @HasPermission('GET_PERMISSION')
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(+id);
  }

  @Patch(':id')
  @HasPermission('UPDATE_PERMISSION')
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  @HasPermission('DELETE_PERMISSION')
  remove(@Param('id') id: string) {
    return this.permissionService.remove(+id);
  }

  @Get('assignedByRole/:id/:roleId')
  @HasPermission('GET_ASSIGNED_PERMISSION')
  async getPermissionByRole(@Param() param):Promise<any>{
    return await this.permissionService.assignedByRole(param.roleId,param.id)
  }
}
