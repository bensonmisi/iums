import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Role } from 'src/role/entities/role.entity';
import { SystemModule } from 'src/system-modules/entities/system-module.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminmenusService {
    constructor(@InjectRepository(Role) private roleRepository:Repository<Role>){}
    async getMenus(id:number):Promise<any>{
        //const role = await this.roleRepository.findOne({id:id})
                                              
        //return  await this.generateMenus(role)
         const role =  await this.roleRepository.findOne(id,{relations:['systemmodules','submodules']})
         return  await this.generateMenus(role)
    }

    async checkPermission(id:number,name:string){
        const role = await this.roleRepository.findOne({id:id}) 
        let bool = false
        role.premissions.forEach(permission=>{
            if(permission.name === name){
                bool = true
            }
        })
        return bool
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
