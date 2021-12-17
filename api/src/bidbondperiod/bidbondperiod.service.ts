import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBidbondperiodDto } from './dto/create-bidbondperiod.dto';
import { UpdateBidbondperiodDto } from './dto/update-bidbondperiod.dto';
import { Bidbondperiod } from './entities/bidbondperiod.entity';

@Injectable()
export class BidbondperiodService {
  constructor(@InjectRepository(Bidbondperiod) private readonly bidbondperiodRepository:Repository<Bidbondperiod>){}
  async create(createBidbondperiodDto: CreateBidbondperiodDto):Promise<any> {
     await this.bidbondperiodRepository.save(createBidbondperiodDto)
     return {"status":"success","message":"Bid Bond Period Successfully Created"}
  }

  async findAll():Promise<Bidbondperiod[]> {
    return await this.bidbondperiodRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} bidbondperiod`;
  }

  async update(id: number, updateBidbondperiodDto: UpdateBidbondperiodDto):Promise<any>{
    await this.bidbondperiodRepository.update(id,updateBidbondperiodDto)
    return {"status":"success","message":"Bid Bond Period Successfully Updated"}
  }

 async remove(id: number):Promise<any> {
   await this.bidbondperiodRepository.delete(id)
   return {"status":"success","message":"Bid Bond Period Successfully Deleted"}
  }
}
