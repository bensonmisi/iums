import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Receipt } from 'src/receipt/entities/receipt.entity';
import { createQueryBuilder, Repository } from 'typeorm';
import { Suspensereceipt } from './entities/suspensereceipt.entity';

@Injectable()
export class SuspensereceiptService {

    constructor(@InjectRepository(Suspensereceipt) private readonly suspensereceiptRepository:Repository<Suspensereceipt>){}

    async getById(id:number):Promise<any>{
        const receipts =  await this.suspensereceiptRepository.find({where:{suspenseId:id}})
        return receipts
    }
}
