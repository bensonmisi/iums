import { Controller, Get, Post, Body, Patch, Param, Delete,Request, UseGuards } from '@nestjs/common';
import { NoticefeeService } from './noticefee.service';
import { CreateNoticefeeDto } from './dto/create-noticefee.dto';
import { UpdateNoticefeeDto } from './dto/update-noticefee.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';

@Controller('admin/noticefee')
@UseGuards(JwtAuthGuard)
@HasAccesslevel('ADMIN')
export class NoticefeeController {
  constructor(private readonly noticefeeService: NoticefeeService) {}

  @Post()
  @HasPermission('CREATE_NOTICEFEE')
  async create(@Body() createNoticefeeDto: CreateNoticefeeDto,@Request() req) {
    const user = req.user
    createNoticefeeDto.creator = user.userId  
    createNoticefeeDto.level="ADMIN"  
    return await this.noticefeeService.create(createNoticefeeDto);
  }


  @Get(':id')
  @HasPermission('GET_NOTICEFEES')
  async findAll(@Param('id') id: string) {
    return await this.noticefeeService.findAll(+id);
  }

  @Patch(':id')
  @HasPermission('UPDATE_NOTICEFEE')
  update(@Param('id') id: string, @Body() updateNoticefeeDto: UpdateNoticefeeDto,@Request() req) {
    const user = req.user
    return this.noticefeeService.update(+id, updateNoticefeeDto,user.userId);
  }

  @Delete(':id')
  @HasPermission('DELETE_NOTICEFEE')
  async remove(@Param('id') id: string,@Request() req) {
    const user = req.user
    return await this.noticefeeService.remove(+id,user.userId);
  }
}
