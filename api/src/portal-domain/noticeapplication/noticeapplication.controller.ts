import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NoticeapplicationService } from './noticeapplication.service';
import { CreateNoticeapplicationDto } from './dto/create-noticeapplication.dto';
import { UpdateNoticeapplicationDto } from './dto/update-noticeapplication.dto';

@Controller('noticeapplication')
export class NoticeapplicationController {
  constructor(private readonly noticeapplicationService: NoticeapplicationService) {}

  @Post()
  create(@Body() createNoticeapplicationDto: CreateNoticeapplicationDto) {
    return this.noticeapplicationService.create(createNoticeapplicationDto);
  }

  @Get()
  findAll() {
    return this.noticeapplicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noticeapplicationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoticeapplicationDto: UpdateNoticeapplicationDto) {
    return this.noticeapplicationService.update(+id, updateNoticeapplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noticeapplicationService.remove(+id);
  }
}
