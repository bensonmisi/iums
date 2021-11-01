import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/role/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminmenusService {
    constructor(@InjectRepository(Role) private roleRepository:Repository<Role>){}
    async getMenus(id:number){
        const role = await this.roleRepository.findOne({id:id})
        return  this.generateMenus(role)
    }

    async checkPermission(id:number,name:string){
        const role = await this.roleRepository.findOne({id:id}) 
        role.premissions.forEach(permission=>{
            if(permission.name === name){
                return true
            }
        })
        return false
    }

     generateMenus(role:Role){
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
