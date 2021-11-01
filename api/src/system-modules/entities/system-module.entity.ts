import { Role } from "src/role/entities/role.entity";
import { Submodule } from "src/submodule/entities/submodule.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class SystemModule extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @Column()
    icon:string
    @Column()
    widget:string
    @Column({default:'PENDING'})
    status:string
    @Column()
    description:string
    
    @CreateDateColumn()
    created_at:Date  
    @UpdateDateColumn()
    updated_at:Date

    @OneToMany(()=>Submodule,submodule=>submodule.systemmodule,{onDelete:"CASCADE",eager:true})
    submodules:Submodule[]

    @ManyToMany(()=>Role,role=>role.systemmodules,{cascade:true}) 
    @JoinTable(
        {    
           name: "systemmodules_roles",
           joinColumn: { name: "systemmoduleId", referencedColumnName: "id" },
           inverseJoinColumn: { name: "roleId" }}
           ) 
    role:Role[]
}
