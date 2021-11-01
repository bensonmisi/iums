import { Permission } from "src/permission/entities/permission.entity";
import { SystemModule } from "src/system-modules/entities/system-module.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @ManyToOne(()=>SystemModule,systemmodule=>systemmodule.submodules)
    systemmodule:SystemModule

    @OneToMany(()=>Permission,permission=>permission.submodule,{onDelete:'CASCADE'})
    permission:Permission[]


}
