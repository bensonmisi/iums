import { HttpCode, HttpException, HttpStatus } from "@nestjs/common"
import e from "express"
import { HelperService } from "src/helper/helper.service"
import { Receipt } from "src/receipt/entities/receipt.entity"
import { Supplierinvoice } from "src/supplierinvoice/entities/supplierinvoice.entity"
import { Suspense } from "src/suspense/entities/suspense.entity"
import { Suspensereceipt } from "src/suspensereceipt/entities/suspensereceipt.entity"
import { User } from "src/user/entities/user.entity"
import { In, MoreThanOrEqual } from "typeorm"
import { SupplierInvoicingService } from "./SupplierInvoicingService"

export class SupplierReceiptingService{
    async getData(userId:number){
        const helperService = new HelperService()
        let totalinvoice = 0
        let totalreceipts=0   
        try {
            const totals = await this.get_totals(userId)
            totalinvoice = totals.totalinvoice
            totalreceipts = totals.totalreceipts
            const wallet = await this.walletBalance(userId)
            const invoices = await this.get_invoice_data(userId)
            const balances =  await  helperService.get_suspense_balance_accounts('NONREFUNDABLE',invoices[0].currency.name,invoices[0].accountId)
            return {totalinvoice,totalreceipts,wallet,balances,currency:invoices[0].currency.name }   
        } catch (error) {
           const message = error.sqlMessage ? error.sqlMessage  : error.message
           
           throw new HttpException(message,HttpStatus.BAD_REQUEST)
        }  

    
     
    }

    async getAll(userId:number){
     const user = await User.findOne({where:{id:userId}})
     return await Receipt.find({where:{accountId:user.accountId}})
    }

    async getByInvoice(userId:number,invoicenumber:string){
        const user = await User.findOne({where:{id:userId}})
     return await Receipt.find({where:{accountId:user.accountId,invoicenumber:invoicenumber}})  
    }
   

    async settle(userId:number,suspenseId:number){
       const helperService = new HelperService()
        const totals = await this.get_totals(userId)
        const invoices = await this.get_invoice_data(userId)
        const balanceDue = totals.totalinvoice-totals.totalreceipts
        const walletbalance = await helperService.get_suspense_balance_by_account(suspenseId,invoices[0].accountId)

        if(walletbalance<=0){
            throw new HttpException("Insufficient funds in wallet",HttpStatus.BAD_REQUEST)
        }


        
        
        const receiptnumber = await helperService.generate_receipt_number(invoices[0].accountId)
        const uuid = await helperService.generateUUId()
        let amount = 0 
        let UTILIZED =false
        if(balanceDue>=walletbalance){
            amount = walletbalance
            UTILIZED = true
        }
        else{
            amount = balanceDue
        }

        /**
         * receipt
         */
        await this.capture_receipt(invoices[0].invoicenumber,receiptnumber,invoices[0].accountId,suspenseId,invoices[0].currencyId,amount.toString(),userId)
        /**
         * suspense receipt
         */

        await this.capture_suspense_receipt(uuid,receiptnumber,invoices[0].currency.name,amount.toString(),suspenseId)

        /**
         * update suspense
         */

         if(UTILIZED){
             await this.update_suspense(suspenseId)
         }

        /**
         * check invoice
         */
        const invoicingservice = new SupplierInvoicingService()
        const check = await invoicingservice.check_if_invoice_is_settled(invoices[0].invoicenumber)
        if(check){
            await invoicingservice.settle_invoice(invoices[0].invoicenumber,invoices[0].accountId)
            return {"status":"success","message":"Invoice Successfully Settled"}
        }else{
          return {"status":"success","message":"Receipt successfully captured."}   
        }

    }


    async get_invoice_data(userId:number){
        const user = await User.findOne({where:{id:userId}})
        const today = new Date()
        const year = today.getFullYear()
        const invoices = await Supplierinvoice.find({where:{accountId:user.accountId,year:MoreThanOrEqual(year),status:'PENDING'},relations:['currency']})
       return invoices      
   
    }



    async get_totals(userId:number){
        const user = await User.findOne({where:{id:userId}})
        const today = new Date()
        const year = today.getFullYear()
        const invoices = await Supplierinvoice.find({where:{accountId:user.accountId,year:MoreThanOrEqual(year),status:'PENDING'},relations:['currency']})
        let totalinvoice = 0
        let totalreceipts=0
        if(invoices.length==0){
          throw new HttpException("No Pending invoices found",HttpStatus.BAD_REQUEST)
        }

            invoices.forEach(inv=>{
               totalinvoice = totalinvoice+Number(inv.cost)
            })
            const receipts = await Receipt.find({where:{invoicenumber:invoices[0].invoicenumber}})
            if(receipts.length>0){
                receipts.forEach(receipt=>{
                    totalreceipts  = totalreceipts + Number(receipt.amount)
                })
            }
        return {totalreceipts,totalinvoice}
    }

    async walletBalance(userId:number)
    {
        const helperService = new HelperService()
        const user = await User.findOne({where:{id:userId}})
        const today = new Date()
        const year = today.getFullYear()
        const invoices = await Supplierinvoice.find({where:{accountId:user.accountId,year:MoreThanOrEqual(year),status:'PENDING'},relations:['currency']})
            
            const walletbalances = await helperService.get_suspense_balances(user.accountId)

            const wallet = walletbalances.filter(wallet=>{
                if(wallet.type=='NONREFUNDABLE' && wallet.currency==invoices[0].currency.name){
                    return wallet
                }
            })

            return wallet
    }

    async capture_receipt(invoicenumber:string,receiptnumber:string,accountId:number,suspenseId:number,currencyId:number,amount:string,userId:number){

      try{
        const receipt:Receipt = new Receipt()
        receipt.invoicenumber = invoicenumber
        receipt.receiptnumber = receiptnumber
        receipt.type ="SUPPLIER"
        receipt.description="SUPPLIER"
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
}