import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/permission/entities/permission.entity';
import { Submodule } from 'src/submodule/entities/submodule.entity';
import { SystemModule } from 'src/system-modules/entities/system-module.entity';
import { Repository } from 'typeorm';
import { AssignModuleDto } from './dto/assign-module.dto';
import { AssignPermissionDto } from './dto/assign-permission.dto';
import { AssignSubmoduleDto } from './dto/assign-submodule.dto';
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
    return await this.roleRepository.findOne(id,{relations:['systemmodules','submodules']})
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
     await this.roleRepository.delete(id);
    return {"status":"success","message":"Role Successfully Deleted"}
  }

  

  async assignsystemmodule(assignmoduleDto:AssignModuleDto):Promise<any>{
    try
    {
    const {roleId,systemmoduleId} = assignmoduleDto
    const role = await this.roleRepository.findOne({id:roleId},{relations:['systemmodules']})
    const module = await SystemModule.findOne({id:systemmoduleId})   
    role.systemmodules.push(module)
   await this.roleRepository.save(role)
    return {"status":"success","message":"Role Successfully Assigned Module "+module.name}
  }catch(error){
    console.log(error)
    throw new HttpException("Failed To assign Submodule",HttpStatus.BAD_REQUEST)
  }
  }

  async unassignsystemmodule(assignmoduleDto:AssignModuleDto):Promise<any>{
    try
    {
    const {roleId,systemmoduleId} = assignmoduleDto
    const systemmodule = await SystemModule.findOne({id:systemmoduleId})
    const role = await this.roleRepository.findOne({id:roleId},{relations:['systemmodules']})
    role.systemmodules = role.systemmodules.filter(module=>{return module.id !== systemmodule.id})
    await this.roleRepository.save(role)
    return {"status":"success","message":"Module  Successfully Unassigned Module "}
  }catch(error){
    console.log(error)
    throw new HttpException("Failed To unassign Submodule",HttpStatus.BAD_REQUEST)
  }

  }
  async assignsubmodule(assignsubmoduleDto:AssignSubmoduleDto):Promise<any>{
    const {roleId,submoduleId} = assignsubmoduleDto
    try
    {
    const role = await this.roleRepository.findOne({id:roleId},{relations:['submodules']})
    const module = await Submodule.findOne({id:submoduleId})
    role.submodules.push(module)
    await role.save()
    return {"status":"success","message":"Role Successfully Assigned SubModule "+module.name}
    }catch(error){
      console.log(error)
      throw new HttpException("Failed To assign Submodule",HttpStatus.BAD_REQUEST)
    }
  }

  async unassignsubmodule(assignsubmoduleDto:AssignSubmoduleDto):Promise<any>{
    const {roleId,submoduleId} = assignsubmoduleDto
    try
    {
    const submodule = await Submodule.findOne({id:submoduleId})
    const role = await this.roleRepository.findOne({id:roleId},{relations:['submodules']})
    role.submodules = role.submodules.filter(module=>{return module.id !== submodule.id})
    await this.roleRepository.save(role)
    return {"status":"success","message":"Module  Successfully Unassigned Submodule "}
  }catch(error){
    console.log(error)
    throw new HttpException("Failed To assign Unsubmodule",HttpStatus.BAD_REQUEST)
  }


  }
  async assignpermission(assignPermissionDto:AssignPermissionDto):Promise<any>{
    const {roleId,permissionId} = assignPermissionDto
    try
    {
    const role = await this.roleRepository.findOne({id:roleId},{relations:['premissions']})
    const permission = await Permission.findOne({id:permissionId})
    role.premissions.push(permission)
    await role.save()
    return {"status":"success","message":"Role Successfully Assigned Permission"+permission.name}
  }catch(error){
    console.log(error)
    throw new HttpException("Failed To assign Permission",HttpStatus.BAD_REQUEST)
  }
  }

  async unassignpermission(assignPermissionDto:AssignPermissionDto):Promise<any>{
    const {roleId,permissionId} = assignPermissionDto
    try
    {
    const permissiondt = await Permission.findOne({id:permissionId})
    const role = await this.roleRepository.findOne({id:roleId},{relations:['premissions']})
    role.premissions = role.premissions.filter(permission=>{return permission.id !== permissiondt.id})
    await this.roleRepository.save(role)
    return {"status":"success","message":"Role  Successfully Unassigned Permission "}
  }catch(error){
    console.log(error)
    throw new HttpException("Failed To unassign Permission",HttpStatus.BAD_REQUEST)
  }

  }
}
