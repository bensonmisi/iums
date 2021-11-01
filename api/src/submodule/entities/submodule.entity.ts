import { Permission } from "src/permission/entities/permission.entity";
import { Role } from "src/role/entities/role.entity";
import { SystemModule } from "src/system-modules/entities/system-module.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Submodule extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    systemmoduleId:number
    @Column()
    name:string
    @Column()
    icon:string
    @Column({unique:true}) 
    url:string
    @CreateDateColumn()
    created_at:Date
    @UpdateDateColumn()
    updated_at:Date

    @ManyToMany(()=>Role,role=>role.submodules,{cascade:true})
    @JoinTable(
        {    
           name: "submodules_roles",
           joinColumn: { name: "submoduleId", referencedColumnName: "id" },
           inverseJoinColumn: { name: "roleId" }}
           ) 
    role:Role[]

    @ManyToOne(()=>SystemModule,systemmodule=>systemmodule.submodules)
    systemmodule:SystemModule

    @OneToMany(()=>Permission,permission=>permission.submodule,{onDelete:'CASCADE',eager:true})
    permission:Permission[]


}
