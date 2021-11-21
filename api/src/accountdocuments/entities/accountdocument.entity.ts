import { Account } from "src/accounts/entities/account.entity";
import { Document } from "src/documents/entities/document.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Accountdocument extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    accountId:number

    @Column()
    documentId:number

    @Column()
    administratorId:number

    @Column({default:'PENDING'})
    status:string

    @Column()
    approved_on:Date

    @CreateDateColumn()
    created_at:Date
    
    @UpdateDateColumn()
    updated_at:Date


    @ManyToOne(()=>Account,account=>account.accountdocument)
    @JoinColumn()
    account:Account

    @ManyToOne(()=>Document,document=>document.account)
    @JoinColumn()
    document:Document
}
