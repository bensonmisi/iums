import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Account } from 'src/accounts/entities/account.entity';
import { HelperService } from 'src/helper/helper.service';
import { DecisionDto } from 'src/manualtransaction/dto/decision.dto';
import { Suspense } from 'src/suspense/entities/suspense.entity';
import { Repository } from 'typeorm';
import { CreateSuspensetransferDto } from './dto/create-suspensetransfer.dto';
import { UpdateSuspensetransferDto } from './dto/update-suspensetransfer.dto';
import { Suspensetransfer } from './entities/suspensetransfer.entity';

@Injectable()
export class SuspensetransfersService {
  constructor(@InjectRepository(Suspensetransfer) private readonly suspensetransferRepository:Repository<Suspensetransfer>,private helperService:HelperService){}
  async create(createSuspensetransferDto: CreateSuspensetransferDto,id:number):Promise<any> {
   try {
     const { suspenseId,destination,amount,otherregnumber} = createSuspensetransferDto
     const balance = await this.helperService.get_suspense_balance_by_id(suspenseId)
     console.log(balance)
     if(balance>0)
     {
       if(balance >= Number(amount))
       {
       
          const suspense = await Suspense.findOne({id:suspenseId})
           console.log(destination)
          if(suspense.accountnumber !== destination)
          {
         /*   let {sum} = await Suspensetransfer.createQueryBuilder("transfers")
                                            .select("SUM(transfers.amount)","sum")
                                            .getRawOne() */

             let to_account_id = suspense.accountId
             if(otherregnumber){
               const account = await Account.findOne({where:{regnumber:otherregnumber}})
               if(!account){
                 throw new HttpException("Destination PRAZ ACCOUNT NOT FOUND",HttpStatus.BAD_REQUEST)
               }else{
                 to_account_id = account.id
               }
             }

             const data = {suspenseId:suspenseId,from_account_id:suspense.accountId,to_account_id:to_account_id,accountnumber:destination,amount:amount,requestedBy:id}

         
          await this.suspensetransferRepository.save(data) 
          return {"status":"success","message":"Request Successfully Save"}
          }else{         
           
            throw new  HttpException("YOU CANNOT TRANSFER INTO THE SAME ACCOUNT",HttpStatus.BAD_REQUEST)
          }
       }
     }else{
      throw new  HttpException("INSUFFICIENT AMOUNT IN SUSPENSE ACCOUNT",HttpStatus.BAD_REQUEST)
     }
   } catch (error) {
      throw new  HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)
   }
  }

  async findAll():Promise<Suspensetransfer[]> {
    return await this.suspensetransferRepository.find({relations:['suspense','requester','actioner','source','destination','processedsuspense']});
  }

  async findOne(id: number):Promise<Suspensetransfer> {
    return await this.suspensetransferRepository.findOne({id:id},{relations:['suspense','requester','actioner','source','destination']})
  }

  async update(id: number, updateSuspensetransferDto: UpdateSuspensetransferDto,requester:number):Promise<any> {
     try {
      const { suspenseId,destination,amount,otherregnumber} = updateSuspensetransferDto
            const record = await this.suspensetransferRepository.findOne(id)
             if(record){
                  if(record.requestedBy == requester){
                          if(record.status =="PENDING"){
                            const suspense = await Suspense.findOne({id:suspenseId})
                            if(suspense.accountnumber !== destination)
                            {
                            let to_account_id = suspense.accountId
                            if(otherregnumber){
                              const account = await Account.findOne({where:{regnumber:otherregnumber}})
                              if(!account){
                                throw new HttpException("Destination PRAZ ACCOUNT NOT FOUND",HttpStatus.BAD_REQUEST)
                              }else{
                                to_account_id = account.id
                              }
                            }
               
                            const data = {suspenseId:suspenseId,from_account_id:suspense.accountId,to_account_id:to_account_id,accountnumber:destination,amount:amount,requestedBy:id}

                               await this.suspensetransferRepository.update(id,data)
                                return {"status":"success","message":"Record successfully updated"}
                          }else{
                            throw new  HttpException('YOU CANNOT TRANSFER INTO THE SAME ACCOUNT',HttpStatus.BAD_REQUEST)
                          }
                           }else{
                            throw new  HttpException("Record does not have PENDING status. Cannot be Editted",HttpStatus.BAD_REQUEST) 
          
                          }
                  }else{
                    throw new  HttpException("Unauthorized to updated record",HttpStatus.BAD_REQUEST) 
                  }
             }else{
               throw new  HttpException("Record not found",HttpStatus.BAD_REQUEST)
             }
     } catch (error) {
      throw new  HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)
     }
  }

  async remove(id: number,requester:number):Promise<any> {
    try {
      const record = await this.suspensetransferRepository.findOne(id)
       if(record){
            if(record.requestedBy == requester){
                    if(record.status =="PENDING"){
                          await this.suspensetransferRepository.delete(id)
                          return {"status":"success","message":"Record successfully deleted"}
                     }else{
                      throw new  HttpException("Record does not have PENDING status. Cannot be Editted",HttpStatus.BAD_REQUEST) 
    
                    }
            }else{
              throw new  HttpException("Unauthorized to updated record",HttpStatus.BAD_REQUEST) 
            }
       }else{
         throw new  HttpException("Record not found",HttpStatus.BAD_REQUEST)
       }
} catch (error) {
throw new  HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)
}
  }

  async decision(decisionDto:DecisionDto,actionId:number):Promise<any>{
   const {id,status,reason} = decisionDto
   let message="";
    const record = await this.suspensetransferRepository.findOne({id:id},{relations:['suspense','requester']})
    if(record)
    {
         /**
          * check if account is pending           *  
          */ 
         
         if(record.status=='PENDING'){
             record.actionedBy = actionId
             if(status=='APPROVED')
             {
            let  balance = await this.helperService.get_suspense_balance_by_id(record.suspenseId)
           if(balance>0 && balance >= Number(record.amount)){
                  
              record.status = status
              await record.save()
              const newrecord = Suspense.create({suspensetransferId:record.id,source:'suspensetransfer',accountId:record.to_account_id,accountnumber:record.accountnumber,currency:record.suspense.currency,amount:record.amount})
              await newrecord.save()
              await this.helperService.get_suspense_balance_by_id(record.suspenseId)         
                

           }else{
            throw new  HttpException("Insufficient amount in suspense wallet",HttpStatus.BAD_REQUEST) 
      
           }
          }else{
            /**
             * if the request has been denied the request status has to change and the requester notified
           */ 

            record.status = status;
            record.reason = reason;
            await record.save()
            let line = ""
              if(reason){
                line =" Because  "+reason
              }
               message = "Dear "+record.requester.name+" "+record.requester.surname+" Your Suspense transfer request has been "+decisionDto.status+" "+line
                    
             
            
          }
          this.helperService.manual_transaction_response_notification(record.requester.username,message)

          return {"status":"success","message":"Decision Successfully Saved"}
         }else{
          throw new  HttpException("Record does not have PENDING status. Cannot be Editted",HttpStatus.BAD_REQUEST) 
          }
    }
    else
    {
      throw new  HttpException("Record not found",HttpStatus.BAD_REQUEST)
    }
  }

  async source_funds(id:number):Promise<any>{
   return await Suspense.findOne({id:id},{relations:['banktransaction','onlinepayment']})   
  }
}
