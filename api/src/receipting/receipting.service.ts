import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accountnumber } from 'src/accountnumber/entities/accountnumber.entity';
import { HelperService } from 'src/helper/helper.service';
import { Receipt } from 'src/receipt/entities/receipt.entity';
import { Rtg } from 'src/rtgs/entities/rtg.entity';
import { Suspense } from 'src/suspense/entities/suspense.entity';
import { Suspensereceipt } from 'src/suspensereceipt/entities/suspensereceipt.entity';
import { Tenderapplication } from 'src/tenderapplication/entities/tenderapplication.entity';
import { Tenderinvoice } from 'src/tenderinvoice/entities/tenderinvoice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReceiptingService {
    constructor(@InjectRepository(Receipt) private receiptRepository:Repository<Receipt>,
               private readonly helperService:HelperService){}

               async getData(id:number):Promise<any>{
                   const invoice = await Tenderinvoice.findOne(id,{relations:['currency']})
                   if(invoice){
                          
                        if(invoice.tenderapplicationId)
                         {
                            // get receipts 
                           const receipts = await this.receiptRepository.find({where:{invoicenumber:invoice.invoicenumber},relations:['currency']})
                           
                           /** get rtgs */
                           const rtgs = await Rtg.find({where:{invoicenumber:invoice.invoicenumber}})

                           /** get suspense balances */
                          const accounts =  await this.getAccounts(invoice.currency.name,invoice.type,invoice.accountId)
                          const suspensedata = await this.getSuspenseData(accounts,invoice.accountId)
                          const suspenses = this.helperService.compute_suspense_accounts(suspensedata)
                          return  {invoice:invoice,receipts:receipts,rtgs:rtgs,suspense:suspenses}
                         }else{
                          throw new HttpException("No Application linked to invoice. Cannot be processed",HttpStatus.BAD_REQUEST) 
                         }

                        }else{
                       throw new HttpException("Invoice not found",HttpStatus.BAD_REQUEST)
                   }
               }

               async settle(suspenseId:number,invoiceId:number,userId:number):Promise<any>{
                     
                      const balance = await this.getSuspenseBalance(suspenseId)
                      if(balance>0){
                        const invoice = await Tenderinvoice.findOne(invoiceId,{relations:['currency','tenderfeetype']})
                        if(invoice){
                         
                             const invoicebalance = await this.computeInvoiceBalanace(invoice)
                            if(invoicebalance>0){
                                const uuid = this.helperService.generateUUId()
                                const receiptnumber = await this.helperService.generate_receipt_number(invoice.id)
                                const code = await this.helperService.generate_tender_code(invoice.tenderfeetype.name,invoice.accountId)
                                let paymentstatus=invoicebalance<=balance ? "PAID" :"PENDING"
                                let amount =invoicebalance>=balance ? balance : invoicebalance                  
                                let invoicenumber=invoice.invoicenumber
                                let type = invoice.tenderfeetype.name
                                let accountId = invoice.accountId
                                let currencyId = invoice.currencyId                        
                                let suspense = await Suspense.findOne(suspenseId)
                                await this.createReceipt(invoicenumber,receiptnumber,type,type,accountId,'suspense',suspenseId,currencyId,amount,userId)
                                await this.createSuspenseReceipt(amount.toString(),uuid,receiptnumber,invoice.currency.name,suspense)
                                await this.helperService.get_suspense_balance_by_id(suspenseId)
                               await Tenderapplication.update(invoice.tenderapplicationId,{status:paymentstatus,code:code})
                               await this.checkInvoice(invoice.invoicenumber)
                               return {"status":"success","message":"Invoice successfully Proceed"}
                            }else{
                               invoice.status ="PAID";
                               await invoice.save();
                                throw new HttpException("Invoice Invoice Already Settled",HttpStatus.BAD_REQUEST)     
                            }
                     
                        }else{
                            throw new HttpException("Invoice not found",HttpStatus.BAD_REQUEST)  
                     
                        }
                      }else{
                        throw new HttpException("Insufficient funds in suspense wallet",HttpStatus.BAD_REQUEST)  
                      }    
               }






               /**helper  functions */
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
              const invoice = await Tenderinvoice.findOne({where:{invoicenumber:invoicenumber}})
              const receipts = await Receipt.find({where:{invoicenumber:invoicenumber}})

              let total = 0

              receipts.forEach(receipt=>{
                total = total+Number(receipt.amount)
              })

              if(Number(invoice.amount)<=total){
                invoice.status="PAID"
                await invoice.save()
              }
            }

            async createSuspenseReceipt(amount:string,uuid:string,receiptnumber:string,currency:string,suspense:Suspense){
              const suspensereceipt:Suspensereceipt = new Suspensereceipt()
              suspensereceipt.amount=amount
              suspensereceipt.uuid = uuid
              suspensereceipt.currency= currency
              suspensereceipt.receiptnumber = receiptnumber
              suspensereceipt.suspense = suspense
              await Suspensereceipt.save(suspensereceipt)
            }

            async createReceipt(invoicenumber:string,receiptnumber:string,type:string,description,accountId:number,method:string,sourceId:number,currencyId:number,amount:number,userId:number){
               const receipt:Receipt = new Receipt()
               receipt.invoicenumber = invoicenumber
               receipt.receiptnumber = receiptnumber
               receipt.type = type
               receipt.description = description
               receipt.accountId = accountId
               receipt.method = method
               receipt.sourceId = sourceId
               receipt.currencyId = currencyId
               receipt.amount = amount.toString()
               receipt.userId = userId

               await Receipt.save(receipt)

            }

            async computeInvoiceBalanace(invoice:Tenderinvoice){
              const receipts = await this.receiptRepository.find({where:{invoicenumber:invoice.invoicenumber}})
              let total_receipted=0
              if(receipts.length>0){
                   receipts.forEach(element=>{
                       total_receipted = total_receipted + Number(element.amount)
                   })
              }

              const invoicebalance = Number(invoice.amount) - total_receipted

              return invoicebalance
            }

            async checkfee(applicationId){

              /**
               * 1. Get application transactions
               * 2. Get Supplierfeetype
               * 3. Get Required supplier fee type
               * 4. Check if the supplier fee type exists
               * 5. If Bidbond check if establishment fee is paid
               * 6. If Bidbond check if the establishment fee is correct
               */
            }

            /**
             * end of helper functions
             */
}
