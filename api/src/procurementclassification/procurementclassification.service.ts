import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditService } from 'src/audit/audit.service';
import { LogDataDto } from 'src/audit/dto/logdata.dto';
import { Repository } from 'typeorm';
import { CreateProcurementclassificationDto } from './dto/create-procurementclassification.dto';
import { UpdateProcurementclassificationDto } from './dto/update-procurementclassification.dto';
import { Procurementclassification } from './entities/procurementclassification.entity';

@Injectable()
export class ProcurementclassificationService {
  constructor(@InjectRepository(Procurementclassification) private readonly procurementclassificationRepository:Repository<Procurementclassification>,private readonly auditService:AuditService){}
  async create(createProcurementclassificationDto: CreateProcurementclassificationDto,userId:number) {
    try {
      const record = await this.procurementclassificationRepository.create(createProcurementclassificationDto) 
       await this.procurementclassificationRepository.save(record)
       const logdata:LogDataDto ={administratorId:userId,action:"CREATE",entity:"Procurementclassification",newvalue:record,oldvalue:{}}
       await  this.auditService.create(logdata)
       return {"status":"success","message":"Procurement class Successfully Created"}
  } catch (error) {
    const message = error.sqlMessage  ? error.sqlMessage : error.message
     throw new HttpException(message,HttpStatus.BAD_REQUEST);
     
  }
  }

  async findAll() {
    return await this.procurementclassificationRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} procurementclassification`;
  }

  async update(id: number, updateProcurementclassificationDto: UpdateProcurementclassificationDto,userId:number) {
    try {
      const oldrecord = await this.procurementclassificationRepository.findOne(id)
      oldrecord.name = updateProcurementclassificationDto.name
       const newrecord = await this.procurementclassificationRepository.save(oldrecord)
       const logdata:LogDataDto ={administratorId:userId,action:"UPDATE",entity:"Procurementclassification",newvalue:newrecord,oldvalue:oldrecord}
       await  this.auditService.create(logdata)
       return {"status":"success","message":"Procurement classification Successfully updated"}
  } catch (error) {
    const message = error.sqlMessage  ? error.sqlMessage : error.message
     throw new HttpException(message,HttpStatus.BAD_REQUEST);
     
  }
  }

  async remove(id: number,userId:number) {
    try {
      const oldrecord = await this.procurementclassificationRepository.findOne(id)
       await this.procurementclassificationRepository.delete(id)
       const logdata:LogDataDto ={administratorId:userId,action:"DELETE",entity:"Procurementclassification",newvalue:{},oldvalue:oldrecord}
       await  this.auditService.create(logdata)
       return {"status":"success","message":"Procurement classification Successfully Deleted"}
  } catch (error) {
    const message = error.sqlMessage  ? error.sqlMessage : error.message
     throw new HttpException(message,HttpStatus.BAD_REQUEST);
     
  }
  }
}
