import { Account } from "src/accounts/entities/account.entity";
import { Currency } from "src/currency/entities/currency.entity";
import { Notice } from "src/notice/entities/notice.entity";
import { Noticefee } from "src/noticefee/entities/noticefee.entity";
import { Procuremententity } from "src/procuremententity/entities/procuremententity.entity";
import { Tenderfeetype } from "src/tenderfeetype/entities/tenderfeetype.entity";
import { Tenderinvoice } from "src/tenderinvoice/entities/tenderinvoice.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Tenderapplication extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    accountId:number

    @Column()
    noticeId:number

    @Column()
    uuid:string

    @Column({nullable:true})
    tenderinvoiceId:number

    @Column()
    procuremententityId:number

    @Column({nullable:true})
     noticefeeId:number
 
    @Column({nullable:true})
    tendernumber:string

    @Column({nullable:true})
    closingDate:string

    @Column({nullable:true})
    validityperiod:number

    @Column({nullable:true})
    maturitydate:string

    @Column({nullable:true})
    type:string

    @Column({nullable:true})
    tenderfeetypeId:number

    @Column({nullable:true})
    code:string

    @Column({nullable:true})
    amount:string

    @Column()
    currencyId:number

    @Column({default:'PENDING'})
    status:string

    @Column({default:'N'})
    refund:string

    @Column({default:'PENDING'})
    refunded:string

    @CreateDateColumn() 
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date


    @ManyToOne(()=>Procuremententity,procuremententity=>procuremententity.applications)
    procuremententity:Procuremententity

    @ManyToOne(()=>Account,account=>account.applications,{eager:true})
    account:Account

    @ManyToOne(()=>Notice,notice=>notice.tenderapplications)
    notice:Notice

    @ManyToOne(()=>Currency)
    currency:Currency

    @ManyToOne(()=>Tenderinvoice)
    tenderinvoice:Tenderinvoice

    @ManyToOne(()=>Tenderfeetype,tenderfeetype=>tenderfeetype.applications)
    tenderfeetype:Tenderfeetype

    @ManyToOne(()=>Noticefee,noticefee=>noticefee.tenderapplication)
    noticefee:Noticefee

}
 