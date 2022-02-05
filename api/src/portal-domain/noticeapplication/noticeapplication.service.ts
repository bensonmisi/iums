import { Injectable } from '@nestjs/common';
import { CreateNoticeapplicationDto } from './dto/create-noticeapplication.dto';
import { UpdateNoticeapplicationDto } from './dto/update-noticeapplication.dto';

@Injectable()
export class NoticeapplicationService {
  create(createNoticeapplicationDto: CreateNoticeapplicationDto) {
    return 'This action adds a new noticeapplication';
  }

  findAll() {
    return `This action returns all noticeapplication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} noticeapplication`;
  }

  update(id: number, updateNoticeapplicationDto: UpdateNoticeapplicationDto) {
    return `This action updates a #${id} noticeapplication`;
  }

  remove(id: number) {
    return `This action removes a #${id} noticeapplication`;
  }
}
