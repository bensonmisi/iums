import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditService } from 'src/audit/audit.service';
import { LogDataDto } from 'src/audit/dto/logdata.dto';
import { Repository } from 'typeorm';
import { CreateProcurementthresholdDto } from './dto/create-procurementthreshold.dto';
import { UpdateProcurementthresholdDto } from './dto/update-procurementthreshold.dto';
import { Procurementthreshold } from './entities/procurementthreshold.entity';

@Injectable()
export class ProcurementthresholdService {
  constructor(
    @InjectRepository(Procurementthreshold) private readonly procurementthresholdRepository:Repository<Procurementthreshold>,
    private readonly auditService:AuditService
  ){}
  async create(createProcurementthresholdDto: CreateProcurementthresholdDto,userId:number) {
    try {
        const record = await this.procurementthresholdRepository.create(createProcurementthresholdDto)
        await record.save()
      const logdata:LogDataDto ={administratorId:userId,action:"CREATE",entity:"ProcurementThreshold",newvalue:record,oldvalue:{}}
      await  this.auditService.create(logdata)
      return {status:"success",message:"Procurement Threshold Successfully Save"}
      
    } catch (error) {
        const message = error.sqlMessage ? error.sqlMessage : error.message
        
        throw new HttpException(message,HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(id:number) {
    return await this.procurementthresholdRepository.find({where:{procurementclassId:id},relations:['currency','procurementclass','section']})
  }

 

 async  update(id: number, updateProcurementthresholdDto: UpdateProcurementthresholdDto,userId:number) {
   try {
     const oldrecord = await this.procurementthresholdRepository.findOne({where:{id:id}})
      const newrecord = await this.procurementthresholdRepository.update(id,updateProcurementthresholdDto)
      const logdata:LogDataDto ={administratorId:userId,action:"CREATE",entity:"ProcurementThreshold",newvalue:newrecord,oldvalue:oldrecord}
      await  this.auditService.create(logdata)
      return {status:"success",message:"Procurement threshold successfully  updated"}

   } catch (error) {
    const message = error.sqlMessage ? error.sqlMessage : error.message        
    throw new HttpException(message,HttpStatus.BAD_REQUEST)
   }
  }

  async remove(id: number,userId:number) {
    try {
       const oldrecord = await this.procurementthresholdRepository.findOne({where:{id:id}}) 
       await this.procurementthresholdRepository.delete(id)
       const logdata:LogDataDto ={administratorId:userId,action:"CREATE",entity:"ProcurementThreshold",newvalue:{},oldvalue:oldrecord}
       await  this.auditService.create(logdata)
       return {status:"success",message:"Procurement threshold successfully  Deleted"}

    } catch (error) {
      const message = error.sqlMessage ? error.sqlMessage : error.message        
      throw new HttpException(message,HttpStatus.BAD_REQUEST)
    }
  }
}
