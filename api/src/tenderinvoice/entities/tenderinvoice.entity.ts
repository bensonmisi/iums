import { Account } from "src/accounts/entities/account.entity";
import { Currency } from "src/currency/entities/currency.entity";
import { Receipt } from "src/receipt/entities/receipt.entity";
import { Tenderapplication } from "src/tenderapplication/entities/tenderapplication.entity";
import { Column, CreateDateColumn, Entity,  JoinColumn,  ManyToOne,  OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Tenderinvoice {

    @PrimaryGeneratedColumn()
    id:number
   
    @Column({nullable:true})
    tenderapplicationId:number

    @Column()
    accountId:number

    @Column()
    invoicenumber:string

    @Column()
    tendernumber:string
    
    @Column()
    description:string

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


    @OneToOne(()=>Tenderapplication)
    @JoinColumn()
    tenderapplication:Tenderapplication

    @ManyToOne(()=>Account,account=>account.tenderinvoices)
    account:Account

    @ManyToOne(()=>Currency)
    currency:Currency









}
