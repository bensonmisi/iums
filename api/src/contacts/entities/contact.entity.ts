import { Account } from "src/accounts/entities/account.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Contact extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    accountId:number

    @Column()
    emails:string

    @Column()
    phones:string

    @Column()
    address:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @OneToOne(()=>Account,account=>account.contact)
    @JoinColumn()
    account:Account
}
