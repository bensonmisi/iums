import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRegistrationfeeDto } from './dto/create-registrationfee.dto';
import { UpdateRegistrationfeeDto } from './dto/update-registrationfee.dto';
import { Registrationfee } from './entities/registrationfee.entity';

@Injectable()
export class RegistrationfeeService {
  constructor(@InjectRepository(Registrationfee) private registrationfeeRepository:Repository<Registrationfee>){}
  async create(createRegistrationfeeDto: CreateRegistrationfeeDto,id:any) {
     try {
          const created = await this.registrationfeeRepository.create({...createRegistrationfeeDto,administrator_id:id})
          await this.registrationfeeRepository.save(created)
          return {'status':'success','message':'Registration Price Successfully Createed'}
        } catch (error) {
       throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)
     }
  }

  async findAll() {
    return await this.registrationfeeRepository.find({where:{status:'ACTIVE'}})
  }

  async findOne(id: number) {
    return await this.registrationfeeRepository.findOne(id)
  }

  async update(id: number, updateRegistrationfeeDto: UpdateRegistrationfeeDto) {
 try {
  await this.registrationfeeRepository.update(id,updateRegistrationfeeDto)
  return {'status':'success','message':'Registration Price Successfully Createed'}
 } catch (error) {
  throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)
 }
  }

  async remove(id: number) {
     const fee = await this.registrationfeeRepository.findOne(id)
     fee.status = "DELETED"
     await fee.save()
     return {'status':'success','message':'Registration Price Successfully Deleted'}
  }

  async getFee(locality:string,action:string,currencyId:number){
    return await this.registrationfeeRepository.findOne({where:{locality:locality,action:action,currencyId:currencyId}})
  }
}
