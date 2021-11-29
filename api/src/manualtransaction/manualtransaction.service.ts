import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrator } from 'src/administrator/entities/administrator.entity';
import { Banktransaction } from 'src/banktransaction/entities/banktransaction.entity';
import { HelperService } from 'src/helper/helper.service';
import { Repository } from 'typeorm';
import { CreateManualtransactionDto } from './dto/create-manualtransaction.dto';
import { DecisionDto } from './dto/decision.dto';
import { UpdateManualtransactionDto } from './dto/update-manualtransaction.dto';
import { Manualtransaction } from './entities/manualtransaction.entity';

@Injectable()
export class ManualtransactionService {
  constructor(@InjectRepository(Manualtransaction) private readonly manualtransactionRepository:Repository<Manualtransaction>,private readonly helperService:HelperService){}
 async create(createManualtransactionDto: CreateManualtransactionDto,id:number):Promise<any> {
      try {
         const requester = await Administrator.findOne(id)
         await this.manualtransactionRepository.save({requestedBy:id,...createManualtransactionDto})

         const message = requester.surname+" "+requester.name+" has created a new Manual Bank transaction request that requires approval"
         this.helperService.manual_transaction_request_notification(message)
         return {"status":'success','message':'Manual request succesfully created'}
      } catch (error) {
         throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)
      }
  }

  async findAll() {
    return   await this.manualtransactionRepository.find({relations:['requester','approver']})
  }

  async findOne(id: number) {
    return  await this.manualtransactionRepository.findOne({id:id},{relations:['requester','approver']})
  }

  async update(id: number, updateManualtransactionDto: UpdateManualtransactionDto,requester:number) {
     const record = await this.manualtransactionRepository.findOne(id)
     if(record){
           if(record.requestedBy === requester){
                if(record.status ==='PENDING')
                 {
                   await this.manualtransactionRepository.update(id,updateManualtransactionDto)
                   return {"status":'success','message':'Manual request succesfully Updated'}

                 }else{
                  throw new HttpException("Record not in pending statue cannot be updated",HttpStatus.BAD_REQUEST)
                 }
           }else{
            throw new HttpException("Unauthorized to update record",HttpStatus.BAD_REQUEST)
           }
     }else{
       throw new HttpException("record not found",HttpStatus.BAD_REQUEST)
     }
  }

  async remove(id: number,requester:number) {
    const record = await this.manualtransactionRepository.findOne(id)
    if(record){
      console.log(record.requestedBy)
      console.log(requester)
      if(record.requestedBy == requester){
           if(record.status ==='PENDING')
            {
              await this.manualtransactionRepository.delete(id)
              return {"status":'success','message':'Manual request succesfully Deleted'}

            }else{
             throw new HttpException("Record not in pending statue cannot be updated",HttpStatus.BAD_REQUEST)
            }
      }else{
       throw new HttpException("Unauthorized to delete record",HttpStatus.BAD_REQUEST)
      }
}else{
  throw new HttpException("record not found",HttpStatus.BAD_REQUEST)
}
  }

async decision(decisionDto:DecisionDto,adminId:number):Promise<any>{
   const record = await this.manualtransactionRepository.findOne({id:decisionDto.id,status:'PENDING'})
     record.status = decisionDto.status
     record.approvedBy=adminId
     await this.manualtransactionRepository.save(record) 
   if(decisionDto.status==='APPROVED'){
     const created = await Banktransaction.create({bankId:record.bankId,description:record.description,transactionDate:record.transactionDate,referencenumber:record.referencenumber,sourcereference:record.source_reference,statementreference:record.statement_reference,amount:record.amount,accountnumber:record.accountnumber,status:'PENDING',currency:record.currency,adminId:record.requestedBy})
       await  created.save()
    const requester = await Administrator.findOne(record.requestedBy)
    let reason =""
    if(decisionDto.reason){
      reason = "Because "+decisionDto.reason
    }
    const message = "Dear "+requester.name+" "+requester.surname+" Your manual bank transaction request with source reference "+record.source_reference+"  has been "+decisionDto.status+" "+reason
       /**
        * notify requester 
        */

       this.helperService.manual_transaction_response_notification(requester.username,message)

       return {"status":'success','message':'Decision Manual request succesfully Saved'}
    }
}
}
