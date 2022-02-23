import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditService } from 'src/audit/audit.service';
import { LogDataDto } from 'src/audit/dto/logdata.dto';
import { Repository } from 'typeorm';
import { CreateProcurementClassValidtyDto } from './dto/create-procurement-class-validty.dto';
import { UpdateProcurementClassValidtyDto } from './dto/update-procurement-class-validty.dto';
import { ProcurementClassValidty } from './entities/procurement-class-validty.entity';

@Injectable()
export class ProcurementClassValidtyService {
  constructor(
    @InjectRepository(ProcurementClassValidty) private readonly procurementclassvalidityRepository:Repository<ProcurementClassValidty>,
     private readonly auditService:AuditService
    ){}
  async create(createProcurementClassValidtyDto: CreateProcurementClassValidtyDto,userId:number) {
    try {
      const period = await this.procurementclassvalidityRepository.save(createProcurementClassValidtyDto)
       await this.procurementclassvalidityRepository.save(period)
       const logdata:LogDataDto ={administratorId:userId,action:"CREATE",entity:"ProcurementClassValidity",newvalue:period,oldvalue:{}}
       await  this.auditService.create(logdata)      
       return{status:'success',message:'Validty Successfully Created'}
  } catch (error) {
    const message = error.sqlMessage  ? error.sqlMessage : error.message
     throw new HttpException(message,HttpStatus.BAD_REQUEST);
     
  }
  
  }

  async findAll() {
    return await this.procurementclassvalidityRepository.find();
  }



}
