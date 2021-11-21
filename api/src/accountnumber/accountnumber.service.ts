import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountnumberDto } from './dto/create-accountnumber.dto';
import { UpdateAccountnumberDto } from './dto/update-accountnumber.dto';
import { Accountnumber } from './entities/accountnumber.entity';

@Injectable()
export class AccountnumberService {
  constructor(@InjectRepository(Accountnumber) private readonly accountnumberRepository:Repository<Accountnumber>){}
 async create(createAccountnumberDto: CreateAccountnumberDto) :Promise<any> {
    try {
         await  this.accountnumberRepository.save(createAccountnumberDto)
         return {'status':'success','message':'Successfully Created Account'}

    } catch (error) {
      throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST) 
    }
  }

 async findAll():Promise<Accountnumber[]> {
    return await this.accountnumberRepository.find()
  }

  async findOne(id: number):Promise<Accountnumber> {
    return await this.accountnumberRepository.findOne(id)
  }

  async update(id: number, updateAccountnumberDto: UpdateAccountnumberDto) {
   try {
      await this.accountnumberRepository.update(id,updateAccountnumberDto)
      return {'status':'success','message':'Successfully Updated Account'}
   } catch (error) {
    throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST) 
   }
  }

  async remove(id: number) {
    const record = await this.accountnumberRepository.findOne(id)
    record.status ='DELETED'
    await record.save()
    return {'status':'success','message':'Successfully Deleted Account'}
  }
}
