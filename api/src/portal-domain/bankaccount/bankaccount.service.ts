import { HttpException, HttpStatus, Injectable, Response } from '@nestjs/common';
import { Bankdetail } from 'src/bankdetails/entities/bankdetail.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateBankAccountDto } from './dto/create-bankaccount.dto';
import { UpdateBankAccountDto } from './dto/update-bankaccount.dto';

@Injectable()
export class BankaccountService {

    async getAccount(userId:number){
        const user = await User.findOne({where:{id:userId},relations:['account']})
        return await Bankdetail.find({where:{accountId:user.accountId}})
    }

    async addAccount(createBankAccountDto:CreateBankAccountDto,userId:number){
        const user = await User.findOne({where:{id:userId}})
        const account = await Bankdetail.findOne({where:{accountId:user.accountId}})
        if(account){
            throw new HttpException("Bank Account already added",HttpStatus.BAD_REQUEST)
        }
        createBankAccountDto.accountId = user.accountId
       const record =  await Bankdetail.create(createBankAccountDto)
       await record.save()

       return {status:"success",message:"Successfully created bank account"}

    }

    async updateAccount(id:number,updateBankAccountDto:UpdateBankAccountDto){
        await  Bankdetail.update(id,updateBankAccountDto)
        return {status:"success",message:"Successfully updated bank account"}
    }
}
