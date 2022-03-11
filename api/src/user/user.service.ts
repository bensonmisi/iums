import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository:Repository<User>,private readonly mailService:MailService){}
  async create(createUserDto: CreateUserDto):Promise<any> {
   try {
     const random = await this.getRandomPassword(999999999)
     const password = "temp"+random 
     createUserDto.password = password
     createUserDto.roleId=13
     createUserDto.username= createUserDto.email
     const {resetpassword, ...rest} = createUserDto
      const user = await this.userRepository.save(rest)
      this.mailService.SendUserPassword(user,password,createUserDto.email)
      return {"status":"success","message":"User successfully Created"}
   } catch (error) {
    throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST);
   }
  }

  findAll() {
    return `This action returns all user`;
  }

  
   async findbyemail(email:string){
     return await this.userRepository.findOne({where:{email:email}})
   }
  async findOne(id: number) {
    return  await this.userRepository.findOne({where:{id:id}})
  }

  async update(id: number, updateUserDto: UpdateUserDto):Promise<any> {
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
       console.log(error);       
      throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST);
     }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async getRandomPassword(max) {
    return await Math.floor(Math.random() * Math.floor(max));
  }
}
 