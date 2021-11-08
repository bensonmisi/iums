import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRegistrationperiodDto } from './dto/create-registrationperiod.dto';
import { UpdateRegistrationperiodDto } from './dto/update-registrationperiod.dto';
import { Registrationperiod } from './entities/registrationperiod.entity';

@Injectable()
export class RegistrationperiodService {
  constructor(@InjectRepository(Registrationperiod) private registationperiodRepository:Repository<Registrationperiod>){}
  async create(createRegistrationperiodDto: CreateRegistrationperiodDto) {
     try {
       const {regyear} = createRegistrationperiodDto
       const date = new Date()
       if(regyear >= date.getFullYear())
       {
      const created = await this.registationperiodRepository.create(createRegistrationperiodDto)
      await this.registationperiodRepository.save(created) 
      return {"status":"success","message":"Registration Period Successfully Created"}
       }
       throw new  HttpException({message:"Registration Year cannot be less than the current year"},HttpStatus.BAD_REQUEST)
     } catch (error) {
        throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)
     }
     }

 async findAll() {
    return await this.registationperiodRepository.find()
  }

  async findOne(id: number) {
    return  await this.registationperiodRepository.findOne(id)
  }

 async  update(id: number, updateRegistrationperiodDto: UpdateRegistrationperiodDto) {
  try {
    const {regyear} = updateRegistrationperiodDto
       const date = new Date()
       if(regyear >= date.getFullYear())
       {
    await this.registationperiodRepository.update(id,updateRegistrationperiodDto)
     return {"status":"success","message":"Registration Period Successfully Updated"}
       }
       throw new  HttpException("Registration Year cannot be less than the current year",HttpStatus.BAD_REQUEST)
  
  } catch (error) {
    throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)
     
  }  
    }

  remove(id: number) {
    //return {"status":"success","message":"Registration Period Successfully Updated"}
  }
}
