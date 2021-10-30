import { Submodule } from "src/submodule/entities/submodule.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @OneToMany(()=>Submodule,submodule=>submodule.systemmodule,{onDelete:"CASCADE"})
    submodules:Submodule[]
}
