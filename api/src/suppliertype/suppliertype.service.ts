import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSuppliertypeDto } from './dto/create-suppliertype.dto';
import { UpdateSuppliertypeDto } from './dto/update-suppliertype.dto';
import { Suppliertype } from './entities/suppliertype.entity';

@Injectable()
export class SuppliertypeService {
  constructor(@InjectRepository(Suppliertype) private suppliertypeRepository:Repository<Suppliertype>){}
  async create(createSuppliertypeDto: CreateSuppliertypeDto) {
    const created = await this.suppliertypeRepository.create(createSuppliertypeDto)
    await this.suppliertypeRepository.save(created)
    return {'status':'success','message':'Supplier Type Successfully Created'}
  }

  async findAll() {
    return await this.suppliertypeRepository.find()
  }

  async findOne(id: number) {
    return  await this.suppliertypeRepository.findOne(id)
  }

  async update(id: number, updateSuppliertypeDto: UpdateSuppliertypeDto) {
    await this.suppliertypeRepository.update(id,updateSuppliertypeDto)
    return {'status':'success','message':'Supplier Type Successfully Updated'}
  }

  async remove(id: number) {
    await this.suppliertypeRepository.delete(id)
    return {'status':'success','message':'Supplier Type Successfully deleted'}
  }

  async summary(){
    await this.suppliertypeRepository.find({relations:["accounts"]})
  }
}
