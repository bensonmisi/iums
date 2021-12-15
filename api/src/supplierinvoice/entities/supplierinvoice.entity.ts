import { Account } from "src/accounts/entities/account.entity";
import { Category } from "src/categories/entities/category.entity";
import { Currency } from "src/currency/entities/currency.entity";
import { Exchangerate } from "src/exchangerate/entities/exchangerate.entity";
import { Receipt } from "src/receipt/entities/receipt.entity";
import { Registrationperiod } from "src/registrationperiod/entities/registrationperiod.entity";
import { Supplier } from "src/supplier/entities/supplier.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Supplierinvoice extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    invoicenumber:string

    @Column()
    accountId:number

    @Column()
    categoryId:number

    @Column()
    currencyId:number

    @Column()
    exchangerateId:number

    @Column({nullable:true})
    registrationperiodId:number

    @Column()
    year:string

    @Column({default:'PENDING'})
    status:string

    @Column()
    cost:string

    @Column()
    userId:number

    @Column({default:0})
    posted:number

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date


    @ManyToOne(()=>Exchangerate,exchangerate=>exchangerate.supplierinvoice)
    exchangerate:Exchangerate

    @ManyToOne(()=>Currency,currency=>currency.supplierinvoice)
    currency:Currency

    @ManyToOne(()=>Registrationperiod,registrationperiod=>registrationperiod.supplierinvoice)
    registrationperiod:Registrationperiod

    @ManyToOne(()=>Category,category=>category.supplierinvoice) 
    category:Category

    @ManyToOne(()=>Account,account=>account.supplierinvoice)
    account:Account

    @OneToMany(()=>Receipt,receipt=>receipt.invoicenumber)
    receipts:Receipt[]
}
