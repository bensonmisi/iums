import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(@InjectRepository(Permission) private permissionResitory:Repository<Permission>){}
  async create(createPermissionDto: CreatePermissionDto):Promise<any> {
    try {
      const permission= await this.permissionResitory.create(createPermissionDto)
      await this.permissionResitory.save(permission)
      return {"status":"success","message":"Successfully Create Permission"}
    } catch (error) {
       throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)
    }
  
  }

  async findAll():Promise<Permission[]> {
    return await this.permissionResitory.find();
  }

  async findOne(id: number):Promise<Permission> {
    return await this.permissionResitory.findOne(id);
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto):Promise<any>{
    try {
      await this.permissionResitory.update(id,updatePermissionDto)
      return {"status":"success","message":"Successfully Updated Permission"}
    } catch (error) {
       throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)
    }
  
  }

 async remove(id: number):Promise<any> {
    await this.permissionResitory.delete(id)
    return {"status":"success","message":"Successfully Deleted Permission"}
  }
}
