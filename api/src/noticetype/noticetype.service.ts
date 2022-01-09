import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenderfeetype } from 'src/tenderfeetype/entities/tenderfeetype.entity';
import { In, Repository } from 'typeorm';
import { CreateNoticetypeDto } from './dto/create-noticetype.dto';
import { UpdateNoticetypeDto } from './dto/update-noticetype.dto';
import { Noticetype } from './entities/noticetype.entity';

@Injectable()
export class NoticetypeService {
  constructor(@InjectRepository(Noticetype) private readonly noticetypeRepository:Repository<Noticetype>){}
  async create(createNoticetypeDto: CreateNoticetypeDto):Promise<any> {
    const type = await this.noticetypeRepository.save(createNoticetypeDto)


     if(createNoticetypeDto.types.length>0)
     {
    const getrecord = await this.noticetypeRepository.findOne({where:{id:type.id},relations:['tenderfeetype']})
    const feetypes  = await Tenderfeetype.find({where:{id:In(createNoticetypeDto.types)}})
    getrecord.tenderfeetype.push(...feetypes)
    await this.noticetypeRepository.save(getrecord)
     }

    return {'status':'success','message':'Successfully Created Notice Type'}
  }

  async findAll() {
    return await this.noticetypeRepository.find({relations:['tenderfeetype']})
  }

  findOne(id: number) {
    return `This action returns a #${id} noticetype`;
  }

  async update(id: number, updateNoticetypeDto: UpdateNoticetypeDto) {
     const record = await this.noticetypeRepository.findOne({where:{id:id},relations:['tenderfeetype']})
     record.name = updateNoticetypeDto.name
     await record.save()  
     
     record.tenderfeetype = []

    await  this.noticetypeRepository.save(record)

    const feetypes  = await Tenderfeetype.find({where:{id:In(updateNoticetypeDto.types)}})
    record.tenderfeetype.push(...feetypes)
    await this.noticetypeRepository.save(record)   
    return {'status':'success','message':'Successfully Updated Notice Type'}
    
   


  }

  async remove(id: number) {
    return `This action removes a #${id} noticetype`;
  }
}
