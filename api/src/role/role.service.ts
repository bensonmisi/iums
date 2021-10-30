import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private roleRepository:Repository<Role>){}
  async create(createRoleDto: CreateRoleDto):Promise<any> {
     try {
         const role = await this.roleRepository.create(createRoleDto)
          await this.roleRepository.save(role)
          return {"status":"success","message":"Role Successfully Created"}
     } catch (error) {
        throw new HttpException(error.sqlMessage,HttpStatus.FORBIDDEN);
        
     }
  }

  async findAll():Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async findOne(id: number):Promise<Role> {
    return await this.roleRepository.findOne(id)
  }

  async update(id: number, updateRoleDto: UpdateRoleDto):Promise<any> {
     try {
       await this.roleRepository.update(id,updateRoleDto) 
       return {"status":"success","message":"Role Successfully Update"}
     } catch ( error) {
      throw new Error(error.sqlMessage);
        
     }
  }

 async remove(id: number):Promise<any> {
    return await this.roleRepository.delete(id);
    return {"status":"success","message":"Role Successfully Deleted"}
  }
}
