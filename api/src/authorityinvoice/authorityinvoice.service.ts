import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { stat } from 'fs';
import { Banktransaction } from 'src/banktransaction/entities/banktransaction.entity';
import { Authorityapplication } from 'src/entity-domain/authorityapplication/entities/authorityapplication.entity';
import { Authorityinvoiceupload } from 'src/entity-domain/authorityinvoiceupload/entities/authorityinvoiceupload.entity';
import { HelperService } from 'src/helper/helper.service';
import { Receipt } from 'src/receipt/entities/receipt.entity';
import { Suspense } from 'src/suspense/entities/suspense.entity';
import { Suspensereceipt } from 'src/suspensereceipt/entities/suspensereceipt.entity';
import { ClaimAuthorityInvoiceDto } from './dto/claim-authorityinvoice.dto';
import { Authorityinvoice } from './entities/authorityinvoice.entity';

@Injectable()
export class AuthorityinvoiceService {
constructor(private readonly helperService:HelperService){}
 
  async findAll(status:string) {
    return  await Authorityinvoice.find({where:{status:status},relations:['currency','authorityapplication','procuremententity']})
  }

  async findOne(id){
    const invoice = await Authorityinvoice.findOne({where:{id:id}})
    const uploads = await Authorityinvoiceupload.find({where:{authorityinvoiceId:id}})
    const receipts = await Receipt.find({where:{invoicenumber:invoice.invoicenumber}})
    const suspense =  await Suspense.find({where:{procuremententityId:invoice.procuremententityId,status:'PENDING'},relations:['receipts','transfers']})
    const balance =  await this.helperService.compute_suspenses_balance(suspense)
    return {uploads:uploads,receipts:receipts,balance:balance}
  }

  async getpop(id){
    return await Authorityinvoiceupload.findOne({where:{id:id}})
  }

  async claim(claimAuthorityInvoice:ClaimAuthorityInvoiceDto,userId:number){
    const invoice = await Authorityinvoice.findOne({where:{id:claimAuthorityInvoice.id},relations:['procuremententity']})
    const transaction  = await Banktransaction.findOne({where:{id:claimAuthorityInvoice.banktransactionId}})
    if(!transaction){
      throw new HttpException("Transaction not found",HttpStatus.BAD_REQUEST)
      
    }

    if(transaction.status=='CLAIMED'){
      throw new HttpException("Transaction already utilized",HttpStatus.BAD_REQUEST) 
    }

    transaction.regnumber = invoice.procuremententity.regnumber
    transaction.status="CLAIMED"
    transaction.adminId = userId

    await transaction.save()

    const suspsense = new Suspense()
    suspsense.banktransactionId = transaction.id
    suspsense.source="banktransaction"
    suspsense.accountnumber = transaction.accountnumber
    suspsense.currency = transaction.currency
    suspsense.amount = transaction.amount
    suspsense.procuremententityId = invoice.procuremententity.id
    await suspsense.save()
    return {status:"success",message:"Successfully allocated funds to wallet"}


  }

  async process(id:number,userId:number){

    /**
     * get invoice 
     */

    const invoice = await Authorityinvoice.findOne({where:{id:id},relations:['currency']})
    
    /**
     *  get total receipted
     */

    const totalreceipted = await this.totalReceipted(invoice.invoicenumber)

    /**
     * get  suspense 
     */

    const suspense = await Suspense.findOne({where:{procuremententityId:invoice.procuremententityId,status:'PENDING'}})
    if(suspense){
      const balance = Number(invoice.cost) - totalreceipted
       let cost = 0 
       let status = "PENDING"
      if(+suspense.amount > balance){
        cost = balance
      }else{
        status ="UTILIZED"
        cost = +suspense.amount
      }

      const receiptnumber = await this.helperService.generate_receipt_number(invoice.id)

      if(status=='UTILIZED'){
        suspense.status = status
        await suspense.save()
      }

      /**
       * generate receipt
       */
      const receipt = new Receipt()
      receipt.receiptnumber = receiptnumber
      receipt.invoicenumber = invoice.invoicenumber
      receipt.type = 'ENTITY'
      receipt.description="AUTHORITY_TO_CONDUCT"
      receipt.method = "suspense"
      receipt.sourceId = suspense.id
      receipt.currencyId = invoice.currencyId
      receipt.amount = cost.toString()
      receipt.userId = userId
      await receipt.save()

      /**
       * generate suspense receipt
       */

      const uuid = await this.helperService.generateUUId()
      const suspensereceipt =new Suspensereceipt()
      suspensereceipt.suspenseId = suspense.id
      suspensereceipt.receiptnumber= receiptnumber
      suspensereceipt.uuid = uuid
      suspensereceipt.currency = invoice.currency.name
      suspensereceipt.amount = cost.toString()
      await suspensereceipt.save()

      await this.checkSettlement(invoice)

      return {status:"success",message:"Successfully Settled Invoice"}

    }
    
  }

  async totalReceipted(invoicenumber:string){
    const receipts = await Receipt.find({where:{invoicenumber:invoicenumber}})
    let balance = 0
    if(receipts.length>0){

     receipts.forEach(receipt=>{
       balance = balance + Number(receipt.amount)
     })
    }

    return balance
  }

  async checkSettlement(invoice:Authorityinvoice){
    const receipts = await Receipt.find({where:{invoicenumber:invoice.invoicenumber}})
    let balance = 0
    if(receipts.length>0){

     receipts.forEach(receipt=>{
       balance = balance + Number(receipt.amount)
     })
    }
   
    if(Number(invoice.cost) == balance){
         invoice.status = "PAID"
         await invoice.save()

         await Authorityapplication.update({id:invoice.authorityapplicationId},{status:"APPROVED"})

         /**
          * send email
          */
    }
  }

 
}
