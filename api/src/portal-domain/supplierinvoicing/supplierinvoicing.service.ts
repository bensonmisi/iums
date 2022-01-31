import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Currency } from 'src/currency/entities/currency.entity';
import { HelperService } from 'src/helper/helper.service';
import { Registrationoption } from 'src/registrationoption/entities/registrationoption.entity';
import { Registrationperiod } from 'src/registrationperiod/entities/registrationperiod.entity';
import { Supplierinvoice } from 'src/supplierinvoice/entities/supplierinvoice.entity';
import { User } from 'src/user/entities/user.entity';
import { In, MoreThanOrEqual, Repository } from 'typeorm';
import { AddItemDto } from './dto/add-item.dto';
import * as moment from 'moment'
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { Account } from 'src/accounts/entities/account.entity';
import { Receipt } from 'src/receipt/entities/receipt.entity';
import * as PDFDocument from 'pdfkit'

@Injectable()
export class SupplierinvoicingService {
    constructor(@InjectRepository(Supplierinvoice) private readonly supplierinvoiceRepository:Repository<Supplierinvoice>,private readonly helperService:HelperService){}

    async findAll(userId:number){
        const user = await User.findOne({where:{id:userId}})
        return await this.supplierinvoiceRepository.find({where:{accountId:user.accountId},relations:['category'],order:{id:'DESC'}})
    
    }

    async getPending(userId:number){
        const user = await User.findOne({where:{id:userId}})
        const today = new Date()
        const year = today.getFullYear()
        return await this.supplierinvoiceRepository.find({where:{accountId:user.accountId,year:MoreThanOrEqual(year),status:'PENDING'},relations:['category','currency'],order:{id:'DESC'}})
    
    }

    async getSettings(userId:number){
        const user = await User.findOne({where:{id:userId},relations:['account']})
        const categories = await Category.find()
        let options = await Registrationoption.find()
        let currency = await Currency.find()
        if(user.account.locality.toUpperCase()!=='LOCAL'){
           currency = await Currency.find({where:{name:'USD'}})
           options = await Registrationoption.find({where:{name:'ONCE-OFF'}})
        }
       
        const today = new Date()
        const year = today.getFullYear()        
        const periods = await Registrationperiod.find({where:{regyear:MoreThanOrEqual(year)}})
        return {categories,options,periods,currency}
    }

   async addItem(addItemDto:AddItemDto,userId:number){
   
    const user = await User.findOne({where:{id:userId},relations:['account']})
    const record = await this.supplierinvoiceRepository.find({where:{year:addItemDto.regyear,accountId:user.accountId,categoryId:addItemDto.categoryId}})
    const records = await this.supplierinvoiceRepository.find({where:{accountId:user.accountId,year:addItemDto.regyear,status:'PENDING'}})
    const checkcurrency = await this.check_currency(addItemDto,records)
    console.log(checkcurrency)
    if(!checkcurrency){
        throw new HttpException("Cannot add multi-currency items to invoice",HttpStatus.BAD_REQUEST)
    }
    if(addItemDto.option=='ONCE-OFF'){
        return await this.registrtion_once_off(addItemDto,user.id,user.account,record)
    }else{
        return await this.registration_quarterly(addItemDto,user.id,user.account,record)
    }
  
    
   }

   async removeItem(id:number,userId:number){
       
       const user = await User.findOne({where:{id:userId}})
      const invoice = await this.supplierinvoiceRepository.findOne({where:{id:id,accountId:user.accountId}})
      if(invoice){
        const invoices = await this.supplierinvoiceRepository.find({where:{invoicenumber:invoice.invoicenumber}})
        const receipts = await Receipt.find({where:{invoicenumber:invoice.invoicenumber}})
        const check = await this.helperService.check_supplier_invoice(invoices,receipts)
        if(!check){
            await this.supplierinvoiceRepository.delete(id)
        return {"status":"success","message":"Invoice item successfully deleted"}
        }
        
      }
      throw new HttpException("Invoice item not found",HttpStatus.BAD_REQUEST)

   }

 async printInvoice():Promise<Buffer>{
    const pdfBuffer: Buffer = await new Promise(resolve => {
        const doc = new PDFDocument({
          size: 'LETTER',
          bufferPages: true,
        })
  
        // customize your PDF document
        doc.text('hello world', 100, 50)
        doc.end()
  
        const buffer = []
        doc.on('data', buffer.push.bind(buffer))
        doc.on('end', () => {
          const data = Buffer.concat(buffer)
          resolve(data)
        })
      })
  
      return pdfBuffer
 }





   async registrtion_once_off(addItemDto:AddItemDto,userId:number,account:Account,record:Supplierinvoice[]){
    
        let status = true
       record.forEach(dt=>{
           if(dt.settlement==addItemDto.option){
               status =  false
           }
       })

     if(status){
       return await this.charge(addItemDto,1,userId,account)
     }
    throw new HttpException("Category Already added to invoice",HttpStatus.BAD_REQUEST)
   }

   async registration_quarterly(addItemDto:AddItemDto,userId:number,account:Account,records:Supplierinvoice[]){

   const accountId = account.id 
   
    /**
     * checking if there is a pending entry for the selected category
     */
     const check = await this.check_item(addItemDto,records)
     if(!check){
        throw new HttpException("Category already added to invoice ",HttpStatus.BAD_REQUEST)
     }

     /**
     * checking settlement options
     */
     const checkoption = await this.check_option(addItemDto,records)
     if(!checkoption){
        throw new HttpException("Settlement option selected is different from one previously selected for category ",HttpStatus.BAD_REQUEST)   
     }

     
    const current_quarter = moment(moment().format('YYYY-MM-DD')).quarter()
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
         * get regisration records for the previos quarters 
         */
        const reg_records = await Supplier.find({where:{accountId:accountId,expire_year:addItemDto.regyear,categoryId:addItemDto.categoryId,expiry_date:In(previous_quarters)}})
        

        /**
         * count registration records
         */

        const total_registration_records = reg_records.length

        outstanding_registration = (current_quarter-1)-total_registration_records


    }
    const outstanding = outstanding_registration>0 ? outstanding_registration :1

    return await this.charge(addItemDto,outstanding,userId,account)

    




   }

   async charge(addItemDto:AddItemDto,outstanding_registration:number,userId:number,account:Account){
     try {
        const price = await this.helperService.get_registration_price(account,addItemDto.currencyId)

        const final_price = addItemDto.option=='QUARTERLY' ? Number(price.cost)/4 : price.cost
    
        const total_price = Math.round(Number(final_price) * outstanding_registration)
        const invoicenumber = await this.helperService.generate_registration_invoice_number(+account.id,addItemDto.regyear)
        const record = await this.supplierinvoiceRepository.create({invoicenumber:invoicenumber,accountId:account.id,userId:userId,categoryId:addItemDto.categoryId,exchangerateId:price.exchangrerate,currencyId:addItemDto.currencyId,year:addItemDto.regyear.toString(),status:'PENDING',cost:total_price.toString(),settlement:addItemDto.option})
        await this.supplierinvoiceRepository.save(record)
        return {"status":"success","message":"successfully added item to invoice"}
         
     } catch (error) {
         const message = error.sqlMessage ? error.sqlMessage :  error.message 

         throw new HttpException(message,HttpStatus.BAD_REQUEST)
     }
   


   }

 async check_item(addItemDto:AddItemDto,records:Supplierinvoice[]){
       if(records.length>0){
               return false
        
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

 async check_currency(addItemDto:AddItemDto,records:Supplierinvoice[]){
  let status = true 
    if(records.length>0){
        records.forEach(dt=>{
            
            if(dt.currencyId !==addItemDto.currencyId){
               status = false
            }
        })
    }

return status
 }

   async getExpiryData(option:string,quarter:number){
    let  year  = moment(moment().format('YYYY-MM-DD')).year()
    let expire_date="";
    if(option=='QUARTERLY'){
     if(quarter==1){
      expire_date = "31-03-"+year
     }else if(quarter==2){
        expire_date="30-06-"+year
     }else if(quarter==3){
       expire_date="30-09-"+year
     }else{
      expire_date="31-12-"+year
     }
    }else{
      expire_date="31-12-"+year
    }
    return expire_date
   }


}
