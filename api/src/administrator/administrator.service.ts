import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { Administrator } from './entities/administrator.entity';
import { v4 as uuidv4 } from 'uuid';
import { administratorResetToken } from './entities/administratorResetToken.entity';
@Injectable()
export class AdministratorService {
  constructor(@InjectRepository(Administrator) private administratorRepository:Repository<Administrator>,){}
  async create(createAdministratorDto: CreateAdministratorDto):Promise<any> {
    try {
     const user =  await this.administratorRepository.create(createAdministratorDto) 
     await this.administratorRepository.save(user)
     return {"status":"success","message":"Administrator Successfully Created"}
    } catch (error) {
      throw new HttpException(error.error.sqlMessage,HttpStatus.FORBIDDEN)
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
       const resetToken = new administratorResetToken()
       resetToken.administratorId = id
       resetToken.token = await uuidv4()
       resetToken.expire_date = new Date(this.getCurrentDate())
       await resetToken.save()
       /**
        * send reset token  to user email
        */
        return {"status":"success","message":"Administrator Account Successfully Sent to User email"}
    } catch (error) {
      throw new HttpException(error.error.sqlMessage,HttpStatus.FORBIDDEN)
    }
  }
  getCurrentDate(){
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
 const finaldate = year + "-" + month + "-" + date+1;
 return finaldate
  }
}
