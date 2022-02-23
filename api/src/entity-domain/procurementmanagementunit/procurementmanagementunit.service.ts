import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityUser } from '../entity-user/entities/entity-user.entity';
import { CreateProcurementmanagementunitDto } from './dto/create-procurementmanagementunit.dto';
import { UpdateProcurementmanagementunitDto } from './dto/update-procurementmanagementunit.dto';
import { Procurementmanagementunit } from './entities/procurementmanagementunit.entity';

@Injectable()
export class ProcurementmanagementunitService {
  constructor(@InjectRepository(Procurementmanagementunit) private readonly pmuRepository:Repository<Procurementmanagementunit>){}
  async create(createProcurementmanagementunitDto: CreateProcurementmanagementunitDto,userId:number) {
     const user = await EntityUser.findOne({where:{id:userId}})
     if(user){
        createProcurementmanagementunitDto.entityuserId=userId
       createProcurementmanagementunitDto.procuremententityId=user.procuremententityId
        console.log(createProcurementmanagementunitDto)
        await this.pmuRepository.save(createProcurementmanagementunitDto)
        return {status:"success",message:"Procurement management unit successfully created"}
     }else{
       throw new HttpException("Unauthenticated",HttpStatus.BAD_REQUEST)
     }
  }

  async findAll(userId:number) {
    const user = await EntityUser.findOne({where:{id:userId}})
    return  await this.pmuRepository.find({where:{procuremententityId:user.procuremententityId}})
  }


  async update(id: number, updateProcurementmanagementunitDto: UpdateProcurementmanagementunitDto,userId:number) {
    const user = await EntityUser.findOne({where:{id:userId}})
    if(!user){
      throw new HttpException('Unauthenticated',HttpStatus.UNAUTHORIZED)
    }
    const record = await this.pmuRepository.findOne({where:{id:id}})
    if(record && record.procuremententityId == user.procuremententityId)
    {
    await this.pmuRepository.update(id,updateProcurementmanagementunitDto)
    return {status:'success',message:'Successfully Update Procurement management unit'}
    }
    throw new HttpException('Unauthorized access',HttpStatus.UNAUTHORIZED)
  }

  async remove(id: number,userId:number) {
    const user = await EntityUser.findOne({where:{id:userId}})
    if(!user){
      throw new HttpException('Unauthenticated',HttpStatus.UNAUTHORIZED)
    }
    const record = await this.pmuRepository.findOne({where:{id:id}})
    if(record && record.procuremententityId == user.procuremententityId)
    {
    await this.pmuRepository.delete(id)
    return {status:'success',message:'Successfully Deleted Procurement management unit'}
    }
    throw new HttpException('Unauthorized access',HttpStatus.UNAUTHORIZED)
  }
}
