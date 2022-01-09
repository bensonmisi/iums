import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';

@Controller('entity/notice')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Post()
  @HasPermission('CREATE_NOTICE')
 async create(@Body() createNoticeDto: CreateNoticeDto) {
    return await this.noticeService.create(createNoticeDto);
  }

  @Get()
 @HasPermission('GET_NOTICES')
 async findAll() {
    return await this.noticeService.findAll();
  }

  @Get(':id')
  @HasPermission('GET_NOTICE')
  findOne(@Param('id') id: string) {
    return this.noticeService.findOne(+id);
  }

  @Patch(':id')
  @HasPermission('UPDATE_NOTICE')
  update(@Param('id') id: string, @Body() updateNoticeDto: UpdateNoticeDto) {
    return this.noticeService.update(+id, updateNoticeDto);
  }

  @Delete(':id')
  @HasPermission('DELETE_NOTICE')
  remove(@Param('id') id: string) {
    return this.noticeService.remove(+id);
  }
}
