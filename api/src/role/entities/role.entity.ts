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

    @OneToMany(()=>Administrator,administrator=>administrator.role)
     administrator:Administrator[]

     /**
      * Roles  can have many modules hence they have a many to many relationship
      */

     @ManyToMany(()=>SystemModule)
     @JoinTable()
     systemmodules:SystemModule[]

     @ManyToMany(()=>Submodule)
     @JoinTable()
     submodules:Submodule[]

     @ManyToMany(()=>Permission)
     @JoinTable()
     premissions:Permission[]
}
