import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditService } from 'src/audit/audit.service';
import { LogDataDto } from 'src/audit/dto/logdata.dto';
import { Repository } from 'typeorm';
import { CreateRegistrationoptionDto } from './dto/create-registrationoption.dto';
import { UpdateRegistrationoptionDto } from './dto/update-registrationoption.dto';
import { Registrationoption } from './entities/registrationoption.entity';

@Injectable()
export class RegistrationoptionService {
  constructor(@InjectRepository(Registrationoption) private readonly registrationoptionRepository:Repository<Registrationoption>,private readonly auditService:AuditService){}
  async create(createRegistrationoptionDto: CreateRegistrationoptionDto) {
    try {
      const record = await this.registrationoptionRepository.create(createRegistrationoptionDto)
      await this.registrationoptionRepository.save(record)
      const logdata:LogDataDto ={administratorId:createRegistrationoptionDto.creator,action:"CREATE",entity:"registrationoption",newvalue:record,oldvalue:{}}
      await  this.auditService.create(logdata)
      return {"status":"success","message":"Registration option Successfully Created"}
    } catch (error) {
      let message = error.sqlMessage ? error.sqlMessage : error.message
      throw new HttpException(message,HttpStatus.BAD_REQUEST)
    }
  }

  async findAll() {
    return await this.registrationoptionRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} registrationoption`;
  }

  async update(id: number, updateRegistrationoptionDto: UpdateRegistrationoptionDto,administratorId:number) {
    try {
      const oldrecord = await this.registrationoptionRepository.findOne({where:{id:id}})
       await this.registrationoptionRepository.update(id,updateRegistrationoptionDto)
       const newrecord = await this.registrationoptionRepository.findOne({where:{id:id}})
      const logdata:LogDataDto ={administratorId:administratorId,action:"UPDATE",entity:"registrationoption",newvalue:newrecord,oldvalue:oldrecord}
      await  this.auditService.create(logdata)
      return {"status":"success","message":"registration option Successfully Updated"}
    } catch (error) {
      let message = error.sqlMessage ? error.sqlMessage : error.message
      throw new HttpException(message,HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: number,administratorId:number) {
    try {
      const oldrecord = await this.registrationoptionRepository.findOne({where:{id:id}})
       const newrecord = {}
       await this.registrationoptionRepository.delete(id)
      const logdata:LogDataDto ={administratorId:administratorId,action:"DELETE",entity:"registrationoption",newvalue:newrecord,oldvalue:oldrecord}
      await  this.auditService.create(logdata)
      return {"status":"success","message":"Registration option grade Successfully Deleted"}
    } catch (error) {
      let message = error.sqlMessage ? error.sqlMessage : error.message
      throw new HttpException(message,HttpStatus.BAD_REQUEST)
    }
  }
}
