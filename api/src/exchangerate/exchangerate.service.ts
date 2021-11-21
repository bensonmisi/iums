import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExchangerateDto } from './dto/create-exchangerate.dto';
import { UpdateExchangerateDto } from './dto/update-exchangerate.dto';
import { Exchangerate } from './entities/exchangerate.entity';

@Injectable()
export class ExchangerateService {
  constructor(@InjectRepository(Exchangerate) private exchangerateRepository:Repository<Exchangerate>){}
 async create(createExchangerateDto: CreateExchangerateDto,administratorId:any) {
    try {
        const{primaryId,secondaryId,type,value} = createExchangerateDto
      const created = await this.exchangerateRepository.create({primaryId,secondaryId,type,value,administratorId})
      await this.exchangerateRepository.save(created)   
      return {'status':'success','message':'Exchange Successfully Created'} 
    } catch (error) {
       throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)
    }
  
  }

  async findAll() {
    return await this.exchangerateRepository.find()
  }

 async findOne(id: number) {
    return await this.exchangerateRepository.findOne(id)
  }

 async update(id: number, updateExchangerateDto: UpdateExchangerateDto) {
 try {
   await this.exchangerateRepository.update(id,updateExchangerateDto) 
   return {'status':'success','message':'Exchange Successfully Updated'}
 } catch (error) {
  throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)
 }
  }

  async remove(id: number) {
    await this.exchangerateRepository.delete(id)
    return {'status':'success','message':'Exchange Successfully deleted'}
  }
}
