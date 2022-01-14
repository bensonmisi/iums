import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { check } from 'prettier';
import { HelperService } from 'src/helper/helper.service';
import { Receipt } from 'src/receipt/entities/receipt.entity';
import { Repository } from 'typeorm';
import { CreateSupplierinvoiceDto } from './dto/create-supplierinvoice.dto';
import { UpdateSupplierinvoiceDto } from './dto/update-supplierinvoice.dto';
import { Supplierinvoice } from './entities/supplierinvoice.entity';

@Injectable()
export class SupplierinvoiceService {
  constructor(@InjectRepository(Supplierinvoice) private readonly supplierinvoiceRepository:Repository<Supplierinvoice>,private readonly helperService:HelperService){}
  create(createSupplierinvoiceDto: CreateSupplierinvoiceDto) {
    return 'This action adds a new supplierinvoice';
  }

  async findAll():Promise<any> {
    const data =  await this.supplierinvoiceRepository.find({where:{status:'AWAITING'},relations:['account'],order: {created_at: "DESC"}}) 
    let array =[]
     data.forEach(dt=>{
       if(!this.checkarray(array,dt.accountId)){
         array.push({id:dt.id,accountId:dt.accountId,account:dt.account,regnumber:dt.account ? dt.account.regnumber :" NULL",name:dt.account ? dt.account.name :" NULL",created_at:dt.created_at})
       }
     })

     return array
  }

  async findOne(id: number):Promise<any> {
   return await this.supplierinvoiceRepository.find({where:{status:'AWAITING',accountId:id},relations:['account','currency','category'],order: {created_at: "DESC"}}) 
 }

  async checksettlement(invoicenumber:string):Promise<any>{
    const checkinvoice = await this.checkinvoice(invoicenumber)
    if(checkinvoice){
      return {"status":"success","message":"Invoice has been settled successfully"}
    }else{
      throw new HttpException("Invoice has not yet been settled",HttpStatus.BAD_REQUEST)
    }
  }

  async getInvoiceData(invoicenumber:string):Promise<any>{
      return await this.supplierinvoiceRepository.find({where:{status:'AWAITING',invoicenumber:invoicenumber},relations:['account','currency','category']})
  }


  update(id: number, updateSupplierinvoiceDto: UpdateSupplierinvoiceDto) {
    return `This action updates a #${id} supplierinvoice`;
  }

 async remove(id: number):Promise<any> {
      const  invoice = await this.supplierinvoiceRepository.findOne(id)
      const invoicenumber = invoice.invoicenumber
      const invoices = await this.supplierinvoiceRepository.find({where:{invoicenumber:invoice.invoicenumber}})
      const receipts = await Receipt.find({where:{invoicenumber:invoice.invoicenumber}})
      const  checkinvoice = await this.checkinvoice(invoice.invoicenumber)
     
     if(checkinvoice){
       await this.supplierinvoiceRepository.update({invoicenumber:invoice.invoicenumber,status:'AWAITING'},{status:'PAID'})
       return {"status":'success','message':"Invoice alread settled"}
      }else{
       if(invoices.length>1 || receipts.length ==0){
           await this.supplierinvoiceRepository.delete(id)
            
         const  checkinvoice = await this.checkinvoice(invoicenumber)
        
          return {"status":'success','message':"Invoice successfully deleted"}
       }else{
            throw new HttpException("Invoice cannot be deleted",HttpStatus.BAD_REQUEST)        
       }
     }

  }
  checkarray(array,value){
    let  checked = false;
     array.forEach(element => {
         if(element.accountId === value){
           checked = true
         }
     });
     return checked
 }

 async checkinvoice(invoicenumber:string){
  const invoices = await this.supplierinvoiceRepository.find({where:{invoicenumber:invoicenumber}})
  const receipts = await Receipt.find({where:{invoicenumber:invoicenumber}})
   const check = await this.helperService.check_supplier_invoice(invoices,receipts)
    const fin = Promise.resolve(check)
    return fin
 }

 async veriy(invoices:Supplierinvoice[],receipts:Receipt[]){
  const check = await this.helperService.check_supplier_invoice(invoices,receipts)
  return check
 }
}
