import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateBidderUsersDto } from './dto/create-users.dto';
import { UpdateBidderUsersDto } from './dto/update-users.dto';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private readonly userRepository:Repository<User>,private readonly mailService:MailService){}

    async findAll(userId:number){
        const user  = await User.findOne({where:{id:userId}})
        return await this.userRepository.find({where:{accountId:user.accountId}})
    }

    async create(createUserDto:CreateBidderUsersDto,userId:number){
        try {
            const currentuser = await User.findOne({where:{id:userId}})
            const random = await this.getRandomPassword(999999999)
            const password = "temp"+random
            createUserDto.password = password
            createUserDto.roleId=13
            createUserDto.accountId = currentuser.accountId
            createUserDto.username= createUserDto.email
            const {resetpassword, ...rest} = createUserDto
             const user = await this.userRepository.save(rest)
             this.mailService.SendUserPassword(user,password,createUserDto.email)
             return {"status":"success","message":"User successfully Created"}
          } catch (error) {
              const message = error.sqlMessage ? error.sqlMessage : 'An error has occurred please try again'
           throw new HttpException(message,HttpStatus.BAD_REQUEST);
          }
    }
    async update(id:number,updateUserDto:UpdateBidderUsersDto,userId:number){
        try {
            const random = await this.getRandomPassword(999999999)
            const password = "temp"+random
            const {resetpassword, ...rest} = updateUserDto
              if(resetpassword){ 
                updateUserDto.password = password
              }
             await this.userRepository.update(id,rest)
             const user = await this.userRepository.findOne(id)
              this.mailService.SendUserPassword(user,password,user.email)
              return {"status":"success","message":"User successfully Updated"}
           } catch (error) { 
                   
            throw new HttpException('An error has occured',HttpStatus.BAD_REQUEST);
           } 
    }

    async remove(id:number,userId:number)
    {
      try {
          if(id==userId){
              throw new HttpException("Use cannot delete your own account",HttpStatus.BAD_REQUEST)
          }
         const currentuser = await User.findOne({where:{id:userId}}) 
         const user = await User.findOne({where:{id:id}})
         if(user.accountId == currentuser.accountId)
         {
           await User.delete({id:id})
           return {status:"success",message:"User successfully deleted"}
         }
         throw new HttpException('Unauthorized',HttpStatus.BAD_REQUEST); 
      } catch (error) {
        throw new HttpException('An error has occured',HttpStatus.BAD_REQUEST); 
      }
    }


    async getRandomPassword(max) {
        return await Math.floor(Math.random() * Math.floor(max));
      }
}
