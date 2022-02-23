import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditService } from 'src/audit/audit.service';
import { LogDataDto } from 'src/audit/dto/logdata.dto';
import { EntityUser } from 'src/entity-domain/entity-user/entities/entity-user.entity';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { CreateProcurementEntityUserDto } from './dto/create-procuremententity-user.dto';
import { UpdateProcurementEntityUserDto } from './dto/update-procuremententity-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class ProcuremententityUserService {
    constructor(@InjectRepository(EntityUser) private readonly entityuserRepository:Repository<EntityUser>,
    private readonly auditService:AuditService,
    private readonly mailService:MailService
    ){}

    async findAll(id:number){
        return await this.entityuserRepository.find({where:{procuremententityId:id},relations:['role']})
    }

    async create(createProcurementEntityUserDto:CreateProcurementEntityUserDto,userId:number){
        try {
            const random = await this.getRandomPassword(999999999)
            const password = "temp"+random
            createProcurementEntityUserDto.password = password
            const record = await this.entityuserRepository.create(createProcurementEntityUserDto) 
             await this.entityuserRepository.save(record)
             this.mailService.SendEntityUserPassword(record,password,createProcurementEntityUserDto.email)
             const logdata:LogDataDto ={administratorId:userId,action:"CREATE",entity:"Entityuser",newvalue:record,oldvalue:{}}
             await  this.auditService.create(logdata)
             return {"status":"success","message":"User Successfully Created"}
        } catch (error) {
          const message = error.sqlMessage  ? error.sqlMessage : error.message
           throw new HttpException(message,HttpStatus.BAD_REQUEST);
           
        }
    }

    async update(id:number,updateProcurementEntityUserDto:UpdateProcurementEntityUserDto,userId:number){
        try {
            const random = await this.getRandomPassword(999999999)
            const password = "temp123456789"///+random
            const hashPassword = await bcrypt.hash(password,10)
            updateProcurementEntityUserDto.password = hashPassword
            const oldrecord = await this.entityuserRepository.findOne({where:{id:id}})
            oldrecord.name = updateProcurementEntityUserDto.name
            oldrecord.surname = updateProcurementEntityUserDto.surname
            oldrecord.email = updateProcurementEntityUserDto.email
            oldrecord.jobtitle = updateProcurementEntityUserDto.jobtitle
            oldrecord.title = updateProcurementEntityUserDto.title
            oldrecord.phonenumber = updateProcurementEntityUserDto.phonenumber
            oldrecord.password = updateProcurementEntityUserDto.password

            const newrecord = await oldrecord.save()
             this.mailService.SendEntityUserPassword(newrecord,password,updateProcurementEntityUserDto.email)
             const logdata:LogDataDto ={administratorId:userId,action:"UPDATE",entity:"Entityuser",newvalue:newrecord,oldvalue:oldrecord}
             await  this.auditService.create(logdata)
             return {"status":"success","message":"User Successfully Updated"}
        } catch (error) {
          const message = error.sqlMessage  ? error.sqlMessage : error.message
           throw new HttpException(message,HttpStatus.BAD_REQUEST);
           
        }
    }

    async remove(id:number,userId:number){
        try {
            const oldrecord = await this.entityuserRepository.findOne({where:{id:id}})
            await this.entityuserRepository.delete(id)
             const logdata:LogDataDto ={administratorId:userId,action:"DELETE",entity:"Entityuser",newvalue:{},oldvalue:oldrecord}
             await  this.auditService.create(logdata)
             return {"status":"success","message":"User Successfully Updated"}
        } catch (error) {
          const message = error.sqlMessage  ? error.sqlMessage : error.message
           throw new HttpException(message,HttpStatus.BAD_REQUEST);
           
        } 
    }

    async getRandomPassword(max) {
        return await Math.floor(Math.random() * Math.floor(max));
      }

}
