import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrator } from 'src/administrator/entities/administrator.entity';
import { administratorResetToken } from 'src/administrator/entities/administratorResetToken.entity';
import { Repository } from 'typeorm';
import { adminpasswordResetDto } from './dto/adminpasswordreset.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AdminpasswordrestService {
    constructor(
        @InjectRepository(administratorResetToken) private resetRepository:Repository<administratorResetToken>,
        @InjectRepository(Administrator) private adminRepository:Repository<Administrator>
        ){}

    async resetPassword(resetPassworddto:adminpasswordResetDto):Promise<any>{
        const {token,username,password} = resetPassworddto
        console.log(token)
        try {
            const user = await this.adminRepository.findOne({where:{username:username}})
            if(user){
               const res = await this.resetRepository.findOne({where:{
                   token:token,
                   administratorId:user.id
               }})
               if(res){
                  user.password = await bcrypt.hash(password,10)
                  user.passwordChange="Y"
                  user.save()
                  return {'status':'success','message':'Password Successfully Reset'} 
               }
               throw new HttpException("Invalid Data Provided",HttpStatus.BAD_REQUEST)
            }
            throw new HttpException("Invalid Data Provided",HttpStatus.BAD_REQUEST)
        } catch (error) {
            throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)  
        }
       
    }
}
