import { Account } from "src/accounts/entities/account.entity";
import { Document } from "src/documents/entities/document.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Suppliertype extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string 

    @Column({type:'text'})
    allowed_categories:string

    @CreateDateColumn()
    created_at:Date
    @UpdateDateColumn()
    updated_at:Date

    @OneToMany(()=>Document,document=>document.suppliertype)
    documents:Document[]
     
    @OneToMany(()=>Account,account=>account.suppliertype)
    accounts:Account[]
}
