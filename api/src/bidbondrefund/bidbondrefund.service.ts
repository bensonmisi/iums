import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bankdetail } from 'src/bankdetails/entities/bankdetail.entity';
import { MailService } from 'src/mail/mail.service';
import { Mailinglist } from 'src/mailinglist/entities/mailinglist.entity';
import { Tenderapplication } from 'src/tenderapplication/entities/tenderapplication.entity';
import { Repository } from 'typeorm';
import { Refundschedule } from './dto/create-refundschedule.dto';
import { UpdaterefundscheduleDto } from './dto/update-refundschedule.dto';
import { Bidbondrefund } from './entities/bidbondrefund.entity';

@Injectable()
export class BidbondrefundService {
    constructor(
       @InjectRepository(Bidbondrefund) private readonly bidbondrefundRepository:Repository<Bidbondrefund>,
        private readonly mailService:MailService
    ){}

 async notify(id:number){
     const maillist = await Mailinglist.findOne({where:{accountId:id}})

     if(maillist){
      this.mailService.bankdetailNotification(maillist.email)
      return {'status':'success','message':'Email notification successfully send'}
     }
     throw new HttpException("No Email found to send notification",HttpStatus.BAD_REQUEST)
 }

 async addSchedule(refundscheduleDto:Refundschedule){
     try {
        await this.bidbondrefundRepository.save(refundscheduleDto)  
        return {"status":"success","message":"Refund request successfully created"}      
     } catch (error) {
        throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST) 
     }
     
 }

 async getSchedulelist(id:number){
     const application = await Tenderapplication.findOne({where:{id:id}});
     if(application.type==='BIDBOND')
      {
     return await this.bidbondrefundRepository.find({where:{tendernumber:application.tendernumber},relations:['application','bankdetail']})
      }
      throw new HttpException("Tender fee type cannot be refunded",HttpStatus.BAD_REQUEST)
 }

 async approveScheduleItem(id:number,userId:number){
     try {
         const record = await this.bidbondrefundRepository.findOne({where:{id:id}})
         record.status ="APPROVED"
         record.approvedBy=userId
         await record.save()
       return {"status":'success','message':'Refund request successfully approved'}
     } catch (error) {
        throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)    
     }
 }

 async updateSchedule(id:number,updaterefundscheduleDto:UpdaterefundscheduleDto){
     try {
         await this.bidbondrefundRepository.update(id,updaterefundscheduleDto)

         const record = await this.bidbondrefundRepository.findOne({where:{id:id},relations:['application']})
          const mailinglist = await Mailinglist.findOne({where:{accountId:record.application.accountId}})
          if(mailinglist){
            const comment = "A bidbond for a tender with reference number "+record.application.tendernumber+"  has been successfully refunded. Please login to your portal to view transfer details"
             this.mailService.generalNotification(mailinglist.email,comment)
            return {'status':'success','message':'Email notification successfully send'}
           }
         return {"status":"success","message":"Refund request successfully Updated"}  
     } catch (error) {
        throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)    
     }
 }


    
}
