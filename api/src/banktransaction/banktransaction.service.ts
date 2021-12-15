import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from "typeorm";
import { AccountsService } from 'src/accounts/accounts.service';
import { BankService } from 'src/bank/bank.service';
import { SuspenseService } from 'src/suspense/suspense.service';
import { Raw, Repository } from 'typeorm';
import { PostTransactionDto } from './dto/posttransaction.dto';
import { SearchDto } from './dto/search.dto';
import { Banktransaction } from './entities/banktransaction.entity';
import { Account } from 'src/accounts/entities/account.entity';
import { Rtg } from 'src/rtgs/entities/rtg.entity';
import { Suspense } from 'src/suspense/entities/suspense.entity';

@Injectable()
export class BanktransactionService {
    constructor(@InjectRepository(Banktransaction) private readonly banktransactionRepository:Repository<Banktransaction>,
    private bankService:BankService,
    private accountService:AccountsService,
    private suspenseService:SuspenseService){}

    async getCurrenct():Promise<Banktransaction[]>{
      return await this.banktransactionRepository.find({
        relations:['account'],where:{
        created_at: Raw((alias) => `${alias}  >= CURDATE()`),
      }})   
    }

    
    async search(searchDto:SearchDto):Promise<Banktransaction[]>{
      let descriptionquery ={}
      let sourcereferencequery ={}
      let statementreferencequery ={}
      let datequery={}
      let accountnumberquery ={}
      let currencyquery ={}
      let defaultquery ={}
  
      if(searchDto.description){
        descriptionquery = Object.assign({description: Like("%"+searchDto.description+"%")})
       }
      if(searchDto.sourcereference){
       sourcereferencequery = Object.assign({sourcereference:searchDto.sourcereference})
      }
      if(searchDto.fromdate && searchDto.todate ){
       datequery=Object.assign({ created_at:  Raw((alias) => `${alias} BETWEEN :date AND :date2 `, { date: searchDto.fromdate,date2:searchDto.todate })})
      }
      if(searchDto.statementreference){
       statementreferencequery = Object.assign({statementreference:searchDto.statementreference})
      }
      if(searchDto.accountnumber){
        accountnumberquery = Object.assign({accountnumber:searchDto.accountnumber})
       }

       if(searchDto.currency){
         currencyquery = Object.assign({currency:searchDto.currency})
       }
  
        if(!descriptionquery && !sourcereferencequery && !datequery && !statementreferencequery && !accountnumberquery && !currencyquery)
        {
      defaultquery = Object.assign({created_at: Raw((alias) => `${alias}  >= CURDATE()`)})
        }
      const query = {
        ...descriptionquery,
        ...sourcereferencequery,
        ...datequery,
        ...statementreferencequery,
        ...accountnumberquery,
        ...currencyquery,
        ...defaultquery
      }
    

      return await this.banktransactionRepository.find({where:query,relations:['account','bank']})
    }

  async create(posttransactionDto:PostTransactionDto):Promise<any>{
    const {authcode,description,trans_date,referencenumber,source_reference,statement_reference,amount,accountnumber,currency} = posttransactionDto

      /**
       * check  if the  bank
       */
      const bank = await this.bankService.searchByauthCode(authcode)
   
      if(bank){
           let status ="Pending"
           let customer_number = "";
           let accountId=0
           /**
            * check if  client enter PRAZ Number of description 
            */
           const account  = await this.accountService.searchByDescription(description);
           if(account){
             status ="CLAIMED"
             customer_number = account.regnumber
             accountId = account.id
           }
           /**
            * save this transaction to  bank transaction repository
            */
           try {
            const banktransaction = await this.banktransactionRepository.save({bankId:bank.id,
                                                                              description:description,
                                                                              transactionDate:trans_date,
                                                                              referencenumber:referencenumber,
                                                                              sourcereference:source_reference,
                                                                              statementreference:statement_reference,
                                                                              regnumber:customer_number,
                                                                              account:account,
                                                                              amount:amount,
                                                                              accountnumber:accountnumber,
                                                                              currency:currency,
                                                                              status:status})
            if(banktransaction && status === 'CLAIMED'){
              /**
               * if an account is identified from the description  a suspense entry is created
               */
              await this.suspenseService.create({banktransactionId:banktransaction.id,source:"banktransactions",accountId:account.id,accountnumber:accountnumber,currency:currency,amount:amount})
           
              /**
               * notify client payment has been receive
               */


           
           
            }
            return {'status':'success','description':'Reference number saved','code':200}; 
           } catch (error) {
            return{'status':'error','description':error.sqlMessage,'code':200}
           }
         
      }else{
        throw new UnauthorizedException({message:'Unauthorized to post transaction',status:HttpStatus.UNAUTHORIZED})
      }
  }

  async claim(data:any){
    const record = await  this.banktransactionRepository.findOne({where:{id:data.id,status:'PENDING'}})
    if(record){
        const account = await Account.findOne(data.accountId)
        record.regnumber = account.regnumber
        record.status='CLAIMED'
        await record.save() 

      const suspenserecord =   await Suspense.create({banktransactionId:record.id,source:"banktransactions",accountId:account.id,accountnumber:record.accountnumber,currency:record.currency,amount:record.amount})
      const suspense =  await Suspense.save(suspenserecord)
      const rtgs = await Rtg.findOne({where:{id:data.rtgsId}})
      rtgs.suspenseId = suspense.id
      rtgs.status="APPROVED"
      await rtgs.save()

      return {'status':'success','message':'Transaction successfully claimed'}
      
    }else{
      return {'status':'error','message':'Transaction Not Found'}
    }
    
    
  }


 
}
