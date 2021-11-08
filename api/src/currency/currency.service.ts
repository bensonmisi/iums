import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Currency } from './entities/currency.entity';

@Injectable()
export class CurrencyService {
  constructor(@InjectRepository(Currency) private currencyRepository:Repository<Currency>){}
  async create(createCurrencyDto: CreateCurrencyDto) {
    try {
      const created = await this.currencyRepository.create(createCurrencyDto)
      await this.currencyRepository.save(created)
      return {'status':'success','message':'Successfully Created Currency'};
    
    } catch (error) {
       throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)  
    }
  }

  async findAll() {
    return await this.currencyRepository.find();
  }

  async findOne(id: number) {
    return await this.currencyRepository.findOne(id);
  }

  async update(id: number, updateCurrencyDto: UpdateCurrencyDto) {
    try {
      await this.currencyRepository.update(id,updateCurrencyDto)
      return {'status':'success','message':'Successfully Updated Currency'};
   
    } catch (error) {
      throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)  
 
    }
  }

  async remove(id: number) {
    try {
      await this.currencyRepository.delete(id)
      return {'status':'success','message':'Successfully Deleted Currency'};
   
    } catch (error) {
      throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)  
  
    }
     
  }
}
