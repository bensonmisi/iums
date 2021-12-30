import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateTenderfeetypeDto } from './dto/create-tenderfeetype.dto';
import { UpdateTenderfeetypeDto } from './dto/update-tenderfeetype.dto';
import { Tenderfeetype } from './entities/tenderfeetype.entity';

@Injectable()
export class TenderfeetypeService {
  constructor(@InjectRepository(Tenderfeetype) private readonly tenderfeetypeRepository:Repository<Tenderfeetype>){}
 async create(createTenderfeetypeDto: CreateTenderfeetypeDto):Promise<any> {
       await this.tenderfeetypeRepository.save(createTenderfeetypeDto)
      return {"status":"success","message":"Successfully Created tender fee"}
  }

  async findAll():Promise<Tenderfeetype[]> {
    return await this.tenderfeetypeRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} tenderfeetype`;
  }

  async update(id: number, updateTenderfeetypeDto: UpdateTenderfeetypeDto):Promise<any> {
    await this.tenderfeetypeRepository.update(id,updateTenderfeetypeDto)
    return {"status":"success","message":"Successfully Updated tender fee"}
  }

  async remove(id: number):Promise<any> {
    await this.tenderfeetypeRepository.delete(id)
    return {"status":"success","message":"Successfully Deleted tender fee"}
  }
}
