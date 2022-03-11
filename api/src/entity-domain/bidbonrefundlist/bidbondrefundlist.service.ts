import { Injectable } from '@nestjs/common';
import { CreateBidbondrefundlistDto } from './dto/create-bidbondrefundlist.dto';
import { UpdateBidbondrefundlistDto } from './dto/update-bidbondrefundlist.dto';

@Injectable()
export class BidbondrefundlistService {
  create(createBidbondrefundlistDto: CreateBidbondrefundlistDto) {
    return 'This action adds a new bidbonrefundlist';
  }

  findAll() {
    return `This action returns all bidbonrefundlist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bidbonrefundlist`;
  }

  update(id: number, updateBidbondrefundlistDto: UpdateBidbondrefundlistDto) {
    return `This action updates a #${id} bidbonrefundlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} bidbonrefundlist`;
  }
}
