import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityUser } from '../entity-user/entities/entity-user.entity';
import { CreateOrganogramDto } from './dto/create-organogram.dto';
import { UpdateOrganogramDto } from './dto/update-organogram.dto';
import { Organogram } from './entities/organogram.entity';

@Injectable()
export class OrganogramService {
  constructor(@InjectRepository(Organogram) private readonly organogramRepository:Repository<Organogram>){}
  async create(createOrganogramDto: CreateOrganogramDto,userId:number) {
    const user = await EntityUser.findOne({where:{id:userId}})
    createOrganogramDto.procuremententityId = user.procuremententityId
    createOrganogramDto.entityuserId=userId
    await this.organogramRepository.save(createOrganogramDto)
    return {status:"success",message:"Organogram successfully uploaded"}
  }

  async findAll(userId:number) {
    const user = await EntityUser.findOne({where:{id:userId}})
    return await this.organogramRepository.find({where:{procuremententityId:user.procuremententityId}})
  }

  findOne(id: number) {
    return `This action returns a #${id} organogram`;
  }

  async update(id: number, updateOrganogramDto: UpdateOrganogramDto,userId:number) {
    updateOrganogramDto.entityuserId = userId
    await this.organogramRepository.update(id,updateOrganogramDto)
    return {status:"success",message:"Organogram successfully Updated"}
  }

  async remove(id: number,userId:number) {
   await this.organogramRepository.delete(id)
   return {status:"success",message:"Organogram successfully Deleted"}

  }
}
