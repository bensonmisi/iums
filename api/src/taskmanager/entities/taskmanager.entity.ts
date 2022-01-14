import { Account } from "src/accounts/entities/account.entity";
import { Administrator } from "src/administrator/entities/administrator.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Taskmanager extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    administratorId:number

    @Column()
    identifier:string

    @Column()
    type:string 

    @Column()
    accountId:number

    @Column({default:'PENDING'})
    status:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    

    @ManyToOne(()=>Administrator,{eager:true})
    @JoinColumn({name:'administratorId',referencedColumnName:'id'})
    administrator:Administrator

    @ManyToOne(()=>Account)
    @JoinColumn({name:'accountId',referencedColumnName:'id'})
    account:Account




}
