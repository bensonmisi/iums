import { Injectable } from '@nestjs/common';
import { CreateNoticecategoryDto } from './dto/create-noticecategory.dto';
import { UpdateNoticecategoryDto } from './dto/update-noticecategory.dto';

@Injectable()
export class NoticecategoryService {
  create(createNoticecategoryDto: CreateNoticecategoryDto) {
    return 'This action adds a new noticecategory';
  }

  findAll() {
    return `This action returns all noticecategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} noticecategory`;
  }

  update(id: number, updateNoticecategoryDto: UpdateNoticecategoryDto) {
    return `This action updates a #${id} noticecategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} noticecategory`;
  }
}
