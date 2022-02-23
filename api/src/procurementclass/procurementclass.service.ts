import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditService } from 'src/audit/audit.service';
import { LogDataDto } from 'src/audit/dto/logdata.dto';
import { Repository } from 'typeorm';
import { CreateProcurementclassDto } from './dto/create-procurementclass.dto';
import { UpdateProcurementclassDto } from './dto/update-procurementclass.dto';
import { Procurementclass } from './entities/procurementclass.entity';

@Injectable()
export class ProcurementclassService {
  constructor(@InjectRepository(Procurementclass) private readonly procurementclassRepository:Repository<Procurementclass>,private readonly auditService:AuditService){}
  async create(createProcurementclassDto: CreateProcurementclassDto,userId:number) {
    try {
      const record = await this.procurementclassRepository.create(createProcurementclassDto) 
       await this.procurementclassRepository.save(record)
       const logdata:LogDataDto ={administratorId:userId,action:"CREATE",entity:"Procurementclass",newvalue:record,oldvalue:{}}
       await  this.auditService.create(logdata)
       return {"status":"success","message":"Procurement class Successfully Created"}
  } catch (error) {
    const message = error.sqlMessage  ? error.sqlMessage : error.message
     throw new HttpException(message,HttpStatus.BAD_REQUEST);
     
  }
  }

 async findAll() {
    return await this.procurementclassRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} procurementclass`;
  }

  async update(id: number, updateProcurementclassDto: UpdateProcurementclassDto,userId:number) {
    try {
      const oldrecord = await this.procurementclassRepository.findOne(id)
      oldrecord.name = updateProcurementclassDto.name
       const newrecord = await this.procurementclassRepository.save(oldrecord)
       const logdata:LogDataDto ={administratorId:userId,action:"UPDATE",entity:"Procurementclass",newvalue:newrecord,oldvalue:oldrecord}
       await  this.auditService.create(logdata)
       return {"status":"success","message":"Procurement class Successfully updated"}
  } catch (error) {
    const message = error.sqlMessage  ? error.sqlMessage : error.message
     throw new HttpException(message,HttpStatus.BAD_REQUEST);
     
  }
  }

 async remove(id: number,userId:number) {
  try {
    const oldrecord = await this.procurementclassRepository.findOne(id)
     await this.procurementclassRepository.delete(id)
     const logdata:LogDataDto ={administratorId:userId,action:"DELETE",entity:"Procurementclass",newvalue:{},oldvalue:oldrecord}
     await  this.auditService.create(logdata)
     return {"status":"success","message":"Procurement class Successfully Deleted"}
} catch (error) {
  const message = error.sqlMessage  ? error.sqlMessage : error.message
   throw new HttpException(message,HttpStatus.BAD_REQUEST);
   
}
  }
}
