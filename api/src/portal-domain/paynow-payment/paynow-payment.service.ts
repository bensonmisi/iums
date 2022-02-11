import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelperService } from 'src/helper/helper.service';
import { Onlinepayment } from 'src/onlinepayment/entities/onlinepayment.entity';
import { Suspense } from 'src/suspense/entities/suspense.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePaynowPaymentDto } from './dto/create-paynow-payment.dto';
import { UpdatePaynowPaymentDto } from './dto/update-paynow-payment.dto';
const {Paynow} = require('paynow')

@Injectable()
export class PaynowPaymentService {
  constructor(@InjectRepository(Onlinepayment) private readonly onlinepaymentRepository:Repository<Onlinepayment>,private readonly helperService:HelperService){}

  async initiate(initiateDto:CreatePaynowPaymentDto,userId:number){
    const user = await User.findOne({where:{id:userId}})
    const uuid = await this.helperService.generateUUId()
    let paynow = new Paynow('1836','ec3cb4c0-345d-401d-8066-0123a9320090','http://localhost:3000/supplier/confirm/'+uuid,'http://localhost:3000/supplier/confirm/'+uuid)
    let payment = paynow.createPayment(uuid)
    payment.add('regfee',initiateDto.amount)
    return await paynow.send(payment).then(async(response)=>{
      if(response.success){
      let pollUrl = response.pollUrl; 
      const el ={invoicenumber:uuid,accountId:user.accountId,pollurl:pollUrl,amount:initiateDto.amount.toString(),mode:'PAYNOW',status:'PENDING',type:'SUPPLIER'}
      const record = await this.onlinepaymentRepository.save(el)
      let link = response.redirectUrl;
      return {status:"success",message:"Transaction Successfully Initiated",redirectlink:link}

  } else {
      return {status:'error',message:response.error,data:{}}
   
  }
  })
      
  }
  async checkPayment(uuid:string){
    const record = await this.onlinepaymentRepository.findOne({where:{invoicenumber:uuid}})
    let paynow = new Paynow('1836','ec3cb4c0-345d-401d-8066-0123a9320090','http://localhost:3000/supplier/confirm/'+uuid,'http://localhost:3000/supplier/confirm/'+uuid)
    let response = await paynow.pollTransaction(record.pollurl)
    let status = response.status
    if(status=='paid' || status=='awaiting delivery'){       
      const suspense = await Suspense.create({accountId:record.accountId,onlinepaymentId:record.id,source:record.mode,accountnumber:'10721064850108',currency:'USD',amount:record.amount,status:"PENDING"})
      suspense.save()
      record.status = 'PAID'
      await record.save()
      return {status:'success',message:"Wallet successfully topped up please  continue to settle invoice"}
    }else{
      record.status = status
      await record.save()
      throw new HttpException("Transaction was not successfully completed. with STATUS CODE:"+status,HttpStatus.BAD_REQUEST)
    }

}

async getAll(userId:number){
  const user = await User.findOne({where:{id:userId}})
  return await this.onlinepaymentRepository.find({where:{accountId:user.accountId}})
}

}
