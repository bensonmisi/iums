import { Injectable } from '@nestjs/common';
import { CreateNoticeproductDto } from './dto/create-noticeproduct.dto';
import { UpdateNoticeproductDto } from './dto/update-noticeproduct.dto';

@Injectable()
export class NoticeproductService {
  create(createNoticeproductDto: CreateNoticeproductDto) {
    return 'This action adds a new noticeproduct';
  }

  findAll() {
    return `This action returns all noticeproduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} noticeproduct`;
  }

  update(id: number, updateNoticeproductDto: UpdateNoticeproductDto) {
    return `This action updates a #${id} noticeproduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} noticeproduct`;
  }
}
