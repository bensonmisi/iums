import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditService } from 'src/audit/audit.service';
import { LogDataDto } from 'src/audit/dto/logdata.dto';
import { Authorityinvoice } from 'src/authorityinvoice/entities/authorityinvoice.entity';
import { Annualplan } from 'src/entity-domain/annualplan/entities/annualplan.entity';
import { Authorityapplication } from 'src/entity-domain/authorityapplication/entities/authorityapplication.entity';
import { EntityUser } from 'src/entity-domain/entity-user/entities/entity-user.entity';
import { Evaluationcommitte } from 'src/entity-domain/evaluationcommitte/entities/evaluationcommitte.entity';
import { Organogram } from 'src/entity-domain/organogram/entities/organogram.entity';
import { Procurementmanagementunit } from 'src/entity-domain/procurementmanagementunit/entities/procurementmanagementunit.entity';
import { Uploadplan } from 'src/entity-domain/uploadplan/entities/uploadplan.entity';
import { HelperService } from 'src/helper/helper.service';
import { MailService } from 'src/mail/mail.service';
import { ProcurementClassFee } from 'src/procurement-class-fee/entities/procurement-class-fee.entity';
import { ProcurementClassValidty } from 'src/procurement-class-validty/entities/procurement-class-validty.entity';

@Injectable()
export class ProcurementapplicationService {
 constructor(
     private readonly auditService:AuditService,
     private readonly helperService:HelperService,
     private mailService:MailService
     ){}
    async getData(){
        const todat = new Date()
        const currentyear = todat.getFullYear()
     return await Authorityapplication.find({where:{year:currentyear},relations:['procuremententity','comments']})
    }

    async getRecord(id:number,userId:number){
        const record = await Authorityapplication.findOne({where:{id:id},relations:['comments']})
        
        const comments = record.comments

        const evaluationcommitte = await Evaluationcommitte.find({where:{procuremententityId:record.procuremententityId}})

        const pmu = await Procurementmanagementunit.find({where:{procuremententityId:record.procuremententityId}})

        const uploadplans = await Uploadplan.find({where:{authorityapplicationId:id}})
        const organgrams  = await Organogram.find({where:{procuremententityId:record.procuremententityId}})

        return {evaluationcommitte:evaluationcommitte,pmu:pmu,uploadplans:uploadplans,organograms:organgrams,comments:comments}
    }


    async getCv(id:number){
        return await Procurementmanagementunit.findOne({where:{id:id}})
    }

    async downloadOrganogram(id){
        return await Organogram.findOne({where:{id:id}})
    }

    async dowloadplan(id){
        return await Uploadplan.findOne({where:{id:id}}) 
    }

    async assignclass(id:number,formdata:any,userId:number){
    
      try {
        const oldrecord = await Authorityapplication.findOne({where:{id:id}})
         oldrecord.status ="AWAITING_PAYMENT"
         oldrecord.procurementclassId=formdata.procurementclassId
         const newrecord = await oldrecord.save()
         const logdata:LogDataDto ={administratorId:userId,action:"APPROVED",entity:"Authorityapplication",newvalue:newrecord,oldvalue:oldrecord}
         await  this.auditService.create(logdata)
         console.log(formdata)
         await this.generateinvoice(oldrecord,formdata.procurementclassId)
         return {"status":"success","message":"Procurement class Successfully Assigned"}
    } catch (error) {
      const message = error.sqlMessage  ? error.sqlMessage : error.message
       throw new HttpException(message,HttpStatus.BAD_REQUEST);
       
    }
    

    }

    async generateinvoice(authorityapplication:Authorityapplication,id:number){
      const invoicenumber = await this.helperService.generate_authority_invoice_number(authorityapplication.procuremententityId)
       const cost = await ProcurementClassFee.findOne({where:{id:id},relations:['procurementclass']}) 
       console.log(id)
       const authorityperiod = await ProcurementClassValidty.findOne({order:{id:"DESC"}})
       const today = new Date()
       const currentyear = today.getFullYear()
       const expire_year = Number(currentyear)+Number(authorityperiod.period)-1
       const authority = new Authorityinvoice()
        authority.authorityapplicationId = authorityapplication.id
        authority.invoicenumber = invoicenumber
        authority.procuremententityId = authorityapplication.procuremententityId
        authority.cost = cost.cost
        authority.currencyId = cost.currencyId
        authority.expire_year = expire_year
        await authority.save()

        const users = await EntityUser.find({where:{procuremententityId:authorityapplication.procuremententityId}})
        const message ="Your application to conduct procurement has been processed. Your entity has been awarded class: "+cost.procurementclass.name+"   which  will expire "+expire_year+"  an invoice of ZWL "+cost.cost+" has been generated please login to your portal account and upload "
       // this.mailService.SendApplicationUpdate(users,message)
    }
}
