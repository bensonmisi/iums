import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubmoduleDto } from './dto/create-submodule.dto';
import { UpdateSubmoduleDto } from './dto/update-submodule.dto';
import { Submodule } from './entities/submodule.entity';

@Injectable()
export class SubmoduleService {
  constructor(@InjectRepository(Submodule) private submoduleRepository:Repository<Submodule>){}
  async create(createSubmoduleDto: CreateSubmoduleDto):Promise<any> {
    try {
      const submodule = await this.submoduleRepository.create(createSubmoduleDto)
      await this.submoduleRepository.save(submodule)
      return {"status":"success","message":"Submodule Successfully Created"}
    } catch (error) {
      throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST);
      
    }
  }

  async findAll():Promise<Submodule[]> {
    return await this.submoduleRepository.find()
  }

  async findOne(id: number):Promise<Submodule> {
    return await this.submoduleRepository.findOne(id);
  }

  async update(id: number, updateSubmoduleDto: UpdateSubmoduleDto):Promise<any> {
   try {
      await this.submoduleRepository.update(id,updateSubmoduleDto) 
      return {"status":"success","message":"Submodule Successfully Updated"} 
   } catch (error) {
     throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)
     
   }
  }

  async remove(id: number):Promise<any> {
    try {
      await this.submoduleRepository.delete(id)
      return {"status":"success","message":"Submodule Successfully Deleted"} 
    } catch (error) {
      throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)
    }
   
  }
}
