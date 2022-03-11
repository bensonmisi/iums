import { Injectable } from '@nestjs/common';
import { CreateMonthlyreturnchecklistDto } from './dto/create-monthlyreturnchecklist.dto';
import { UpdateMonthlyreturnchecklistDto } from './dto/update-monthlyreturnchecklist.dto';

@Injectable()
export class MonthlyreturnchecklistService {
  create(createMonthlyreturnchecklistDto: CreateMonthlyreturnchecklistDto) {
    return 'This action adds a new monthlyreturnchecklist';
  }

  findAll() {
    return `This action returns all monthlyreturnchecklist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} monthlyreturnchecklist`;
  }

  update(id: number, updateMonthlyreturnchecklistDto: UpdateMonthlyreturnchecklistDto) {
    return `This action updates a #${id} monthlyreturnchecklist`;
  }

  remove(id: number) {
    return `This action removes a #${id} monthlyreturnchecklist`;
  }
}
