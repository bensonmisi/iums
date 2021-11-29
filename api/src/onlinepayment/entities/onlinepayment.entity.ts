import { Account } from "src/accounts/entities/account.entity";
import { Suspense } from "src/suspense/entities/suspense.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Onlinepayment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    invoicenumber:string

    @Column()
    accountId:number

    @Column()
    pollurl:string

    @Column()
    amount:string

    @Column({default:'PAYNOW'})
    mode:string

    @Column({default:'PENDING'})
    status:string

    @Column({default:'SUPPLIER'})
    type:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @ManyToOne(()=>Account,account=>account.onlinepayments)
    account:Account

    @OneToOne(()=>Suspense,suspense=>suspense.onlinepayment)
    suspense:Suspense

}
