import { Account } from "src/accounts/entities/account.entity";
import { Currency } from "src/currency/entities/currency.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Bankdetail extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    accountId:number

    @Column()
    name:string

    @Column()
    accountname:string

    @Column()
    currencyId:number

    @Column()
    accountnumber:string

    @Column()
    branch:string

    @Column()
    branchcode:string

    @Column({nullable:true})
    swiftcode:string

    @Column()
    letter:string


    @Column()
    requestedBy:number
    @Column({nullable:true})
    approvedBy:number

    @Column({default:'PENDING'})
    status:string
    
    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @ManyToOne(()=>Currency)
    currency:Currency

    @ManyToOne(()=>Account)
    account:Account
}
