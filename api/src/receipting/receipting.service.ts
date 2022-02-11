import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { check } from 'prettier';
import { Accountnumber } from 'src/accountnumber/entities/accountnumber.entity';
import { Bidbondthreshold } from 'src/bidbondthreshold/entities/bidbondthreshold.entity';
import { Events } from 'src/events';
import { HelperService } from 'src/helper/helper.service';
import { MessageProducerService } from 'src/message.producer.service';
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
               private readonly helperService:HelperService,
               private readonly eventEmitter:Events
               ){}

               async getData(id:number):Promise<any>{
                   const invoice = await Tenderinvoice.findOne(id,{relations:['currency']})
                   if(invoice){
                          
                        if(invoice.tenderapplicationId)
                         {
                            // get receipts 
                           const receipts = await this.receiptRepository.find({where:{invoicenumber:invoice.invoicenumber},relations:['currency']})
                           
                           /** get rtgs */
                           const rtgs = await Rtg.find({where:{accountId:invoice.accountId,status:'PENDING'}})

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
                              const checkfee =await this.checkfee(invoice.tenderapplicationId)
                              if(checkfee)
                              {
                              
                             const invoicebalance = await this.computeInvoiceBalanace(invoice)
                            if(invoicebalance>0){
                                const uuid = this.helperService.generateUUId()
                                const receiptnumber = await this.helperService.generate_receipt_number(invoice.id)
                               // console.log(invoice)
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
                 this.eventEmitter.emitTendeerInvoiceSettlementEvent("benson.misi@gmail.com",invoice.tendernumber,invoice.description)
                 
               
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
               * 2. Get tenderfeetype
               * 3. Get Required tender fee type
               * 4. Check if the tender  fee type exists
               * 5. If Bidbond check if establishment fee is paid
               * 6. If Bidbond check if the establishment fee is correct
               */

              //1

              const application = await Tenderapplication.findOne({where:{id:applicationId},relations:['tenderfeetype']})
              if(application){
               const required = application.tenderfeetype ? application.tenderfeetype.required : null
               const rule =  application.tenderfeetype ? application.tenderfeetype.rule : null
               if(required){
                   if(rule=='PAID'){
                      if(required.toUpperCase()==='ESTABLISHMENT FEE'){
                         /**
                          * calculate the correct establishment fee based on the bidbond value and validity period
                          */
                          const invoice = await Tenderinvoice.findOne({where:{accountId:application.accountId,tendernumber:application.tendernumber,description:'ESTABLISHMENT FEE',status:'PAID'}})
                          if(!invoice){
                            throw new HttpException(required+" has to be settled first",HttpStatus.BAD_REQUEST)
                          }else{
                            const checkfee = await this.calculate_establishment_fee(application.amount,application.validityperiod.toString(),application.currencyId)
                             if(checkfee){
                               if(Number(invoice.amount) < checkfee){
                                 throw new HttpException("ESTABLISHMENT FEE PAID of"+invoice.amount+"  is less than the expected of "+checkfee,HttpStatus.BAD_REQUEST)
                               }else{
                                 return true
                               }
                             }
                          }

                      }
                   }else{
                    if(required.toUpperCase()==='BIDBOND'){
                         /**
                          * calculate the correct establishment fee based on the bidbond value and validity period
                          */  

                       const bidbond = await Tenderapplication.findOne({where:{accountId:application.accountId,tendernumber:application.tendernumber,type:required}})
                       if(bidbond){
                             const checkfee = await this.calculate_establishment_fee(bidbond.amount,bidbond.validityperiod.toString(),bidbond.currencyId)
                             if(Number(application.amount) !== checkfee){
                              throw new HttpException("ESTABLISHMENT FEE INVOICED "+application.amount+" . Expected  Fee : "+checkfee,HttpStatus.BAD_REQUEST)
                               }else{
                                 return true
                               }
                       }else{
                         throw new HttpException(required+" Fee is required in order to process invoice",HttpStatus.BAD_REQUEST)
                       }
                    }
                  }
               }
               return true
              }else{
                throw new HttpException('Application cannot be found',HttpStatus.BAD_REQUEST)
              }

            }

            async calculate_establishment_fee(bidvalue:string,validityperiod:string,currencyId:number){
               const bidbonds = await Bidbondthreshold.find({where:{currencyId:currencyId,validityperiod:validityperiod}})
               if(bidbonds.length>0){
                   let fee = 0;

                   bidbonds.forEach(bid=>{
                     if(Number(bid.lowerlimit)< Number(bidvalue)&& Number(bidvalue)<Number(bid.upperlimit)){
                       fee = Number(bid.amount)
                        }
                   })
                   return fee
               }
               else{
                 throw new HttpException("Bid Bond Threshold not set",HttpStatus.BAD_REQUEST)
               }
            }

            /**
             * end of helper functions
             */
}
