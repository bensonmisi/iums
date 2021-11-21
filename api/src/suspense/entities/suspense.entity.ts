import { Account } from "src/accounts/entities/account.entity";
import { Banktransaction } from "src/banktransaction/entities/banktransaction.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Suspense {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    banktransactionId:number

    @Column()
    source:string

    @Column()
    accountId:number

    @Column()
    accountnumber:string

    @Column()
    currency:string

    @Column()
    amount:string

    @Column({default:"PENDING"})
    status:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @OneToOne(()=>Banktransaction,transaction=>transaction.suspense)
    @JoinColumn()
    transaction:Banktransaction

    @ManyToOne(()=>Account,account=>account.suspense)
    account:Account

}
