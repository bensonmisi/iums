import { Supplier } from "src/supplier/entities/supplier.entity";
import { Supplierinvoice } from "src/supplierinvoice/entities/supplierinvoice.entity";
import { In } from "typeorm";
import { AddItemDto } from "../supplierinvoicing/dto/add-item.dto";
import * as moment from 'moment'
import { HttpException, HttpStatus } from "@nestjs/common";
import { HelperService } from "src/helper/helper.service";
import { Account } from "src/accounts/entities/account.entity";
import { User } from "src/user/entities/user.entity";
import { Receipt } from "src/receipt/entities/receipt.entity";


export class SupplierInvoicingService{

    async add_item_to_invoice(itemDto:AddItemDto,userId:number,accountId:number){

        const invoices = await this.get_invoice_items(accountId,itemDto.regyear)
       

            /**
             * validate data 
             */

          const check =   await this.validate_data(invoices,itemDto,accountId) 
         
           
           /**
            *  addd to invoice
            */

           if(check)
           {
           return await this.charge(itemDto,userId,accountId) 
           }      




    }

    async get_invoice_items(accountId:number,regyear:number){
        return await Supplierinvoice.find({where:{accountId:accountId,year:regyear,status:In(['PAID','AWAITING','PENDING'])},relations:['category','currency']})
    }

    async  remove_item_from_invoice(id:number,userId:number){
        const user = await User.findOne({where:{id:userId}})
        const invoice = await Supplierinvoice.findOne({where:{id:id,accountId:user.accountId}})
        
        if(!invoice){
           throw new HttpException("Invoice not found",HttpStatus.BAD_REQUEST)
        }
        const INVOICE_NUMBER = invoice.invoicenumber

        /**
         * check if invoice has been settled
         */
      const checkinvoice = await this.check_if_invoice_is_settled(INVOICE_NUMBER)
      if(!checkinvoice){

        /**
         * delete invoice
         */
       await  Supplierinvoice.delete(id)

       /** check if there are any items left in the invoice */
       const invoices = await Supplierinvoice.find({where:{invoicenumber:INVOICE_NUMBER}})

       if(invoices.length>0){
           /**
            * check again if invoice has been settled
            */
          const check_invoice = await this.check_if_invoice_is_settled(INVOICE_NUMBER)  
          if(check_invoice){
            await this.settle_invoice(INVOICE_NUMBER,user.accountId)
            return {"status":"success","message":"Invoice successfully deleted. Invoice successfully settled"}
          }
       }
       return {"status":"success","message":"Invoice successfully deleted"}
      }else{

        /**
         * if invoice has been settled  check  documents and register categories
         */
         await this.settle_invoice(INVOICE_NUMBER,user.accountId)
         return {"status":"success","message":"Invoice successfully settled"}

      }
       



        
    }

    async settle_invoice(invoicenumber:string,accountId:number){
    
     const invoices = await Supplierinvoice.find({where:{invoicenumber:invoicenumber,status:'PAID'}})
     const helperService = new HelperService()
     if(invoices.length>0){
     
        const response = await helperService.check_account_documents(accountId)
        let status = "PENDING"

        if(response.status){
            status ="APPROVED"
        }

        invoices.forEach(async(invoice)=>{
            await helperService.capture_supplier(invoice,status)
        })
     }

    }

    async reset_invoice(invoicenumber:string,userId:number){
        const user = await User.findOne({where:{id:userId}})
        const invoice = await Supplierinvoice.findOne({where:{accountId:user.accountId,status:'PENDING'}})
        if(!invoice){
            await Supplierinvoice.update({invoicenumber:invoicenumber},{status:'PENDING'})
            return {"status":"success","message":"Invoice successfully reset.Please settle invoice"}
        }
        throw new HttpException("You have another invoice in a PENDING. Please settle that first before reseting this invoice",HttpStatus.BAD_REQUEST)
    }

    async check_if_invoice_is_settled(invoicenumber:string){
        const invoices = await Supplierinvoice.find({where:{invoicenumber:invoicenumber,status:In(['PENDING','AWAITING'])}})
        const receipts = await Receipt.find({where:{invoicenumber:invoicenumber}})

        let totalinvoices =0
        let totalreceipts=0
        if(invoices.length>0)
        {
            invoices.forEach(invoice=>{
                totalinvoices = totalinvoices+ Number(invoice.cost)
            })
        }

        if(receipts.length>0){
            receipts.forEach(receipt=>{
                totalreceipts = totalreceipts + Number(receipt.amount)
            })
        }

        const balance = totalinvoices-totalreceipts
        if(balance>0){
            return false
        }
        await Supplierinvoice.update({invoicenumber:invoicenumber,status:In(['PENDING','AWAITING'])},{status:'PAID'})
        return true
    }

    async validate_data(invoices:Supplierinvoice[],itemDto:AddItemDto,accountId:number){
        const check_currency = await this.check_currency(invoices,itemDto)
        if(!check_currency){
            throw new HttpException("Cannot add multi-currency items to invoice",HttpStatus.BAD_REQUEST)
        }
        
        if(itemDto.option=="ONCE-OFF")
        {
             const check = await this.check_category_existance(invoices,itemDto)
             if(!check){
                 throw new HttpException("Category already added to invoice",HttpStatus.BAD_REQUEST)
             }
        }
      else{            
        const expiry_check = await this.check_expiry_date(itemDto,accountId)
        console.log(expiry_check)
        if(!expiry_check){
            throw new HttpException("A valid certificate for the selected category still exists",HttpStatus.BAD_REQUEST)
        } 

        const filtered = invoices.filter(invoice=>{
             return invoice.status=='PENDING' || invoice.status=='AWAITING'
        })

        const check = await this.check_category_existance(filtered,itemDto)
        if(!check){
            throw new HttpException("Category already added to invoice",HttpStatus.BAD_REQUEST)
        }

        const check_option = await this.check_option(itemDto,invoices)

        if(!check_option){
            throw new HttpException("Settlement option selected is different from one previously selected for category",HttpStatus.BAD_REQUEST)  
        }

        }

        return true
    }
    async check_category_existance(invoices:Supplierinvoice[],itemDto:AddItemDto){

        if(invoices.length>0)
        {
                const record = invoices.filter(invoice=>{
                    return invoice.categoryId ==itemDto.categoryId
                })

                if(record.length>0){
                    return false
                }else{
                    return true
                }
        }else{

            return true
        }
    }

    async check_currency(invoices:Supplierinvoice[],itemDto:AddItemDto){
        const record  = invoices.filter(invoice=>{return invoice.status =='PENDING'})

        if(record.length>0){
          if(record[0].currencyId != itemDto.currencyId){
              return false
          }else{
              return true
          }
        }
      return true
    }

    async check_expiry_date(itemDto:AddItemDto,accountId:number){
          const record =  await Supplier.findOne({where:{accountId:accountId,expire_year:itemDto.regyear,categoryId:itemDto.categoryId},order:{id:'DESC'}})
          if(record){
          const check=  await moment(moment(record.expiry_date).format('YYYY-MM-DD')).isAfter(moment().format('YYYY-MM-DD'))
             return check ? false : check
            }

          return true
    }

    async check_option(addItemDto:AddItemDto,records:Supplierinvoice[]){
        if(records.length>0){
            records.forEach(dt=>{
                if(dt.settlement !=addItemDto.option){
                    return false
                }
            })
        }
    return true
   }


   async charge(addItemDto:AddItemDto,userId:number,accountId:number){
       const account = await Account.findOne({where:{id:accountId}})
       const helperService = new HelperService()
    try {
       const price = await helperService.get_registration_price(account,addItemDto.currencyId)

       const final_price = addItemDto.option=='QUARTERLY' ? Number(price.cost)/4 : price.cost
       const outstanding_registration = await this.check_outstanding_registrations(accountId,addItemDto);
       const total_price = Math.round(Number(final_price) * outstanding_registration)
       const invoicenumber = await helperService.generate_registration_invoice_number(+account.id,addItemDto.regyear)
       const record = await Supplierinvoice.create({invoicenumber:invoicenumber,accountId:account.id,userId:userId,categoryId:addItemDto.categoryId,exchangerateId:price.exchangrerate,currencyId:addItemDto.currencyId,year:addItemDto.regyear.toString(),status:'PENDING',cost:total_price.toString(),settlement:addItemDto.option})
       await Supplierinvoice.save(record)
       return {"status":"success","message":"successfully added item to invoice"}
        
    } catch (error) {
        const message = error.sqlMessage ? error.sqlMessage :  error.message 

        throw new HttpException(message,HttpStatus.BAD_REQUEST)
    }
  


  }

  async check_outstanding_registrations(accountId:number,addItemDto:AddItemDto){
      let outstanding = 1;
      if(addItemDto.option=='QUARTERLY')
      {
    const current_quarter =moment(moment().format('YYYY-MM-DD')).quarter()
    let previous_quarters=[]
    let outstanding_registration =0
    if(current_quarter>1){
        /**
         * 1 Compute expiry dates for previous  quarters
         */
        for (let index = 1; index < current_quarter; index++) {
             const expirationdate = this.getExpiryData(addItemDto.option,index)
            let el ={expiry_date:expirationdate}
            previous_quarters.push(el)            
        }

        /**
         * get regisration records for the previous quarters 
         */
        const reg_records = await Supplier.find({where:{accountId:accountId,expire_year:addItemDto.regyear,categoryId:addItemDto.categoryId,expiry_date:In(previous_quarters)}})
        

        /**
         * count registration records
         */

        const total_registration_records = reg_records.length

        outstanding_registration = ((current_quarter-1)-total_registration_records)+1


    }
    outstanding = outstanding_registration>0 ? outstanding_registration :1
    }
    console.log(outstanding)
    return outstanding
  }

  async getExpiryData(option:string,quarter:number){
    let  year  = moment(moment().format('YYYY-MM-DD')).year()
    let expire_date="";
    if(option=='QUARTERLY'){
     if(quarter==1){
      expire_date = year+"-03-31"
     }else if(quarter==2){
        expire_date=year+"-06-30"
     }else if(quarter==3){
       expire_date=year+"-09-30"
     }else{
      expire_date=year+"-12-31"
     }
    }else{
        expire_date=year+"-12-31"
    }
    return expire_date
   }

   

   
}