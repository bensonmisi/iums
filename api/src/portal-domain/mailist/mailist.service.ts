import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mailinglist } from 'src/mailinglist/entities/mailinglist.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateMailistDto } from './dto/create-mailist.dto';
import { UpdateMailistDto } from './dto/update-mailist.dto';

@Injectable()
export class MailistService {
  constructor(@InjectRepository(Mailinglist) private readonly mailinglistRepository:Repository<Mailinglist>){}
  async create(createMailistDto: CreateMailistDto,userId:number) {
    try {
      const user = await User.findOne({where:{id:userId}})
      createMailistDto.accountId = user.accountId
      await this.mailinglistRepository.save(createMailistDto)
      return {status:"success",message:"Email successfully added to mail list"}
    } catch (error) {
       const message = error.sqlMessage ? error.sqlMessage : error.message
       throw new HttpException(message,HttpStatus.BAD_REQUEST)
    }
   
  }



  async update(id: number, updateMailistDto: UpdateMailistDto,userId:number) {
    try {
      const user = await User.findOne({where:{id:userId}})
      const record = await this.mailinglistRepository.findOne({where:{id:id}})
       if(record.accountId != user.accountId){
         throw new HttpException("Unauthorized to perform action",HttpStatus.BAD_REQUEST)
       }
       record.email = updateMailistDto.email
       await record.save()
      return {status:"success",message:"Email successfully Updated"}
    } catch (error) {
       const message = error.sqlMessage ? error.sqlMessage : error.message
       throw new HttpException(message,HttpStatus.BAD_REQUEST)
    }
  }

 async remove(id: number,userId:number) {
    try {
      const user = await User.findOne({where:{id:userId}})
      const record = await this.mailinglistRepository.findOne({where:{id:id}})
       if(record.accountId != user.accountId){
         throw new HttpException("Unauthorized to perform action",HttpStatus.BAD_REQUEST)
       }
      await this.mailinglistRepository.delete(id)
      return {status:"success",message:"Email successfully deleted"}
    } catch (error) {
       const message = error.sqlMessage ? error.sqlMessage : error.message
       throw new HttpException(message,HttpStatus.BAD_REQUEST)
    }
  }
}
