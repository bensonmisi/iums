import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { type } from 'os';
import { Bidbondthreshold } from 'src/bidbondthreshold/entities/bidbondthreshold.entity';
import { HelperService } from 'src/helper/helper.service';
import { Receipt } from 'src/receipt/entities/receipt.entity';
import { Tenderapplication } from 'src/tenderapplication/entities/tenderapplication.entity';
import { Tenderfeetype } from 'src/tenderfeetype/entities/tenderfeetype.entity';
import { In, Not, Repository } from 'typeorm';
import { CreateTenderinvoiceDto } from './dto/create-tenderinvoice.dto';
import { UpdateTenderinvoiceDto } from './dto/update-tenderinvoice.dto';
import { Tenderinvoice } from './entities/tenderinvoice.entity';

@Injectable()
export class TenderinvoiceService {
  constructor(@InjectRepository(Tenderinvoice) private readonly tenderinvoiceRepository:Repository<Tenderinvoice>,private helperService:HelperService){}
  create(createTenderinvoiceDto: CreateTenderinvoiceDto) {
    return 'This action adds a new tenderinvoice';
  }

  async findAll(): Promise<any> {
    const data =  await this.tenderinvoiceRepository.find({where:{status:'AWAITING'},relations:['account'],order: {created_at: "DESC"}}) 
    let array =[]
     data.forEach(dt=>{
       if(!this.checkarray(array,dt.accountId)){
         array.push({id:dt.id,accountId:dt.accountId,account:dt.account,regnumber:dt.account ? dt.account.regnumber :" NULL",name:dt.account ? dt.account.name :" NULL",created_at:dt.created_at})
       }
     })

     return array
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
 async findOne(id: number):Promise<any> {
   return  await this.tenderinvoiceRepository.find({where:{accountId:id,status:'AWAITING'},relations:['currency']})
      
  }

  async getInvoiceData(id:number):Promise<any>{

       const invoice = await this.tenderinvoiceRepository.findOne({where:{id:id},relations:['tenderfeetype','currency']})
       if(invoice)
        {
 
           const requiredId = invoice.tenderfeetype.required
           let requiredfee = null
           let requiredapplication = null
            if(requiredId){
                requiredfee = await Tenderfeetype.findOne({where:{id:requiredId}})
                requiredapplication =  await Tenderapplication.find({where:{accountId:invoice.accountId,tendernumber:invoice.tendernumber,tenderfeetypeId:requiredId},relations:['currency','tenderfeetype']})
            }
            
           const tenderapplication = await Tenderapplication.find({where:{accountId:invoice.accountId,tendernumber:invoice.tendernumber,type:invoice.description},relations:['currency','tenderfeetype']})
           const receipts = await Receipt.find({where:{invoicenumber:invoice.invoicenumber}})
          
         return{tenderapplication:tenderapplication,invoice:invoice,receipts:receipts,requiredfee:requiredfee,requiredapplication:requiredapplication}
        }else{
          throw new HttpException("Tender Invoice Not Found",HttpStatus.BAD_REQUEST)
        }



  }

  

  update(id: number, updateTenderinvoiceDto: UpdateTenderinvoiceDto) {
    return `This action updates a #${id} tenderinvoice`;
  }
  
  async remove(id: number) {
    const record = await this.tenderinvoiceRepository.findOne(id)
     if(record.tenderapplicationId){
       const application = await Tenderapplication.findOne({where:{id:record.tenderapplicationId}})
       application.status="CANCELLED"
       await application.save()
     }
  record.status = "CANCELLED"
  record.save()
  return {"status":"success","message":"Invoice Successfully Cancelled"}

  }


}
