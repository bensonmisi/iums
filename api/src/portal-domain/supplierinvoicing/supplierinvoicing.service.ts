import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Currency } from 'src/currency/entities/currency.entity';
import { Receipt } from 'src/receipt/entities/receipt.entity';
import { Registrationoption } from 'src/registrationoption/entities/registrationoption.entity';
import { Registrationperiod } from 'src/registrationperiod/entities/registrationperiod.entity';
import { Supplierinvoice } from 'src/supplierinvoice/entities/supplierinvoice.entity';
import { User } from 'src/user/entities/user.entity';
import { In, MoreThanOrEqual, Repository } from 'typeorm';
import { SupplierInvoicingService } from '../helperService/SupplierInvoicingService';
import { AddItemDto } from './dto/add-item.dto';

@Injectable()
export class SupplierinvoicingService {
    constructor(@InjectRepository(Supplierinvoice) private readonly supplierinvoiceRepository:Repository<Supplierinvoice>){}

    async findAll(userId:number){
        const user = await User.findOne({where:{id:userId}})
        return await this.supplierinvoiceRepository.find({where:{accountId:user.accountId},relations:['category'],order:{id:'DESC'}})
    
    }

    async getPending(userId:number){
        const user = await User.findOne({where:{id:userId}})
        const today = new Date()
        const year = today.getFullYear()
        const invoices =  await this.supplierinvoiceRepository.find({where:{accountId:user.accountId,year:MoreThanOrEqual(year),status:'PENDING'},relations:['category','currency'],order:{id:'DESC'}})
        let receipts =[]
        if(invoices.length>0)
        {
        receipts = await Receipt.find({where:{invoicenumber:invoices[0].invoicenumber}})  
        }

        return {invoices:invoices,receipts:receipts}
  
    }

    async getSettings(userId:number){
        const user = await User.findOne({where:{id:userId},relations:['account']})
        const categories = await Category.find({where:{status:'CREATED'}})
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
     const service = new SupplierInvoicingService()
    const user = await User.findOne({where:{id:userId}})
     return await service.add_item_to_invoice(addItemDto,userId,user.accountId)
   }

   async removeItem(id:number,userId:number){
     const service = new  SupplierInvoicingService()
 return await service.remove_item_from_invoice(id,userId)
       
}

async resetInvoice(invoicenumber:string,userId:number){
    const service = new  SupplierInvoicingService()  
    return await service.reset_invoice(invoicenumber,userId) 
}




}
