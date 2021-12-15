import { Injectable } from '@nestjs/common';
import { CreateTendereditrequestDto } from './dto/create-tendereditrequest.dto';
import { UpdateTendereditrequestDto } from './dto/update-tendereditrequest.dto';

@Injectable()
export class TendereditrequestService {
  create(createTendereditrequestDto: CreateTendereditrequestDto) {
    return 'This action adds a new tendereditrequest';
  }

  findAll() {
    return `This action returns all tendereditrequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tendereditrequest`;
  }

  update(id: number, updateTendereditrequestDto: UpdateTendereditrequestDto) {
    return `This action updates a #${id} tendereditrequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} tendereditrequest`;
  }
}
