import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bidbondperiod } from 'src/bidbondperiod/entities/bidbondperiod.entity';
import { Bidbondthreshold } from 'src/bidbondthreshold/entities/bidbondthreshold.entity';
import { Category } from 'src/categories/entities/category.entity';
import { HelperService } from 'src/helper/helper.service';
import { Notice } from 'src/notice/entities/notice.entity';
import { Noticecategory } from 'src/noticecategory/entities/noticecategory.entity';
import { Noticefee } from 'src/noticefee/entities/noticefee.entity';
import { Noticeproduct } from 'src/noticeproduct/entities/noticeproduct.entity';
import { Tenderfeetype } from 'src/tenderfeetype/entities/tenderfeetype.entity';
import { In, Repository } from 'typeorm';
import { EntityUser } from '../entity-user/entities/entity-user.entity';
import { CreateEntityNoticeDto } from './dto/create-entitynotice.dto';
import { GeneralHelperService } from '../EntityHelperService/generalHelperService';
import { Procurementthreshold } from 'src/procurementthreshold/entities/procurementthreshold.entity';
import { UpdateEntityNoticeDto } from './dto/update-entitynotice.dto';
import { MailService } from 'src/mail/mail.service';


@Injectable()
export class EntitynoticeService {
    constructor(
        @InjectRepository(Notice) private readonly noticeRepository:Repository<Notice>,
        private readonly helperService:HelperService,
        //private readonly mailingService:MailService
        ){}

    async findAll(userId:number){
        const user = await EntityUser.findOne({where:{id:userId}})
        return await this.noticeRepository.find({where:{procuremententityId:user.procuremententityId},order:{id:'DESC'},relations:['noticecategory','section','noticeproduct','noticetype']})

    }

    async findOne(id:number,userId:number){
      const user = await EntityUser.findOne({where:{id:userId}})
      return await this.noticeRepository.findOne({where:{procuremententityId:user.procuremententityId,id:id},order:{id:'DESC'},relations:['noticecategory','section','noticeproduct','noticetype','noticefee']})

    }
    async getDowload(id:number){
      return await this.noticeRepository.findOne({where:{id:id},order:{id:'DESC'}})

    }

    async publish(id:number,userId:number){
      const notice = await this.findOne(id,userId)
      notice.status ="PUBLISHED"
      await notice.save()
      return {status:"success", message:"Notice successfully published"}
    }

    async update(id:number,updateEntityNoticeDto:UpdateEntityNoticeDto,userId:number){
      const helper = new GeneralHelperService()
      const notice = await this.findOne(id,userId)
      const user = await EntityUser.findOne({where:{id:userId}})
      const procurement_class = await helper.getProcurementClass(user.procuremententityId)
      notice.bidvalue = updateEntityNoticeDto.bidvalue
      notice.title = updateEntityNoticeDto.title
      notice.closingDate = updateEntityNoticeDto.closingDate
      notice.closingTime = updateEntityNoticeDto.closingTime
      notice.filename = updateEntityNoticeDto.filename
      await notice.save()
      await Noticefee.delete({noticeId:notice.id})
      if(updateEntityNoticeDto.bidbond ){
        const feetype = await Tenderfeetype.findOne({where:{name:'BIDBOND'}});
        const fee ={noticeId:notice.id,tenderfeetypeId:feetype.id,amount:updateEntityNoticeDto.bidbond,currencyId:updateEntityNoticeDto.currencyId,bidbondperiodId:updateEntityNoticeDto.bidbondperiodId,creator:userId,level:'USER'}
        const savefe  = await Noticefee.create(fee)
        await savefe.save()
        
        await this.check_required_fee(updateEntityNoticeDto,notice.id,feetype,userId)

   
      }

      if(updateEntityNoticeDto.noticetypeId==7){
        await this.check_spoc(updateEntityNoticeDto,procurement_class.id,notice.id,userId)
     }
   
    return {status:"success",message:"Notice Information Successfully Updated. Please add  Product/Service"}


    }

    async create(createNoticeDto: CreateEntityNoticeDto,userId:number) {
        const helper = new GeneralHelperService()
        
        try {
          const user = await EntityUser.findOne({where:{id:userId}})
           const procurement_class = await helper.getProcurementClass(user.procuremententityId)
           if(!procurement_class){
             throw new HttpException("Your entity needs a Procurement Class  in order to create a notice on our system",HttpStatus.BAD_REQUEST)
           }
          const uuid = await this.helperService.generateUUId()
          const tendernumber = await this.helperService.get_tender_number(user.procuremententityId,createNoticeDto.reach)
          const today = new Date()
          const year = today.getFullYear();
          createNoticeDto.year = year
          createNoticeDto.procuremententityId  = user.procuremententityId
          createNoticeDto.tendernumber= tendernumber
          createNoticeDto.tendernumber2 = tendernumber
          createNoticeDto.status = "PENDING"
          createNoticeDto.uuid = uuid
         const record = await this.noticeRepository.create(createNoticeDto)
         await this.noticeRepository.save(record)



          /**
           * save noteice fees
           */
        

          if(createNoticeDto.bidbond){

            const feetype = await Tenderfeetype.findOne({where:{name:'BIDBOND'}});
            const fee ={noticeId:record.id,tenderfeetypeId:feetype.id,amount:createNoticeDto.bidbond,currencyId:createNoticeDto.currencyId,bidbondperiodId:createNoticeDto.bidbondperiodId,creator:userId,level:'USER'}
            const savefe  = await Noticefee.create(fee)
            await savefe.save()
            await this.check_required_fee(createNoticeDto,record.id,feetype,userId)
          }

          /**
            check if  bid value  and pe threshold
          */
          if(createNoticeDto.noticetypeId==7){
             await this.check_spoc(createNoticeDto,procurement_class.id,record.id,userId)
          }
        
         return {status:"success",message:"Notice Information Successfully Created. Please add  Product/Service",notice:record}
       } catch (error) {
         let message = error.sqlMessage ? error.sqlMessage : error.message
         throw new HttpException(message,HttpStatus.BAD_REQUEST)
       } 
       }

       async cancelNotice(uuid:string,userId:number){
         const helperService = new GeneralHelperService()
          const user = await EntityUser.findOne({where:{id:userId}})
          const notice = await Notice.findOne({where:{uuid:uuid}})
          if(notice.procuremententityId !== notice.procuremententityId){
            throw new HttpException("Unauthorised access",HttpStatus.BAD_REQUEST)
          }
          notice.status = "CANCELLED"
          await notice.save()
         
           await helperService.addTorefundTray(notice.id,userId)

        //   const mailling = await Mailinglist.findOne({where:{accountId:account.id}})
        ///   const message = "This serves to inform you that your company was successfully award a contract  to supplier "+noticeproduct.quantity+" "+noticeproduct.description+" to "+noticeproduct.notice.procuremententity.name
        ///   this.mailingService.generalNotification(mailling.email,message)
       
    
       }

       async confirm(id:number,userId:number){
         const user = await EntityUser.findOne({where:{id:userId}})
         if(!user){
           throw new HttpException("unauthenticated",HttpStatus.BAD_REQUEST)
         }
         const notice = await this.noticeRepository.findOne({where:{id:id,procuremententityId:user.procuremententityId}})
         if(!notice){
           throw new HttpException("Notice not found",HttpStatus.BAD_REQUEST)
         }

         notice.status ="AWAITING"

         await notice.save()
         return {status:"success",message:"Notice successfully confirmed now awaits Publication"}
       }
       
       
       

       async check_required_fee(createNoticefeeDto:any,noticeId:number,feetype:Tenderfeetype,userId:number){
         
        if(feetype.required==='ESTABLISHMENT FEE'){
    
          const requiredfee = await Tenderfeetype.findOne({where:{name:'ESTABLISHMENT FEE'}})
          await Noticefee.delete({noticeId:noticeId,tenderfeetypeId:requiredfee.id})
          const bidperiod = await Bidbondperiod.findOne({where:{id:createNoticefeeDto.bidbondperiodId}})
          const threshold = await Bidbondthreshold.find({where:{validityperiod:bidperiod.days,currencyId:createNoticefeeDto.currencyId}})
          const requiredfeeamount = await this.helperService.calculate_establishment_fee(threshold,createNoticefeeDto.bidbond)
          if(+requiredfeeamount>0)
          {
          const record ={noticeId:noticeId,tenderfeetypeId:requiredfee.id,amount:requiredfeeamount,currencyId:createNoticefeeDto.currencyId,creator:userId,level:'USER'}
          const saverecord=  await Noticefee.create(record)
          await saverecord.save()
          }
        }
      }

    async check_spoc(createNoticeDto:any,procurement_classId:number,noticeId:number,userId:number){

      
       const threshold = await Procurementthreshold.findOne({where:{procurementclassId:procurement_classId,reach:createNoticeDto.reach,currencyId:createNoticeDto.currencyId,sectionId:createNoticeDto.sectionId}})
        if(!threshold){
          throw new HttpException("Threshold settings not set please contact our System Administrator",HttpStatus.BAD_REQUEST)
        }
      
        if(createNoticeDto.bidvalue >= +threshold.value)
        {
        const spoc = await Tenderfeetype.findOne({name:'SPOC'})
        const record ={noticeId:noticeId,tenderfeetypeId:spoc.id,amount:threshold.fee,currencyId:createNoticeDto.currencyId,creator:userId,level:'USER'}
          const fee = await Noticefee.create(record)
          await fee.save()
        }


    }
}
