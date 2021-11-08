import { Administrator } from "src/administrator/entities/administrator.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class audit extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    administratorId:number

    @Column()
    entity:string

    @Column({type:"json",nullable:true})
    oldValue:{}

    @Column({type:"json" ,nullable:true})
    newValue:{}
    
    @Column()
    action:string

    @CreateDateColumn()
    created_at:Date

    @ManyToOne(()=>Administrator,administrator=>administrator.trail)
    administrator:Administrator
}