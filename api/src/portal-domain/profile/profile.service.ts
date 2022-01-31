import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { BidderChangePasswordDto } from './dto/change-password.dto';
import { BidderUpdatePersonalDto } from './dto/update-personal.dto';
import * as bcrypt from 'bcrypt'
import { UpdateBidderAccountDto } from './dto/update-bidderaccount.dto';
@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(User) private readonly userRepository:Repository<User>,
        @InjectRepository(Account) private readonly accountRepository:Repository<Account>
    ){}
    
    async getProfile(id:number){
        const user = await this.userRepository.findOne({where:{id:id},relations:['account']})
         return user
    }

    async update(updatePersonalDto:BidderUpdatePersonalDto,userId:number){
        try {
            await this.userRepository.update(userId,updatePersonalDto)
            return {"status":"success","message":"Personal details successfully updated"}        
        } catch (error) {
            let message = error.sqlMessage ? error.sqlMessage : error.message
            throw new HttpException(message,HttpStatus.BAD_REQUEST)
        }
     
    }

    async changepassword(changepasswordDto:BidderChangePasswordDto,userId:number){
        try {
             const user = await this.userRepository.findOne({where:{id:userId}})
             user.password = await bcrypt.hash(changepasswordDto.password,10)
             await user.save()
             return {"status":"success","message":"successfully changed password"}
        } catch (error) {
            let message = error.sqlMessage ? error.sqlMessage : error.message
            throw new HttpException(message,HttpStatus.BAD_REQUEST)   
        }
    }

 async updateAccount(updateBidderAccountDto:UpdateBidderAccountDto,userId:number){
     try {
        const user = await this.userRepository.findOne({where:{id:userId}})
        const account = await Account.findOne({where:{id:user.accountId}})
        if(account){
            let locality = updateBidderAccountDto.country.toUpperCase()=='ZIMBABWE' ? 'LOCAL' :'FOREIGN'
            updateBidderAccountDto.locality = locality
            await Account.update(user.accountId,updateBidderAccountDto)
            return {"status":"success","message":"Successfully Updated Account"}
        } 
     } catch (error) {
        let message = error.sqlMessage ? error.sqlMessage : error.message
        throw new HttpException(message,HttpStatus.BAD_REQUEST)  
     }
 }
}
