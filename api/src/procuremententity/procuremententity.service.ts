import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditController } from 'src/audit/audit.controller';
import { AuditService } from 'src/audit/audit.service';
import { LogDataDto } from 'src/audit/dto/logdata.dto';
import { HelperService } from 'src/helper/helper.service';
import { Repository } from 'typeorm';
import { CreateProcuremententityDto } from './dto/create-procuremententity.dto';
import { UpdateProcuremententityDto } from './dto/update-procuremententity.dto';
import { Procuremententity } from './entities/procuremententity.entity';

@Injectable()
export class ProcuremententityService {

  constructor(@InjectRepository(Procuremententity) 
             private readonly procuremententityRepository:Repository<Procuremententity>,
             private helperService:HelperService,
             private readonly auditService:AuditService
             ){}
  async create(createProcuremententityDto: CreateProcuremententityDto):Promise<any> {
      try {
         const {name} = createProcuremententityDto
         const data = await this.procuremententityRepository.find()
         const findneedle = await this.helperService.checkEntityName(data,name)
         if(findneedle){

          const record = await this.procuremententityRepository.create(createProcuremententityDto)
           await record.save()
           const regnumber =  await this.helperService.generateEntityNumber(record.id)
           record.regnumber = regnumber
           await record.save()
          const logdata:LogDataDto ={administratorId:createProcuremententityDto.creator,action:"CREATE",entity:"ProcurementEntitu",newvalue:record,oldvalue:{}}
          await  this.auditService.create(logdata)
          return {"status":"success","message":"Procurement entity Successfully Created"}

         }else{
           throw new HttpException("Procurement Entity Name Already Saved",HttpStatus.BAD_REQUEST)
         }

         

      } catch (error) {
        const message =error.sqlMessage ? error.sqlMessage : error.message
       throw new HttpException(message,HttpStatus.BAD_REQUEST)  
      }
  }

  async findAll() {
    return  await this.procuremententityRepository.find()
  }

  async update(id: number, updateProcuremententityDto: UpdateProcuremententityDto,userId:number) {
    try {
    const oldrecord = await this.procuremententityRepository.findOne(id)
   if(oldrecord.regnumber==null){
      const regnumber = await this.helperService.generateEntityNumber(oldrecord.id)
      oldrecord.regnumber = regnumber
   }
   oldrecord.district = updateProcuremententityDto.district
   oldrecord.city = updateProcuremententityDto.city
   oldrecord.sector = updateProcuremententityDto.slug
   oldrecord.province = updateProcuremententityDto.province
   oldrecord.sector = updateProcuremententityDto.sector
   const newrecord = await oldrecord.save()
     const logdata:LogDataDto ={administratorId:userId,action:"UPDATE",entity:"ProcurementEntitu",newvalue:newrecord,oldvalue:oldrecord}
     await  this.auditService.create(logdata)
     return {"status":"success","message":"Procurement entity Successfully Updated"}


  }
  catch(error){
    const message =error.sqlMessage ? error.sqlMessage : error.message
    throw new HttpException(message,HttpStatus.BAD_REQUEST)  
  }
  }

  async remove(id: number,userId:number) {
    try {
      const oldrecord = await this.procuremententityRepository.findOne(id)
          const logdata:LogDataDto ={administratorId:userId,action:"DELETE",entity:"ProcurementEntitu",newvalue:{},oldvalue:oldrecord}
         await this.procuremententityRepository.delete({id:id})
          await  this.auditService.create(logdata)
          return {"status":"success","message":"Procurement entity Successfully Deleted"}

    }catch(error){
      const message =error.sqlMessage ? error.sqlMessage : error.message
      throw new HttpException(message,HttpStatus.BAD_REQUEST) 
    }
  }
}
