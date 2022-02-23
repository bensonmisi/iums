import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Authorityapplication } from '../authorityapplication/entities/authorityapplication.entity';
import { EntityUser } from '../entity-user/entities/entity-user.entity';
import { CreateUploadplanDto } from './dto/create-uploadplan.dto';
import { UpdateUploadplanDto } from './dto/update-uploadplan.dto';
import { GeneralHelperService } from '../EntityHelperService/generalHelperService';
import { InjectRepository } from '@nestjs/typeorm';
import { Uploadplan } from './entities/uploadplan.entity';

@Injectable()
export class UploadplanService {
  constructor(@InjectRepository(Uploadplan) private readonly uploadplanRepository:Repository<Uploadplan>){}
  async getUpload(userId:number){
    const user = await EntityUser.findOne({where:{id:userId}})
    const today = new Date()
    const currentyear = today.getFullYear()
    const helperservice = new GeneralHelperService()
     let application = await helperservice.getProcurementClass(user.procuremententityId)
     if(!application)
     { 
     const record = await Authorityapplication.create({procuremententityId:user.procuremententityId,year:currentyear,entityuserId:userId})
     await record.save()
     application = await helperservice.getProcurementClass(user.procuremententityId)
    }
    
    
    return application
  }

  async upload(createUploadplanDto:CreateUploadplanDto,userId:number){
    const user = await EntityUser.findOne({where:{id:userId}})
    if(!user){
      throw new HttpException("unauthenticated",HttpStatus.BAD_REQUEST)
    }
    createUploadplanDto.entityuserId=userId
    try {
      await this.uploadplanRepository.save(createUploadplanDto)
      return {status:"success",message:"Procurement Plan successfully uploaded"}
    } catch (error) {
      const message = error.sqlMessage ? error.sqlMessage : error.message
      throw new HttpException(message,HttpStatus.BAD_REQUEST)
    }    

  }

  async remove(id:number,userId:number){
    const user = await EntityUser.findOne({where:{id:userId}})
    if(!user){
      throw new HttpException("unauthenticated",HttpStatus.BAD_REQUEST)
    }
    const record = await this.uploadplanRepository.findOne({where:{id:id},relations:['authorityapplication']})
    if(record){
      if(record.authorityapplication.procuremententityId == user.procuremententityId){
         if(record.status =='PENDING'){
            await this.uploadplanRepository.delete(id)
            return {status:"success",message:'Plan successfully deleted'}
         }
         throw new HttpException('Document already approved cannot be deleted',HttpStatus.BAD_REQUEST)
      }
      throw new HttpException('Unauthorized',HttpStatus.BAD_REQUEST)
    }
    throw new HttpException('Record not found',HttpStatus.BAD_REQUEST)

  }

 
}
