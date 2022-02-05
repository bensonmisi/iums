import { Account } from "src/accounts/entities/account.entity";
import { Currency } from "src/currency/entities/currency.entity";
import { Noticefee } from "src/noticefee/entities/noticefee.entity";
import { Receipt } from "src/receipt/entities/receipt.entity";
import { Tenderapplication } from "src/tenderapplication/entities/tenderapplication.entity";
import { Tenderfeetype } from "src/tenderfeetype/entities/tenderfeetype.entity";
import { BaseEntity, Column, CreateDateColumn, Entity,  JoinColumn,  ManyToOne,  OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Tenderinvoice extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:true})
    tenderapplicationId:number
    
    @Column({nullable:true})
    noticefeeId:number   

    @Column()
    accountId:number

    @Column()
    invoicenumber:string

    @Column()
    tendernumber:string
    
    @Column({nullable:true})
    description:string

    @Column({nullable:true})
    tenderfeetypeId:number

    @Column()
    type:string

    @Column()
    currencyId:number

    @Column()
    year:number

    @Column()
    amount:string

    @Column({default:'PENDING'})
    status:string

    @Column()
    procuremententityId:number

    @Column({nullable:true})
    approvedBy:number

    @Column({default:"OT"})
    source:string
    
    @Column({default:0})
    posted:number
    
    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date


    @OneToOne(()=>Tenderapplication,tenderapplication=>tenderapplication.tenderinvoice)
    tenderapplication:Tenderapplication

    @ManyToOne(()=>Noticefee)
    noticefee:Noticefee

    @ManyToOne(()=>Account,account=>account.tenderinvoices)
    account:Account

    @ManyToOne(()=>Currency)
    currency:Currency
    
    @ManyToOne(()=>Tenderfeetype)
    tenderfeetype:Tenderfeetype









}
