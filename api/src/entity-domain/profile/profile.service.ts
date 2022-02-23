import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityUser } from '../entity-user/entities/entity-user.entity';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import * as bcrypt from 'bcrypt'
import { Role } from 'src/role/entities/role.entity';

@Injectable()
export class ProfileService {
constructor(@InjectRepository(EntityUser) private readonly entityUserRepository:Repository<EntityUser>){}

async profile(userId:number){
    const user = await this.entityUserRepository.findOne({where:{id:userId},relations:['procuremententity']})
    if(!user)
    {
        throw new UnauthorizedException("invalid token")
    }
     delete user.password

     const role = await Role.findOne({where:{id:user.roleId},relations:['systemmodules','submodules']})
     const menus = await this.generateMenus(role)
    return {user:user,menus:menus}
    }

async updateProfile(updateProfileDto:UpdateProfileDto,userId:number){
    const user = await this.entityUserRepository.findOne({where:{id:userId}})
    user.name = updateProfileDto.name
    user.surname= updateProfileDto.surname
    user.email = updateProfileDto.email
    user.phonenumber = updateProfileDto.phonenumber
    user.jobtitle = updateProfileDto.jobtitle
    user.title = updateProfileDto.title
    await user.save()
    return {status:"success",message:"Successfully Updated Profile"}
}

async changePassword(changePasswordDto:ChangePasswordDto,userId:number){
    const user = await this.entityUserRepository.findOne({where:{id:userId}})
    const hashPassword = await bcrypt.hash(changePasswordDto.password,10)
    user.password = hashPassword
    await user.save()
    return {status:"success",message:"Successfully Changed Password"}
}

async generateMenus(role:Role){
    let menus =[]
    
    role.systemmodules.forEach(module => {
        let menu = {name:module.name,icon:module.icon,submodules:[]}  
          let submodules=[]
         module.submodules.forEach(submodule=>{
             role.submodules.forEach(sub=>{
                 if(sub.id === submodule.id)
                 {
                submodules.push({name:submodule.name,icon:submodule.icon,url:submodule.url})
                 }
             })
           
         })
         menu.submodules = submodules
         menus.push(menu)
    });

    return menus
}
}
