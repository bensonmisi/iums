import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSystemModuleDto } from './dto/create-system-module.dto';
import { UpdateSystemModuleDto } from './dto/update-system-module.dto';
import { SystemModule } from './entities/system-module.entity';

@Injectable()
export class SystemModulesService {
  constructor(@InjectRepository(SystemModule) private systemmoduleRepository:Repository<SystemModule>){}
  async create(createSystemModuleDto: CreateSystemModuleDto):Promise<any> {
     try {
       const systemmodule = await this.systemmoduleRepository.create(createSystemModuleDto)
       await this.systemmoduleRepository.save(systemmodule)
       return {"status":"success","message":"System Module Successfully Saved"}
     } catch (error) {
       throw new Error(error.sqlMessage);        
     }
  }

  async findAll():Promise<SystemModule[]> {
    return await this.systemmoduleRepository.find();
  }

  async findOne(id: number):Promise<SystemModule> {
    return await this.systemmoduleRepository.findOne(id);
  }

  async update(id: number, updateSystemModuleDto: UpdateSystemModuleDto):Promise<any> {
    try {
      await this.systemmoduleRepository.update(id,updateSystemModuleDto);
      return {"status":"success","message":"System Module Successfully Updated"}
    } catch (error) {
      throw new Error(error.sqlMessage); 
    }
     
  }

  async remove(id: number):Promise<any> {
    try {
      await this.systemmoduleRepository.delete(id);
      return {"status":"success","message":"System Module Successfully Deleted"}
    } catch (error) {
      throw new Error(error.sqlMessage); 
    }
   
  }
}
