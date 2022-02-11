import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Banktransaction } from 'src/banktransaction/entities/banktransaction.entity';
import { Rtg } from 'src/rtgs/entities/rtg.entity';
import { Supplierinvoice } from 'src/supplierinvoice/entities/supplierinvoice.entity';
import { Suspense } from 'src/suspense/entities/suspense.entity';
import { Tenderinvoice } from 'src/tenderinvoice/entities/tenderinvoice.entity';
import { User } from 'src/user/entities/user.entity';
import { SupplierInvoicingService } from '../helperService/SupplierInvoicingService';
import { SupplierReceiptingService } from '../helperService/SupplierReceiptingService';
import { CreateBankPaymentDto } from './dto/create-bank-payment.dto';

@Injectable()
export class BankPaymentService {

async findAll(userId:number){
  const user = await User.findOne({where:{id:userId},relations:['account']})
  return await Banktransaction.find({where:{regnumber:user.account.regnumber}})
}
  
 async create(createBankPaymentDto: CreateBankPaymentDto,userId:number) {
    const user = await User.findOne({where:{id:userId},relations:['account']})
     /**
      *  search for bank transaction
      **/   

     const transaction = await Banktransaction.findOne({where:{sourcereference:createBankPaymentDto.referencenumber}})
     let message =""
     let status =""
     if(transaction){

        if(transaction.status =='PENDING'){
            
           if(Number(transaction.amount) == Number(createBankPaymentDto.amount))
           {
            const suspense = await Suspense.create({accountId:user.accountId,banktransactionId:transaction.id,source:'banktransaction',accountnumber:transaction.accountnumber,currency:transaction.currency,amount:Number(transaction.amount).toString(),status:"PENDING"})
             await suspense.save()
            transaction.regnumber = user.account.regnumber
            transaction.status ="CLAIMED"
            await transaction.save()
            status="success"
             message="Wallet successfully topped up please  continue to settle invoice"
          }else{
            status="error"
            message ="Transaction was found however amount specified is different from amount received, your invoice has been put on AWAITING. Our finance Team will look at your Proof of payment and  process your invoice. If there are any issues you will be contacted"
           }
        }else{
        status="error"
        message ="Transaction already utilized, your invoice has been put on AWAITING. Our finance Team will look at your Proof of payment and  process your invoice. If there are any issues you will be contacted"
        }
      }else{
      status="error"
      message ="Transaction not found , your invoice has been put on AWAITING. Our finance Team will look at your Proof of payment and  process your invoice. If there are any issues you will be contacted"
     }

     let invoicenumber =""
     if(createBankPaymentDto.invoicenumber)
     {
       invoicenumber = createBankPaymentDto.invoicenumber
     }else{
     const service = new SupplierReceiptingService()
     const invoices = await service.get_invoice_data(userId)
     invoicenumber = invoices[0].invoicenumber
    }

     const rtgs = await Rtg.findOne({where:{invoicenumber:invoicenumber}})
     if(!rtgs){
      const record =  await Rtg.create({accountId:user.accountId,invoicenumber:invoicenumber,filename:createBankPaymentDto.filename,name:createBankPaymentDto.name,amount:createBankPaymentDto.amount,paymentdate:createBankPaymentDto.paymentdate})
       await record.save()
    }

    if(status=='error'){
      if(createBankPaymentDto.invoicenumber){
       await Tenderinvoice.update({invoicenumber:invoicenumber},{status:'AWAITING'})
      }else{
      await Supplierinvoice.update({invoicenumber:invoicenumber},{status:'AWAITING'})
    }
    }

    return {status:status,message:message}
  }

  async checkReferene(formdata:any,userId:number){
    try {
      const user = await User.findOne({where:{id:userId},relations:['account']})
      const transaction = await Banktransaction.findOne({where:{sourcereference:formdata.referencenumber}})
      let message =""
      let status =""
      if(transaction){
  
         if(transaction.status =='PENDING'){
             
            
             const suspense = await Suspense.create({accountId:user.accountId,banktransactionId:transaction.id,source:'banktransaction',accountnumber:transaction.accountnumber,currency:transaction.currency,amount:Number(transaction.amount).toString(),status:"PENDING"})
              await suspense.save()
             transaction.regnumber = user.account.regnumber
             transaction.status ="CLAIMED"
             await transaction.save()
             status="success"
              message="Wallet successfully topped up please  continue to settle invoice"
          
         }else{
         status="error"
         message ="Reference already utilized"
         }
       }else{
       status="error"
       message ="Reference number not found "
      }
  
      if(status=='success'){
        const service = new SupplierInvoicingService()
         await service.reset_invoice(formdata.invoicenumber,userId)
      }
  
      return {status:status,message:message}
      
    } catch (error) {
      const message = error.sqlMessage ? error.sqlMessage : error.message
      throw new HttpException(message,HttpStatus.BAD_REQUEST)
    }
   
  }
 
}
