import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateTenderinvoiceDto } from './dto/create-tenderinvoice.dto';
import { UpdateTenderinvoiceDto } from './dto/update-tenderinvoice.dto';
import { Tenderinvoice } from './entities/tenderinvoice.entity';

@Injectable()
export class TenderinvoiceService {
  constructor(@InjectRepository(Tenderinvoice) private readonly tenderinvoiceRepository:Repository<Tenderinvoice>){}
  create(createTenderinvoiceDto: CreateTenderinvoiceDto) {
    return 'This action adds a new tenderinvoice';
  }

  async findAll(): Promise<any> {
     return await this.tenderinvoiceRepository.find({where:{status:'AWAITING'},relations:['account'],order: {created_at: "ASC"}}) 
  }

 async findOne(id: number):Promise<any> {
    return await this.tenderinvoiceRepository.find({where:{accountId:id,status:'AWAITING'},relations:['currency']})
  }

  update(id: number, updateTenderinvoiceDto: UpdateTenderinvoiceDto) {
    return `This action updates a #${id} tenderinvoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} tenderinvoice`;
  }
}
