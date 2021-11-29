import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { HelperService } from 'src/helper/helper.service';
import { SearchSuspenseDto } from 'src/suspense/dto/searchsuspense.dto';
import { Repository } from 'typeorm';
import { CreateSuspenseDto } from './dto/create-suspense.dto';
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
  findAll() {
    return `This action returns all suspense`;
  }

  findOne(id: number) {
    return `This action returns a #${id} suspense`;
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
