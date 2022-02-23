import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityUser } from '../entity-user/entities/entity-user.entity';
import { CreateEvaluationcommitteDto } from './dto/create-evaluationcommitte.dto';
import { UpdateEvaluationcommitteDto } from './dto/update-evaluationcommitte.dto';
import { Evaluationcommitte } from './entities/evaluationcommitte.entity';

@Injectable()
export class EvaluationcommitteService {
  constructor(@InjectRepository(Evaluationcommitte) private readonly evaluationcommitteRepository:Repository<Evaluationcommitte>){}
  async create(createEvaluationcommitteDto: CreateEvaluationcommitteDto,userId:number) {
    const user = await EntityUser.findOne({where:{id:userId}})
    createEvaluationcommitteDto.entityuserId = user.id
    createEvaluationcommitteDto.procuremententityId = user.procuremententityId
    await this.evaluationcommitteRepository.save(createEvaluationcommitteDto)
    return {status:'success',message:'Evaluation committe successfully save'}
  }

  async findAll(userId:number) {
    const user = await EntityUser.findOne({where:{id:userId}})
    return await this.evaluationcommitteRepository.find({where:{procuremententityId:user.procuremententityId}})
  }

  
  async update(id: number, updateEvaluationcommitteDto: UpdateEvaluationcommitteDto,userId:number) {
    const user = await EntityUser.findOne({where:{id:userId}})
    const record = await this.evaluationcommitteRepository.findOne(id)

    if(record.procuremententityId !== user.procuremententityId){
      throw new HttpException("Unauthorized",HttpStatus.BAD_REQUEST)
    }

    await this.evaluationcommitteRepository.update(id,updateEvaluationcommitteDto)

    return {status:"success",message:"Evaluation committed member updated"}
   
  }

  async remove(id: number,userId:number) {
     const user = await EntityUser.findOne({where:{id:userId}})
     const record = await this.evaluationcommitteRepository.findOne({where:{id:id}})
     if(user.procuremententityId !== record.procuremententityId){
      throw new HttpException("Unauthorized",HttpStatus.BAD_REQUEST) 
     }

     await this.evaluationcommitteRepository.delete(id)

     return {status:"success",message:"Evaluation committed member deleted"}
  }
}
