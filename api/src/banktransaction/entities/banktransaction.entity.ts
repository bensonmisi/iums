import { Accountnumber } from "src/accountnumber/entities/accountnumber.entity";
import { Account } from "src/accounts/entities/account.entity";
import { Bank } from "src/bank/entities/bank.entity";
import { Suspense } from "src/suspense/entities/suspense.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Banktransaction extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    bankId:number

    @Column({type:"text",nullable:true})
    description

    @Column()
    transactionDate:string

    @Column({nullable:true})
    referencenumber:string

    @Column({nullable:true})
    sourcereference:string

    @Column({nullable:true})
    statementreference:string
    
    @Column({nullable:true})
    accountId:number

    @Column({nullable:true})
    regnumber:string

    @Column()
    amount:string

    @Column()
    accountnumber:string

    @Column({default:'PENDING'})
    status:string

    @Column()
    currency:string 

    @Column({nullable:true})
    adminId:number

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date


    /**
     * relationships
     */

    @OneToOne(()=>Account,account=>account.banktransaction)
    @JoinColumn()
    account:Account

    @ManyToOne(()=>Bank,bank=>bank.banktransactions)
    bank:Bank

    //@OneToOne(()=>Suspense,suspense=>suspense.banktransaction)
   // suspense:Suspense 

    //@ManyToOne(()=>Accountnumber,accountnumber=>accountnumber.transaction)
    //@JoinColumn([{name:'accountnumber',referencedColumnName:'accountnumber'}])
    //accntnumber:Accountnumber
}