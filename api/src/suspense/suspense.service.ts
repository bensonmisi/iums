import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { Banktransaction } from 'src/banktransaction/entities/banktransaction.entity';
import { HelperService } from 'src/helper/helper.service';
import { Onlinepayment } from 'src/onlinepayment/entities/onlinepayment.entity';
import { SearchSuspenseDto } from 'src/suspense/dto/searchsuspense.dto';
import { Repository } from 'typeorm';
import { UpdateSuspenseDto } from './dto/update-suspense.dto';
import { Suspense } from './entities/suspense.entity';

@Injectable()
export class SuspenseService {
  constructor(@InjectRepository(Suspense) private readonly suspenseRepository:Repository<Suspense>,private helperService:HelperService){}
  async create(createSuspenseDto: any):Promise<any> {
   try {
      const check = await this.suspenseRepository.findOne({where:{banktransactionId:createSuspenseDto.banktransactionId,source:createSuspenseDto.source}})
       if(!check)
       {
           await this.suspenseRepository.save(createSuspenseDto)
            return {"status":"success","message":"success"}
       }else{
         throw new ForbiddenException("transaction already in the suspense")
       }
   } catch (error) {
      throw new HttpException(error.sqlMessage,HttpStatus.UNAUTHORIZED)
  }
}
 async findAll() {
    const suspenselist=  await this.suspenseRepository.find({where:{status:'PENDING'},relations:['account','receipts','transfers'],order:{id:'DESC'}});
    let array = []
     if(suspenselist.length>0){
      suspenselist.forEach(suspense=>{
         const balance = this.helperService.compute_suspense_balance(suspense)
         const name =  suspense.account ? suspense.account.name :""
         const regnumber = suspense.account ? suspense.account.regnumber :""
         const accountnumber = suspense.accountnumber
         const receipts = suspense.receipts
         const transfers = suspense.transfers 
         const amount = suspense.amount
         const status = suspense.status
         const created_at = suspense.created_at
         const currency = suspense.currency
         const source = suspense.source
         const el={id:suspense.id,name:name,source:source,regnumber:regnumber,accountnumber:accountnumber,currency:currency,status:status,receipts:receipts,transfers:transfers,amount:amount,created_at:created_at,balance:balance}
         array.push(el)
       })
     }
    return array
  }

  async findOne(id: number) {
    const record =   await this.suspenseRepository.findOne({where:{id:id},relations:['account','receipts','transfers']});
    let banktrans
    let onlinepayment
    if(record.source==="banktransactions"){
      const rec = await Banktransaction.findOne({where:{id:record.banktransactionId}})
      if(rec){
        banktrans = rec
      }
    }

    if(record.source ==="ONEMONEY" || record.source==="ECOCASH" || record.source==="PAYNOW"){
      const onl = await Onlinepayment.findOne({where:{id:record.banktransactionId}})
      if(onl){
        onlinepayment = onl
      }
    }

    if(record.source==="suspensetransfer"){
      const suspensetransfer =  await this.suspenseRepository.findOne({where:{id:record.banktransactionId}})
      banktrans = await Banktransaction.findOne({where:{id:suspensetransfer.banktransactionId}})
    }
    
    return {suspense:record,banktransaction:banktrans,onlinepayment:onlinepayment}
  }

  update(id: number, updateSuspenseDto: UpdateSuspenseDto) {
    return `This action updates a #${id} suspense`;
  }

  remove(id: number) {
    return `This action removes a #${id} suspense`;
  }

  async seachBycode(searchsuspenseDto:SearchSuspenseDto):Promise<any>{
    const account = await Account.findOne({where:{regnumber:searchsuspenseDto.regnumber}})
    if(account){
        const suspenseData = await this.suspenseRepository.find({where:{accountId:account.id,status:'PENDING'},relations:['receipts','transfers']})
        if(suspenseData.length>0){
           let suspensearray=[]
            suspenseData.map(suspense=>{   
              const bal = this.helperService.compute_suspense_balance(suspense)  
                    if(bal>0)
                     {   
                     suspensearray.push({id:suspense.id,accountnumber:suspense.accountnumber+"("+suspense.currency+""+bal+")",balance:bal})
                  }
                           
           })
         
          return suspensearray
           
        }else{
          throw new HttpException("NO SUSPENSE BALANCES  FOUND",HttpStatus.BAD_REQUEST)
        }
    }else{
       throw new HttpException("PR NUMBER not found",HttpStatus.BAD_REQUEST)
    }
  }
}
