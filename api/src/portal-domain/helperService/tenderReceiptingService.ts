import { HttpException, HttpStatus } from "@nestjs/common";
import { HelperService } from "src/helper/helper.service";
import { Receipt } from "src/receipt/entities/receipt.entity";
import { Suspense } from "src/suspense/entities/suspense.entity";
import { Suspensereceipt } from "src/suspensereceipt/entities/suspensereceipt.entity";
import { Tenderapplication } from "src/tenderapplication/entities/tenderapplication.entity";
import { Tenderinvoice } from "src/tenderinvoice/entities/tenderinvoice.entity";
import { User } from "src/user/entities/user.entity";
import * as moment from 'moment'
export class TenderReceiptingHelperService{
    async getData(invoicenumber:string,userId){
        const user = await User.findOne({where:{id:userId}})

        /**
         * get total invoice
         */
         const invoices = await this.getInvoices(invoicenumber,user.accountId)
         if(!invoices){
            return {status:"error",message:"No Pending invoice found"}            
         }

        /**
         * get wallet balance
         */

        const wallet = await this.getWalletBalance(invoices.currency.name,user.accountId,invoices.type)


        /**
         * get total receipts
         */
       const receipts = await this.getReceipts(invoices.invoicenumber)

        /**
         * get suspense data
         */

        const balances = await this.get_suspense_list(invoices.type,invoices.currency.name,invoices.accountId)

        return {invoice:invoices,wallet:wallet,receipts:receipts,balances:balances}
    }

    async settle(invoicenumber:string,suspenseId:string,userId:number){
       
        const user = await User.findOne({where:{id:userId}})

        /**
         * get total invoice
         */
         const invoice = await this.getInvoices(invoicenumber,user.accountId)

         /***
          * get receipts
          */

         const totalreceipts = await this.totalReceipts(invoicenumber)

         const balance = Number(invoice.amount)-totalreceipts

         const walletbalance = await this.getSuspenseBalance(+suspenseId,user.accountId)

         if(walletbalance==0){
             throw new HttpException("Insufficient wallet balance",HttpStatus.BAD_REQUEST)
         }

         let suspensestatus = balance>=walletbalance  ? 'UTILIZED':"PENDING"
         let amount = balance>walletbalance ? walletbalance : balance      
  
         /**
          * generate UUID
          */
        const uuid = await this.getUUID()
        /**
         * generate receipt number
         */
        const receiptnumber = await this.getReceiptNumber(user.accountId)

        

        /**
         * capture receipt
         */

        await this.captureReceipt(invoicenumber,receiptnumber,invoice.description,invoice.description,user.accountId,+suspenseId,invoice.currencyId,amount.toString(),userId)

        /**
         * capute suspense receipts
         */
        await this.capture_suspense_receipt(uuid,receiptnumber,invoice.currency.name,amount.toString(),+suspenseId)

        if(suspensestatus=='UTILIZED'){
            await this.update_suspense(+suspenseId)
        }
         

        /**
         * check if  invoice has been settled 
         */

       const check = await this.checkSettlement(invoicenumber,user.accountId)
  
        if(check){
            await Tenderinvoice.update({invoicenumber:invoicenumber},{status:"PAID"})
            await this.captureApplication(invoicenumber)
            return {status:"success",message:"Invoice successfully Settled"}
        }else{
            return {status:"success",message:'Invoice receipted but not yet settled'}
        }


    }


    async getInvoices(invoicenumber:string,accountId:number){
     return   await Tenderinvoice.findOne({where:{invoicenumber:invoicenumber,status:'PENDING',accountId:accountId},relations:['currency','tenderfeetype']})       
    }

    async totalReceipts(invoicenumber:string){
        const receipts =  await Receipt.find({where:{invoicenumber:invoicenumber}})
        let totalreceits = 0
        if(receipts.length>0){
            receipts.forEach(receipt=>{
                totalreceits = Number(totalreceits)+Number(receipt.amount)
            })
        }
        return totalreceits
    }

    async getWalletBalance(currency:string,accountId:number,type:string){
        const helperService = new HelperService()
        const walletbalances = await helperService.get_suspense_balances(accountId)
        
        const wallet = walletbalances.filter(wallet=>{
            if(wallet.type==type && wallet.currency==currency){
                return wallet
            }
        })

        return wallet

    }

    async getSuspenseBalance(suspenseId:number,accountId:number){
        const helperService = new HelperService()
        const walletbalance = await helperService.get_suspense_balance_by_account(suspenseId,accountId)
        return walletbalance
    }

    async get_suspense_list(type:string,currency:string,accountId:number){
       const helperService = new HelperService()
      return await helperService.get_suspense_balance_accounts(type,currency,accountId)

    }

    async getReceipts(invoicenumber:string){
        return await Receipt.find({where:{invoicenumber:invoicenumber}})
    }

    async captureReceipt(invoicenumber:string,receiptnumber:string,type:string,description:string,accountId:number,suspenseId:number,currencyId:number,amount:string,userId:number){
        try{
            const receipt:Receipt = new Receipt()
            receipt.invoicenumber = invoicenumber
            receipt.receiptnumber = receiptnumber
            receipt.type =type
            receipt.description=description
            receipt.accountId = accountId
            receipt.method ="suspense"
            receipt.sourceId = suspenseId
            receipt.currencyId = currencyId
            receipt.amount = amount
            receipt.userId = userId
            await Receipt.save(receipt)
          }catch(error){
              throw new HttpException("Failed Capture please contact System Administrator. CODE:RT1",HttpStatus.BAD_REQUEST)
          }
    }

    async capture_suspense_receipt(uuid:string,receiptnumber:string,currency:string,amount:string,suspenseId:number){
  
        try {
          const suspensereceipt:Suspensereceipt = new Suspensereceipt()
          suspensereceipt.uuid = uuid
          suspensereceipt.receiptnumber = receiptnumber
          suspensereceipt.currency = currency
          suspensereceipt.amount = amount
          suspensereceipt.suspenseId = suspenseId
          await Suspensereceipt.save(suspensereceipt)
        } catch (error) {
          throw new HttpException("Failed Capture please contact System Administrator. CODE:RT2",HttpStatus.BAD_REQUEST)
        }  
       }

       async update_suspense(suspenseId:number){
        try {
             const suspense = await Suspense.findOne({where:{id:suspenseId}})
             suspense.status = 'UTILIZED'
             await suspense.save()  
        } catch (error) {
           throw new HttpException("Failed Capture please contact System Administrator. CODE:RT3",HttpStatus.BAD_REQUEST)    
        }
    }
   

    async checkSettlement(invoicenumber:string,accountId:number){

        const invoices = await Tenderinvoice.find({where:{invoicenumber:invoicenumber,accountId:accountId},relations:['currency']}) 
        const totalreceipts = await this.totalReceipts(invoicenumber)
         let totalinvoice =0
           invoices.forEach(inv=>{
               totalinvoice = Number(totalinvoice) + Number(inv.amount)
           })
        const balance = totalinvoice - totalreceipts
        if(balance<=0){
            return true
        }else{
            return false
        }
    }

    async getReceiptNumber(accountId:number){
        const helperService = new HelperService()
        const receiptnumber = await helperService.generate_receipt_number(accountId)
        return receiptnumber
    }

    async getUUID(){
        const helperService = new HelperService()
        return await helperService.generateUUId()
    }

    async captureApplication(invoicenumber:string){
        const helperService = new HelperService()
        const invoice = await Tenderinvoice.findOne({where:{invoicenumber:invoicenumber},relations:['tenderfeetype','noticefee','currency']})
        const code = await helperService.generate_tender_code(invoice.noticefee.tenderfeetype.name,invoice.accountId)
        const uuid = await helperService.generateUUId()
        let maturitydate = null
  
        if(invoice.noticefee.tenderfeetype.name ==='BIDBOND'){
                  //maturitydate = //await moment(moment().format(invoice.noticefee.notice.closingDate)).add(invoice.noticefee.bidbondperiod.days,'days')
          maturitydate = moment(moment(invoice.noticefee.notice.closingDate).format('YYYY-MM-DD')).add(invoice.noticefee.bidbondperiod.days,'days')
          maturitydate = moment(maturitydate).utc().format('YYYY-MM-DD')
       
              
        }
        try {
            const el ={
                       "accountId":invoice.accountId,
                        "uuid":uuid,
                        "procuremententityId":invoice.noticefee.notice.procuremententityId,
                        "noticefeeId":invoice.noticefeeId,
                        "tendernumber":invoice.noticefee.notice.tendernumber,
                        "closingDate":invoice.noticefee.notice.closingDate,
                        "validityperiod":invoice.noticefee.bidbondperiod ? +invoice.noticefee.bidbondperiod.days : 0,
                        "type":invoice.description,
                        "tenderfeetypeId":invoice.noticefee.tenderfeetypeId,
                        "code":code,
                        "maturitydate":maturitydate,
                        "currencyId":invoice.currencyId,
                        "status":"PAID",
                        "tenderinvoiceId":invoice.id,
                        "noticeId":invoice.noticefee.noticeId,
                        "amount":invoice.amount,
                        "refund":"PENDING",
                        "refunded":"N"

                    }

            
             const record =  await Tenderapplication.create(el)
             await record.save()
            /* const tenderapplication = new Tenderapplication()
            tenderapplication.accountId = invoice.accountId
            tenderapplication.uuid  = uuid
            tenderapplication.procuremententityId = invoice.noticefee.notice.procuremententityId
            tenderapplication.noticefeeId = invoice.noticefeeId
            tenderapplication.tendernumber = invoice.noticefee.notice.tendernumber
            tenderapplication.closingDate = invoice.noticefee.notice.closingDate
            tenderapplication.validityperiod = invoice.noticefee.bidbondperiod ? +invoice.noticefee.bidbondperiod.days : 0
            tenderapplication.type = invoice.description
            tenderapplication.tenderfeetypeId = invoice.noticefee.tenderfeetypeId
            tenderapplication.code = code
            tenderapplication.maturitydate = maturitydate
            tenderapplication.currencyId = invoice.currencyId
            tenderapplication.status ='PAID'
            tenderapplication.tenderinvoiceId = invoice.id
            tenderapplication.noticeId = invoice.noticefee.noticeId
            await tenderapplication.save()  */ 
        } catch (error) {
             const message = error.sqlMessage ? error.sqlMessage : error.message
             throw new HttpException(message,HttpStatus.BAD_REQUEST)
        }
       

    }
}