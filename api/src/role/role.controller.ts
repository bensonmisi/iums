import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

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
}
