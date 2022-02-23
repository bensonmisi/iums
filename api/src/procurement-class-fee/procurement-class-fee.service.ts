import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditService } from 'src/audit/audit.service';
import { LogDataDto } from 'src/audit/dto/logdata.dto';
import { Repository } from 'typeorm';
import { CreateProcurementClassFeeDto } from './dto/create-procurement-class-fee.dto';
import { UpdateProcurementClassFeeDto } from './dto/update-procurement-class-fee.dto';
import { ProcurementClassFee } from './entities/procurement-class-fee.entity';

@Injectable()
export class ProcurementClassFeeService {
  constructor(
    @InjectRepository(ProcurementClassFee) private readonly procurementclassfeeRepository:Repository<ProcurementClassFee>,
    private readonly auditService:AuditService
  ){}
  async create(createProcurementClassFeeDto: CreateProcurementClassFeeDto,userId:number) {
    try {
      const fee = await this.procurementclassfeeRepository.save(createProcurementClassFeeDto)
       await this.procurementclassfeeRepository.save(fee)
       const logdata:LogDataDto ={administratorId:userId,action:"CREATE",entity:"ProcurementClassFee",newvalue:fee,oldvalue:{}}
       await  this.auditService.create(logdata)      
       return{status:'success',message:'Feee Successfully Created'}
  } catch (error) {
    const message = error.sqlMessage  ? error.sqlMessage : error.message
     throw new HttpException(message,HttpStatus.BAD_REQUEST);
     
  }
  }

 async findAll() {
    return await this.procurementclassfeeRepository.find({relations:['currency','procurementclass']})
  }


  async update(id: number, updateProcurementClassFeeDto: UpdateProcurementClassFeeDto,userId:number) {
    try {
     
       const oldrecord = await this.procurementclassfeeRepository.findOne(id)
       const newrecord = await this.procurementclassfeeRepository.update(id,updateProcurementClassFeeDto)
       const logdata:LogDataDto ={administratorId:userId,action:"CREATE",entity:"ProcurementClassFee",newvalue:newrecord,oldvalue:oldrecord}
       await  this.auditService.create(logdata)      
       return{status:'success',message:'Feee Successfully Updated'}
  } catch (error) {
    const message = error.sqlMessage  ? error.sqlMessage : error.message
     throw new HttpException(message,HttpStatus.BAD_REQUEST);
     
  }
  }

 async remove(id: number,userId:number) {
    try {
     
      const oldrecord = await this.procurementclassfeeRepository.findOne(id)
      await this.procurementclassfeeRepository.softDelete(id)
      const logdata:LogDataDto ={administratorId:userId,action:"DELETE",entity:"ProcurementClassFee",newvalue:{},oldvalue:oldrecord}
      await  this.auditService.create(logdata)      
      return{status:'success',message:'Feee Successfully Deleted'}
 } catch (error) {
   const message = error.sqlMessage  ? error.sqlMessage : error.message
    throw new HttpException(message,HttpStatus.BAD_REQUEST);
    
 }
  }
}
