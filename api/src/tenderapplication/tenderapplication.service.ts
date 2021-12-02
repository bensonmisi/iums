import { Injectable } from '@nestjs/common';
import { CreateTenderapplicationDto } from './dto/create-tenderapplication.dto';
import { UpdateTenderapplicationDto } from './dto/update-tenderapplication.dto';

@Injectable()
export class TenderapplicationService {
  create(createTenderapplicationDto: CreateTenderapplicationDto) {
    return 'This action adds a new tenderapplication';
  }

  findAll() {
    return `This action returns all tenderapplication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tenderapplication`;
  }

  update(id: number, updateTenderapplicationDto: UpdateTenderapplicationDto) {
    return `This action updates a #${id} tenderapplication`;
  }

  remove(id: number) {
    return `This action removes a #${id} tenderapplication`;
  }
}
