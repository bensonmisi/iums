import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { Bank } from './entities/bank.entity';

@Injectable()
export class BankService {
  constructor(@InjectRepository(Bank) private readonly bankRepository:Repository<Bank>){}
  async create(createBankDto: CreateBankDto):Promise<any> {
     try {
        await this.bankRepository.save(createBankDto)
        return {"status":"success","message":"Bank Successfully Created"}
     } catch (error) {
       throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST) 
     }
  }

 async findAll():Promise<Bank[]> {
    return await this.bankRepository.find()
  }

  async findOne(id: number) {
    return await this.bankRepository.findOne(id)
  }

  async update(id: number, updateBankDto: UpdateBankDto) {
     try {
       await this.bankRepository.update(id,updateBankDto)
       return {"status":"success","message":"Bank Successfully Updated"}
     } catch (error) {
      throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST) 
     } 
  }

 async  remove(id: number) {
     const record =  await this.bankRepository.findOne(id)
      record.status ="DELETED"
      await record.save()
      return {"status":"success","message":"Bank Successfully Deleted"}
  }

  async searchByauthCode(code:string):Promise<Bank>{
    return await this.bankRepository.findOne({authcode:code})
  }
}
