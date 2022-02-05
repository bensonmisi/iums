import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditService } from 'src/audit/audit.service';
import { LogDataDto } from 'src/audit/dto/logdata.dto';
import { Bidbondperiod } from 'src/bidbondperiod/entities/bidbondperiod.entity';
import { Bidbondthreshold } from 'src/bidbondthreshold/entities/bidbondthreshold.entity';
import { HelperService } from 'src/helper/helper.service';
import { Tenderfeetype } from 'src/tenderfeetype/entities/tenderfeetype.entity';
import { Repository } from 'typeorm';
import { CreateNoticefeeDto } from './dto/create-noticefee.dto';
import { UpdateNoticefeeDto } from './dto/update-noticefee.dto';
import { Noticefee } from './entities/noticefee.entity';

@Injectable()
export class NoticefeeService {
  constructor(
    @InjectRepository(Noticefee) private readonly noticefeeRepository:Repository<Noticefee>,
    private readonly helperService:HelperService,
    private readonly auditService:AuditService
  ){}
  async create(createNoticefeeDto: CreateNoticefeeDto) {
    try { 
     const record = await this.noticefeeRepository.create(createNoticefeeDto)
      /**
       * check  fee type , if its  bid bond 
       **/
     await this.check_required_fee(createNoticefeeDto)
     await this.noticefeeRepository.save(record)
     const logdata:LogDataDto ={administratorId:createNoticefeeDto.creator,action:"CREATE",entity:"noticefee",newvalue:record,oldvalue:{}}
     await  this.auditService.create(logdata)
     return {"status":"success","message":"Notice fee Successfully Created"}
   } catch (error) {
     let message = error.sqlMessage ? error.sqlMessage : error.message
     throw new HttpException(message,HttpStatus.BAD_REQUEST)
   }
  }

  async findAll(id) {
    return await this.noticefeeRepository.find({where:{noticeId:id},relations:['currency','tenderfeetype','bidbondperiod']})
  }

  async check_required_fee(createNoticefeeDto:any){
    const feetype = await Tenderfeetype.findOne({where:{id:createNoticefeeDto.tenderfeetypeId}})
    if(feetype.required==='ESTABLISHMENT FEE'){

      const requiredfee = await Tenderfeetype.findOne({where:{name:'ESTABLISHMENT FEE'}})
      await Noticefee.delete({noticeId:createNoticefeeDto.noticeId,tenderfeetypeId:requiredfee.id})
      const bidperiod = await Bidbondperiod.findOne({where:{id:createNoticefeeDto.bidbondperiodId}})
      const threshold = await Bidbondthreshold.find({where:{validityperiod:bidperiod.days,currencyId:createNoticefeeDto.currencyId}})
      const requiredfeeamount = await this.helperService.calculate_establishment_fee(threshold,createNoticefeeDto.amount)
      const record ={noticeId:createNoticefeeDto.noticeId,tenderfeetypeId:requiredfee.id,amount:requiredfeeamount,currencyId:createNoticefeeDto.currencyId,creator:createNoticefeeDto.creator,level:createNoticefeeDto.level}
      const saverecord=  await Noticefee.create(record)
      await saverecord.save()
    }
  }

 

  async update(id: number, updateNoticefeeDto: UpdateNoticefeeDto,administratorId:number) {
    try {
      const oldrecord = await this.noticefeeRepository.findOne({where:{id:id}})
       await this.noticefeeRepository.update({id:id},updateNoticefeeDto)
       const newrecord =  await this.noticefeeRepository.findOne({where:{id:id}})
       await this.check_required_fee(updateNoticefeeDto)

       /**
        *  trigger  update event
        */
      const logdata:LogDataDto ={administratorId:administratorId,action:"UPDATE",entity:"noticefee",newvalue:newrecord,oldvalue:oldrecord}
      await  this.auditService.create(logdata)
      return {"status":"success","message":"Notice Fee Successfully Updated"}
    } catch (error) {
      let message = error.sqlMessage ? error.sqlMessage : error.message
      throw new HttpException(message,HttpStatus.BAD_REQUEST)
    }
  }
  

 async remove(id: number,administratorId:number) {
  try {
    const oldrecord = await this.noticefeeRepository.findOne({where:{id:id}})
     const newrecord =  {}
      await this.noticefeeRepository.delete(id)
   

     /**
      *  trigger  refund event
      */
    const logdata:LogDataDto ={administratorId:administratorId,action:"DELETE",entity:"noticefee",newvalue:newrecord,oldvalue:oldrecord}
    await  this.auditService.create(logdata)
    return {"status":"success","message":"Notice fee Successfully CANCELLED"}
  } catch (error) {
    let message = error.sqlMessage ? error.sqlMessage : error.message
    throw new HttpException(message,HttpStatus.BAD_REQUEST)
  }
  }
}
