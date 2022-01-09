import { Injectable } from '@nestjs/common';
import { CreateNoticefeeDto } from './dto/create-noticefee.dto';
import { UpdateNoticefeeDto } from './dto/update-noticefee.dto';

@Injectable()
export class NoticefeeService {
  create(createNoticefeeDto: CreateNoticefeeDto) {
    return 'This action adds a new noticefee';
  }

  findAll() {
    return `This action returns all noticefee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} noticefee`;
  }

  update(id: number, updateNoticefeeDto: UpdateNoticefeeDto) {
    return `This action updates a #${id} noticefee`;
  }

  remove(id: number) {
    return `This action removes a #${id} noticefee`;
  }
}
