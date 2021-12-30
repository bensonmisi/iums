import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';

@Controller('admin/bidders')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HasPermission('CREATE_BIDDER')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @HasPermission('UPDATE_BIDDER')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req) {
       return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @HasPermission('DELETE_BIDDER')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
