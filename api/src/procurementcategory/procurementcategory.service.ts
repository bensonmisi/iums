import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditService } from 'src/audit/audit.service';
import { LogDataDto } from 'src/audit/dto/logdata.dto';
import { Repository } from 'typeorm';
import { CreateProcurementcategoryDto } from './dto/create-procurementcategory.dto';
import { UpdateProcurementcategoryDto } from './dto/update-procurementcategory.dto';
import { Procurementcategory } from './entities/procurementcategory.entity';

@Injectable()
export class ProcurementcategoryService {
  constructor(@InjectRepository(Procurementcategory) private readonly procurementcategoryRepository:Repository<Procurementcategory>,private readonly auditService:AuditService){}
 async create(createProcurementcategoryDto: CreateProcurementcategoryDto,userId:number) {
  try {
    const record = await this.procurementcategoryRepository.save(createProcurementcategoryDto)
     const logdata:LogDataDto ={administratorId:userId,action:"CREATE",entity:"Procurementcategory",newvalue:record,oldvalue:{}}
     await  this.auditService.create(logdata)
     return {"status":"success","message":"Procurement Category Successfully Created"}
} catch (error) {
  const message = error.sqlMessage  ? error.sqlMessage : error.message
   throw new HttpException(message,HttpStatus.BAD_REQUEST);
   
}
  }

 async findAll() {
    return await this.procurementcategoryRepository.find();
  }


  async update(id: number, updateProcurementcategoryDto: UpdateProcurementcategoryDto,userId:number) {
    try {
      const oldrecord = await this.procurementcategoryRepository.findOne(id)
      oldrecord.name = updateProcurementcategoryDto.name
       const newrecord = await this.procurementcategoryRepository.save(oldrecord)
       const logdata:LogDataDto ={administratorId:userId,action:"UPDATE",entity:"Procurementcategory",newvalue:newrecord,oldvalue:oldrecord}
       await  this.auditService.create(logdata)
       return {"status":"success","message":"Procurementcategory Successfully updated"}
  } catch (error) {
    const message = error.sqlMessage  ? error.sqlMessage : error.message
     throw new HttpException(message,HttpStatus.BAD_REQUEST);
     
  }
  }

 async remove(id: number,userId:number) {
    try {
      const oldrecord = await this.procurementcategoryRepository.findOne(id)
       await this.procurementcategoryRepository.delete(id)
       const logdata:LogDataDto ={administratorId:userId,action:"DELETE",entity:"Procurementcategory",newvalue:{},oldvalue:oldrecord}
       await  this.auditService.create(logdata)
       return {"status":"success","message":"Procurement category Successfully Deleted"}
  } catch (error) {
    const message = error.sqlMessage  ? error.sqlMessage : error.message
     throw new HttpException(message,HttpStatus.BAD_REQUEST);
     
  }
  }
}
