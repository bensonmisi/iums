import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Accountnumber } from 'src/accountnumber/entities/accountnumber.entity';
import { HelperService } from 'src/helper/helper.service';
import { MailService } from 'src/mail/mail.service';
import { Mailinglist } from 'src/mailinglist/entities/mailinglist.entity';
import { Receipt } from 'src/receipt/entities/receipt.entity';
import { Rtg } from 'src/rtgs/entities/rtg.entity';
import { Supplierinvoice } from 'src/supplierinvoice/entities/supplierinvoice.entity';
import { Suspense } from 'src/suspense/entities/suspense.entity';
import { Suspensereceipt } from 'src/suspensereceipt/entities/suspensereceipt.entity';
import { In } from 'typeorm';

@Injectable()
export class SupplierreceiptingService {
    constructor( private readonly helperService:HelperService,private readonly mailService:MailService){}
    async getInvoiceData(invoicenumber:string):Promise<any>{
        const invoice = await Supplierinvoice.findOne({where:{invoicenumber:invoicenumber},relations:['currency']})
        const receipts = await Receipt.find({where:{invoicenumber:invoicenumber},relations:['currency']})
        const rtgs = await Rtg.find({where:{accountId:invoice.accountId,status:'PENDING'}})
        const accounts =  await this.getAccounts(invoice.currency.name,'NONREFUNDABLE',invoice.accountId)
        const suspensedata = await this.getSuspenseData(accounts,invoice.accountId)
        const suspenses = this.helperService.compute_suspense_accounts(suspensedata)

        return {receipts:receipts,rtgs:rtgs,suspenses:suspenses}
        

    }


    async settleInvoice(fdata:any,userId){
      const balance = await this.getSuspenseBalance(fdata.suspenseId)
      if(balance>0){
        const invoices = await Supplierinvoice.find({where:{id: In(fdata.invoiceItems)},relations:['currency']})
        if(invoices.length>0)
        {
        const receipts  = await Receipt.find({where:{invoicenumber:invoices[0].invoicenumber}})
         let totalinvoice = 0
         let totalreceipts=0

          invoices.forEach(inv=>{
            totalinvoice = totalinvoice+Number(inv.cost)
          })
          receipts.forEach(receipt=>{
            totalreceipts = totalreceipts + Number(receipt.amount)
          })

          const invoicebalance = totalinvoice - totalreceipts

          if(balance>0){
            /**
             * generating receipt number
             */
              const receiptnumber = await this.helperService.generate_receipt_number(fdata.invoiceItems[0])
              const uuid = await this.helperService.generateUUId()
              let invoicestatus ="PENDING"
              let walletstatus = "PENDING" 
              let amount = 0
              /**
               * checking if  invoice balance is going to be settled  suspense balance and update invoice status
               */
              if(invoicebalance <= balance){
                invoicestatus="PAID"
                amount = invoicebalance
                 }else{
                   amount = balance
                 }

                 /**
                  * checking if  invoice balance is going to be settled  suspense balance and update suspense status 
                  */
                if(invoicebalance>=balance){
                  walletstatus ="UTILIZED"
                }
             
               /**
                * save receipt
                */
                const receipt:Receipt = new Receipt()
                receipt.invoicenumber = invoices[0].invoicenumber
                receipt.receiptnumber = receiptnumber
                receipt.type ="SUPPLIER"
                receipt.description="SUPPLIER"
                receipt.accountId = invoices[0].accountId
                receipt.method ="suspense"
                receipt.sourceId = fdata.suspenseId
                receipt.currencyId = invoices[0].currencyId
                receipt.amount = amount.toString()
                receipt.userId = userId
                await Receipt.save(receipt)


                /**
                 * save suspense receipt
                 */
                
                const suspensereceipt:Suspensereceipt = new Suspensereceipt()
                suspensereceipt.uuid = uuid
                suspensereceipt.receiptnumber = receiptnumber
                suspensereceipt.currency = invoices[0].currency.name
                suspensereceipt.amount = amount.toString()
                suspensereceipt.suspenseId = fdata.suspenseId
                await Suspensereceipt.save(suspensereceipt)
                /**
                 * updating suspense 
                 */
             const suspense = await Suspense.findOne({where:{id:fdata.suspenseId}})
             suspense.status = walletstatus;
             await suspense.save()
            
             const check = await this.checkInvoiceStatus(invoices[0].invoicenumber)
             if(check){

               return {"status":"success","message":"Invoice successfully settled"}
             }else{
              return {"status":"success","message":"Invoice successfully received but not yet settled"}
             }

          }else{
            throw new HttpException("Invoice already settled",HttpStatus.BAD_REQUEST)
          }
        }else{
          throw new HttpException("Invoice not found",HttpStatus.BAD_REQUEST)
        }
      }else{
        throw new HttpException("Insufficient Funds in wallet",HttpStatus.BAD_REQUEST)
      }
    }

    async getAccounts(currency,type,accountId){
        const data =   await this.helperService.suspense_balance_by_type(currency,type,accountId)
        return Promise.resolve(data)
       
    }

    async getSuspenseBalance(id){
        const suspense_balance = await this.helperService.get_suspense_balance_by_id(id)
      return Promise.resolve(suspense_balance)
    }

    async getSuspenseData(accounts:Accountnumber[],accountId:number){
      const data = await this.helperService.get_suspense_data(accounts,accountId)   
      return Promise.resolve(data)
    }

    async checkInvoice(invoicenumber:string){
      const invoice = await Supplierinvoice.find({where:{invoicenumber:invoicenumber}})
      const receipts = await Receipt.find({where:{invoicenumber:invoicenumber}})

      let total = 0
      let totalcost = 0

      invoice.forEach(inv=>{
          totalcost = totalcost + Number(inv.cost)
      })

      receipts.forEach(receipt=>{
        total = total+Number(receipt.amount)
      })

      if(totalcost<=total){
         await Supplierinvoice.update(invoicenumber,{status:"PAID"})
      }
    }


    async checkInvoiceStatus(invoicenumber:string){
      
     const invoices = await Supplierinvoice.find({where:{invoicenumber:invoicenumber}})
     const receipts = await Receipt.find({where:{invoicenumber:invoicenumber}})
      const check = await this.helperService.check_supplier_invoice(invoices,receipts)
       const fin = Promise.resolve(check)
       if(fin){
         const maillist = await Mailinglist.findOne({where:{accountId:invoices[0].accountId}})
         if(maillist)
         {
         this.mailService.supplierinvoiceSettled(maillist.email)
         }
       }
       return fin
    }
}
