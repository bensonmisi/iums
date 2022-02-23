import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditService } from 'src/audit/audit.service';
import { LogDataDto } from 'src/audit/dto/logdata.dto';
import { Repository } from 'typeorm';
import { CreateUomDto } from './dto/create-uom.dto';
import { UpdateUomDto } from './dto/update-uom.dto';
import { Uom } from './entities/uom.entity';

@Injectable()
export class UomService {
  constructor(@InjectRepository(Uom) private readonly uomRepository:Repository<Uom>,private readonly auditService:AuditService){}
  async create(createUomDto: CreateUomDto,userId:number) {
    try {
      const record = await this.uomRepository.save(createUomDto)
       const logdata:LogDataDto ={administratorId:userId,action:"CREATE",entity:"Uom",newvalue:record,oldvalue:{}}
       await  this.auditService.create(logdata)
       return {"status":"success","message":"UOM Successfully Created"}
  } catch (error) {
    const message = error.sqlMessage  ? error.sqlMessage : error.message
     throw new HttpException(message,HttpStatus.BAD_REQUEST);
     
  }
}

  async findAll() {
    return await this.uomRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} uom`;
  }

  async update(id: number, updateUomDto: UpdateUomDto,userId:number) {
    try {
      const oldrecord = await this.uomRepository.findOne(id)
      oldrecord.name = updateUomDto.name
       const newrecord = await this.uomRepository.save(oldrecord)
       const logdata:LogDataDto ={administratorId:userId,action:"UPDATE",entity:"uom",newvalue:newrecord,oldvalue:oldrecord}
       await  this.auditService.create(logdata)
       return {"status":"success","message":"Uom Successfully updated"}
  } catch (error) {
    const message = error.sqlMessage  ? error.sqlMessage : error.message
     throw new HttpException(message,HttpStatus.BAD_REQUEST);
     
  }
  }

  async remove(id: number,userId:number) {
    try {
      const oldrecord = await this.uomRepository.findOne(id)
       await this.uomRepository.delete(id)
       const logdata:LogDataDto ={administratorId:userId,action:"DELETE",entity:"Uom",newvalue:{},oldvalue:oldrecord}
       await  this.auditService.create(logdata)
       return {"status":"success","message":"Uom Successfully Deleted"}
  } catch (error) {
    const message = error.sqlMessage  ? error.sqlMessage : error.message
     throw new HttpException(message,HttpStatus.BAD_REQUEST);
     
  }
  }
}
