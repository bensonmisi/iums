import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBankdetailDto } from './dto/create-bankdetail.dto';
import { UpdateBankdetailDto } from './dto/update-bankdetail.dto';
import { Bankdetail } from './entities/bankdetail.entity';

@Injectable()
export class BankdetailsService {
  constructor(@InjectRepository(Bankdetail) private readonly bankdetailRepository:Repository<Bankdetail>){}
 async create(createBankdetailDto: CreateBankdetailDto) {
     const checkrecord = await this.bankdetailRepository.findOne({where:{accountId:createBankdetailDto.accountId,currencyId:createBankdetailDto.currencyId}})
     if(!checkrecord){
         await this.bankdetailRepository.save(createBankdetailDto)
         return {"status":"success","message":"Bank Details successfully created"}
     }
     throw new  HttpException("Bank Details already exist",HttpStatus.BAD_REQUEST)
  }

  async findAll() {
    return await this.bankdetailRepository.find({where:{status:'PENDING'},relations:['currency','account']})
  }

  async findByAccount(id: number) {
    return await this.bankdetailRepository.find({where:{accountId:id},relations:['currency']});
  }

  async update(id: number, updateBankdetailDto: UpdateBankdetailDto) {
    const record = await this.bankdetailRepository.findOne({where:{id:id}})
    if(record.status==='PENDING')
    {
    await this.bankdetailRepository.update(id,updateBankdetailDto)
    return {"status":"success","message":"Bank Details successfully  updated awaiting approval"}
    }
    throw new HttpException("Bank details cannot be editted",HttpStatus.BAD_REQUEST)
    
  }

  async remove(id: number) {
     const record = await this.bankdetailRepository.findOne(id)
     if(record.status =='PENDING'){
       await this.bankdetailRepository.delete(id)
     }
     throw new HttpException("Bank details cannot be deleted",HttpStatus.BAD_REQUEST)
  }

  async approve(id:number,userId:number) {
    const record = await this.bankdetailRepository.findOne(id)
    record.status ="APPROVED"
    record.approvedBy=userId
    await record.save()
    return {"status":"success","message":"Banking details successfully approved"}
  }
}


