import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { TaskmanagerService } from './taskmanager.service';
import { CreateTaskmanagerDto } from './dto/create-taskmanager.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';

@Controller('admin/taskmanager')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class TaskmanagerController {
  constructor(private readonly taskmanagerService: TaskmanagerService) {}

  @Post()
  
  create(@Body() createTaskmanagerDto: CreateTaskmanagerDto,@Request() req) {
    const user = req.user
    createTaskmanagerDto.administratorId = user.userId
    return this.taskmanagerService.create(createTaskmanagerDto);
  }

  @Get()
 
  async findAll(@Request() req) {
    const user = req.user
    return this.taskmanagerService.findAll(user.userId);
  }

  @Get(':id')
 
  async completed(@Param('id') id:string, @Request() req) {
    const user = req.user
    return this.taskmanagerService.completed(+id,user.userId);
  }
 

  @Delete(':id')
 
  async remove(@Param('id') id: string, @Request() req) {
    const user = req.user
    return this.taskmanagerService.remove(+id,+user.userId);
  }
}
