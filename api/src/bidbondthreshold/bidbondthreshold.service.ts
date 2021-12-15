import { Injectable } from '@nestjs/common';
import { CreateBidbondthresholdDto } from './dto/create-bidbondthreshold.dto';
import { UpdateBidbondthresholdDto } from './dto/update-bidbondthreshold.dto';

@Injectable()
export class BidbondthresholdService {
  create(createBidbondthresholdDto: CreateBidbondthresholdDto) {
    return 'This action adds a new bidbondthreshold';
  }

  findAll() {
    return `This action returns all bidbondthreshold`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bidbondthreshold`;
  }

  update(id: number, updateBidbondthresholdDto: UpdateBidbondthresholdDto) {
    return `This action updates a #${id} bidbondthreshold`;
  }

  remove(id: number) {
    return `This action removes a #${id} bidbondthreshold`;
  }
}
