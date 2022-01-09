import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContactfeethresholdDto } from './dto/create-contactfeethreshold.dto';
import { UpdateContactfeethresholdDto } from './dto/update-contactfeethreshold.dto';
import { Contactfeethreshold } from './entities/contactfeethreshold.entity';

@Injectable()
export class ContactfeethresholdService {
  constructor(@InjectRepository(Contactfeethreshold) private readonly contractfeethresholdRepository:Repository<Contactfeethreshold>){}
  async create(createContactfeethresholdDto: CreateContactfeethresholdDto) {
   try {
    await this.contractfeethresholdRepository.save(createContactfeethresholdDto)
    return{"status":"success","message":"Contract fee threshold successfully create"}  
   } catch (error) {
     throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)
   }
  }

  async findAll() {
    return await this.contractfeethresholdRepository.find()
  }

  async findOne(id: number) {
    return await this.contractfeethresholdRepository.findOne(id);
  }

  async update(id: number, updateContactfeethresholdDto: UpdateContactfeethresholdDto) {
     try {
        await this.contractfeethresholdRepository.update(id,updateContactfeethresholdDto) 
          return {"status":"success","message":"Contract fee successfully created"}
      } catch (error) {
        throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)
     }
  }

  async remove(id: number) {
     await this.contractfeethresholdRepository.delete(id)
     return {"status":"succcess","message":'Contract fee successfully deleted'}
  }
}
