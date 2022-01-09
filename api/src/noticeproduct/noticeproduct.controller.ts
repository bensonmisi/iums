import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NoticeproductService } from './noticeproduct.service';
import { CreateNoticeproductDto } from './dto/create-noticeproduct.dto';
import { UpdateNoticeproductDto } from './dto/update-noticeproduct.dto';

@Controller('noticeproduct')
export class NoticeproductController {
  constructor(private readonly noticeproductService: NoticeproductService) {}

  @Post()
  create(@Body() createNoticeproductDto: CreateNoticeproductDto) {
    return this.noticeproductService.create(createNoticeproductDto);
  }

  @Get()
  findAll() {
    return this.noticeproductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noticeproductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoticeproductDto: UpdateNoticeproductDto) {
    return this.noticeproductService.update(+id, updateNoticeproductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noticeproductService.remove(+id);
  }
}
