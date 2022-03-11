import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelperService } from 'src/helper/helper.service';
import { Onlinepayment } from 'src/onlinepayment/entities/onlinepayment.entity';
import { Suspense } from 'src/suspense/entities/suspense.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InitiatePaymentDto } from './dto/initiate-payment.dto';
const {Paynow} = require('paynow')
@Injectable()
export class MobilepaymentService {
    constructor(@InjectRepository(Onlinepayment) private readonly onlinepaymentRepository:Repository<Onlinepayment>,private readonly helperService:HelperService){}

    async initiatePayment(initiatePaymentDto:InitiatePaymentDto,userId:number){
        
        const user = await User.findOne({where:{id:userId}})
        try {

            let paynow = new Paynow('1836','ec3cb4c0-345d-401d-8066-0123a9320090','https://portal.praz.org.zw/payment/Update','https://portal.praz.org.zw/payment/Update')
            const uuid = await this.helperService.generateUUId()
            let payment = paynow.createPayment(uuid,'benson.misi@gmail.com')
            payment.add('regfee',Number(initiatePaymentDto.amount))      
          return await  paynow.sendMobile(payment,initiatePaymentDto.phone,initiatePaymentDto.mode.toLowerCase()).then(async(response)=>{
           
                if(response && response.success){
                let pollUrl = response.pollUrl; 
                const el ={invoicenumber:uuid,accountId:user.accountId,pollurl:pollUrl,amount:initiatePaymentDto.amount,mode:initiatePaymentDto.mode,status:'PENDING',type:'SUPPLIER'}
                const record = await this.onlinepaymentRepository.save(el)
                return {status:"success",message:"Transaction Successfully Initiated",data:record}
        
            } else {
                return {status:'error',message:response.error,data:{}}
             
            }
            })
            
        } catch (error) {
            return {status:'error',message:error.message,data:{}}
        }
    


    }

    async checkPayment(id:number){
        const record = await this.onlinepaymentRepository.findOne(id)
        let paynow = new Paynow('1836','ec3cb4c0-345d-401d-8066-0123a9320090','https://portal.praz.org.zw/payment/Update','https://portal.praz.org.zw/payment/Update')
        let response = await paynow.pollTransaction(record.pollurl)
        let status = response.status
        if(status=='paid' || status=='awaiting delivery'){       
          const suspense = await Suspense.create({accountId:record.accountId,onlinepaymentId:record.id,source:record.mode,accountnumber:'10721064850020',currency:'ZWL',amount:record.amount,status:"PENDING"})
          suspense.save()
          record.status = 'PAID'
          await record.save()
          return {status:'success',message:"Wallet successfully topped up please  continue to settle invoice"}
        }else{
          throw new HttpException("Transaction was not successfully completed. with STATUS CODE:"+status,HttpStatus.BAD_REQUEST)
        }

    }
}
