import { Injectable } from '@nestjs/common';
import { CreateOnlinepaymentDto } from './dto/create-onlinepayment.dto';
import { UpdateOnlinepaymentDto } from './dto/update-onlinepayment.dto';

@Injectable()
export class OnlinepaymentService {
  create(createOnlinepaymentDto: CreateOnlinepaymentDto) {
    return 'This action adds a new onlinepayment';
  }

  findAll() {
    return `This action returns all onlinepayment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} onlinepayment`;
  }

  update(id: number, updateOnlinepaymentDto: UpdateOnlinepaymentDto) {
    return `This action updates a #${id} onlinepayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} onlinepayment`;
  }
}
