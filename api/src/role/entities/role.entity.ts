import Module from "module";
import { Administrator } from "src/administrator/entities/administrator.entity";
import { Permission } from "src/permission/entities/permission.entity";
import { Submodule } from "src/submodule/entities/submodule.entity";
import { SystemModule } from "src/system-modules/entities/system-module.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id:number
    @Column({unique:true})
    name:string
    @CreateDateColumn()
    created_at:Date
    @UpdateDateColumn()
    updated_at:Date

    /**
     * A role has many Administrators
     */

    @OneToMany(()=>Administrator,administrator=>administrator.role,{onDelete:'SET NULL'})
     administrator:Administrator[]

     /**
      * Roles  can have many modules hence they have a many to many relationship
      */

     @ManyToMany(()=>SystemModule,systemmodule=>systemmodule.role,{eager:true})     
     systemmodules:SystemModule[]

     @ManyToMany(()=>Submodule,submodule=>submodule.role,{eager:true})
     submodules:Submodule[]

     @ManyToMany(()=>Permission,permission=>permission.role,{eager:true})     
     premissions:Permission[]
}
