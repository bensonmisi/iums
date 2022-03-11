import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { Administrator } from './entities/administrator.entity';
import { v4 as uuidv4 } from 'uuid';
import { administratorResetToken } from './entities/administratorResetToken.entity';
import { MailService } from 'src/mail/mail.service';
@Injectable()
export class AdministratorService {
  constructor(@InjectRepository(Administrator) private administratorRepository:Repository<Administrator>,private mailService:MailService){}
  async create(createAdministratorDto: CreateAdministratorDto):Promise<any> {
    try {
      const {name,surname,email,username,roleId} = createAdministratorDto
      const password = await this.getRandomPassword(999999999)
     const user =  await this.administratorRepository.create({name:name,surname:surname,email:email,username:username,roleId:roleId,password:password.toString()}) 
     await this.administratorRepository.save(user)
     /**
      * save to audit
      */
    // const data = {name:name,surname:surname,email:email,username:username,roleId:roleId}
      //await this.auditService.create(id,JSON.parse(""),data,"administrator","CREATE")
     await this.mailService.SendAdministratorPassword(user,password.toString(),username)
     return {"status":"success","message":"Administrator Successfully Created"}
    } catch (error) {
      throw new HttpException(error.sqlMessage,HttpStatus.FORBIDDEN)
    }
  }

 async  findAll():Promise<Administrator[]> {
    return await this.administratorRepository.find();
  }

  async findOne(id: number):Promise<Administrator> {
    return await this.administratorRepository.findOne(id);
  }

 async update(id: number, updateAdministratorDto: UpdateAdministratorDto):Promise<any> {
   try {
    await this.administratorRepository.update(id,updateAdministratorDto)
    return {"status":"success","message":"Administrator Successfully Updated"}
   } catch (error) {
    throw new HttpException(error.error.sqlMessage,HttpStatus.FORBIDDEN)
   }
    
  }

  async changestatus(id: number,status:string):Promise<any> {
   try {
      const user = await this.administratorRepository.findOne(id)
      user.status = status
      await user.save()
      return {"status":"success","message":"Administrator Status Successfully Changed to: "+status}
   } catch ( error) {
    throw new HttpException(error.error.sqlMessage,HttpStatus.FORBIDDEN)
   }
  }

  async resetPassword(id:number):Promise<any>{
    try {
        const user = await this.administratorRepository.findOne(id)
        const token =  await uuidv4()
       const resetToken = new administratorResetToken()
       const date =  await this.getCurrentDate()
       console.log(date)
       resetToken.administratorId = user.id
       resetToken.token = token
       resetToken.expire_date = new Date(date)
       await resetToken.save()
       /**
        * send reset token  to user email
        */
         await this.mailService.SendAdministratorPasswordReset(user,token)
        return {"status":"success","message":"Administrator Account Successfully Sent to User email"}
    } catch (error) {
      throw new HttpException(error.sqlMessage,HttpStatus.FORBIDDEN)
    }
  }
  async getUserById(id:number):Promise<Administrator>{
    return await this.administratorRepository.findOne({id:id})
  }
  async showUserById(id:number):Promise<Administrator>{
      const user = await this.administratorRepository.findOne({id:id})
   if(!user){
     throw new HttpException("User not found",HttpStatus.BAD_REQUEST)
   }
      delete user.password
 
      return user
  }

  async findByUsername(username:string):Promise<Administrator>{
    return await this.administratorRepository.findOne({username:username})
  }

async getRandomPassword(max) {
    return await Math.floor(Math.random() * Math.floor(max));
  }
  async getCurrentDate(){
    let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// current hours
let hours = date_ob.getHours();

// current minutes
let minutes = date_ob.getMinutes();

// current seconds
let seconds = date_ob.getSeconds();

// prints date in YYYY-MM-DD format
 const finaldate = year + "-" + month + "-" + date;
 return finaldate
  }
}
