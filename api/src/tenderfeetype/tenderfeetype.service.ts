import { Injectable } from '@nestjs/common';
import { CreateTenderfeetypeDto } from './dto/create-tenderfeetype.dto';
import { UpdateTenderfeetypeDto } from './dto/update-tenderfeetype.dto';

@Injectable()
export class TenderfeetypeService {
  create(createTenderfeetypeDto: CreateTenderfeetypeDto) {
    return 'This action adds a new tenderfeetype';
  }

  findAll() {
    return `This action returns all tenderfeetype`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tenderfeetype`;
  }

  update(id: number, updateTenderfeetypeDto: UpdateTenderfeetypeDto) {
    return `This action updates a #${id} tenderfeetype`;
  }

  remove(id: number) {
    return `This action removes a #${id} tenderfeetype`;
  }
}
