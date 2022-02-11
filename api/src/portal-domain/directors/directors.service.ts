import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Directorate } from 'src/directorate/entities/directorate.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';

@Injectable()
export class DirectorsService {
  constructor(@InjectRepository(Directorate) private readonly directorateRepository:Repository<Directorate>){}
  async create(createDirectorDto: CreateDirectorDto,userId:number) {
    const user = await User.findOne({where:{id:userId}})
    createDirectorDto.accountId= user.accountId
    await this.directorateRepository.save(createDirectorDto)
    return {status:"success",message:"Director successfully Created"};
  }

  findAll() {
    return `This action returns all directors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} director`;
  }

 async update(id: number, updateDirectorDto:UpdateDirectorDto,userId:number) {
    try {
      console.log(updateDirectorDto)
      const user = await User.findOne({where:{id:userId}})
      const record = await this.directorateRepository.findOne(id)
      if(record.accountId!==user.accountId){
          throw new HttpException("Unauthorized access",HttpStatus.BAD_REQUEST)
      }
      updateDirectorDto.accountId = user.accountId
      record.accountId = updateDirectorDto.accountId
      record.name = updateDirectorDto.name
      record.gender = updateDirectorDto.gender
      record.idnumber=updateDirectorDto.idnumber
      record.filename = updateDirectorDto.filename
      await record.save()
      return {status:"success",message:"Director successfully Updated"};
    } catch (error) {
      const message = error.sqlMessage ? error.sqlMessage : error.message
      throw new HttpException(message,HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: number,userId:number) {
    try {
      const user = await User.findOne({where:{id:userId}})
      const record = await this.directorateRepository.findOne(id)
      if(record.accountId!==user.accountId){
          throw new HttpException("Unauthorized access",HttpStatus.BAD_REQUEST)
      }
      await this.directorateRepository.delete(id)
      return {status:"success",message:"Director successfully deleted"};
    } catch (error) {
      const message = error.sqlMessage ? error.sqlMessage : error.message
      throw new HttpException(message,HttpStatus.BAD_REQUEST)
    }
  }
}
