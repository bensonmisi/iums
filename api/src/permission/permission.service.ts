import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleService } from 'src/role/role.service';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(@InjectRepository(Permission) private permissionResitory:Repository<Permission>,private roleService:RoleService){}
  async create(createPermissionDto: CreatePermissionDto):Promise<any> {
    try {
      const permission= await this.permissionResitory.create(createPermissionDto)
      await this.permissionResitory.save(permission)
      return {"status":"success","message":"Successfully Create Permission"}
    } catch (error) {
       throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)
    }
  
  }

  async findAll(id:string):Promise<Permission[]> {
    return await this.permissionResitory.find({where:{submoduleId:id}});
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

  async assignedByRole(id:number,submoduleId:number):Promise<any>{
    const permissions = await this.permissionResitory.find({where:{submoduleId:submoduleId}})
    const role = await this.roleService.findOne(id)
    let array =[]
    permissions.forEach(permission=>{
      let assigned = false
       role.premissions.forEach(perm=>{
          if(perm.id === permission.id){
              assigned = true
          }
       })
       array.push({id:permission.id,name:permission.name,assigned:assigned})
    })
    return array
  }
}
