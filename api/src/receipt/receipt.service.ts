import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { Receipt } from './entities/receipt.entity';

@Injectable()
export class ReceiptService {
  constructor(@InjectRepository(Receipt) private readonly receiptRepository:Repository<Receipt>){}
  create(createReceiptDto: CreateReceiptDto) {
    return 'This action adds a new receipt';
  }

  findAll() {
    return `This action returns all receipt`;
  }

  async findOne(receiptnumber: string):Promise<any> {
    return await this.receiptRepository.findOne({where:{receiptnumber:receiptnumber},relations:['currency']})
  }

  update(id: number, updateReceiptDto: UpdateReceiptDto) {
    return `This action updates a #${id} receipt`;
  }

  remove(id: number) {
    return `This action removes a #${id} receipt`;
  }
}
