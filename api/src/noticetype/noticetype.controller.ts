import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NoticetypeService } from './noticetype.service';
import { CreateNoticetypeDto } from './dto/create-noticetype.dto';
import { UpdateNoticetypeDto } from './dto/update-noticetype.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';

@Controller('admin/noticetypes')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class NoticetypeController {
  constructor(private readonly noticetypeService: NoticetypeService) {}

  @Post()
  @HasPermission('CREATE_NOTICETYPE')
  async create(@Body() createNoticetypeDto: CreateNoticetypeDto) {
    return await this.noticetypeService.create(createNoticetypeDto);
  }

  @Get()
  @HasPermission('GET_NOTICETYPES')
  async findAll() {
    return this.noticetypeService.findAll();
  }

  @Get(':id')
  @HasPermission('GET_NOTICETYPE')
  findOne(@Param('id') id: string) {
    return this.noticetypeService.findOne(+id);
  }

  @Patch(':id')
  @HasPermission('UPDATE_NOTICETYPE')
  update(@Param('id') id: string, @Body() updateNoticetypeDto: UpdateNoticetypeDto) {
    return this.noticetypeService.update(+id, updateNoticetypeDto);
  }

  @Delete(':id')
  @HasPermission('DELETE_NOTICETYPE')
  remove(@Param('id') id: string) {
    return this.noticetypeService.remove(+id);
  }
}
