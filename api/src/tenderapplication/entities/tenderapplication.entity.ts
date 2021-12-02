import { Account } from "src/accounts/entities/account.entity";
import { Currency } from "src/currency/entities/currency.entity";
import { Procuremententity } from "src/procuremententity/entities/procuremententity.entity";
import { Tenderfeetype } from "src/tenderfeetype/entities/tenderfeetype.entity";
import { Tenderinvoice } from "src/tenderinvoice/entities/tenderinvoice.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Tenderapplication {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    accountId:number

    @Column()
    uuid:string

    @Column()
    procuremententityId:number

    @Column({nullable:true})
     noticeId:number
 
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

    @Column()
    amount:string

    @Column()
    currencyId:number

    @Column({default:'PENDING'})
    status:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date


    @ManyToOne(()=>Procuremententity,procuremententity=>procuremententity.applications)
    procuremententity:Procuremententity

    @ManyToOne(()=>Account,account=>account.applications)
    account:Account

    @ManyToOne(()=>Currency)
    currency:Currency

    @OneToOne(()=>Tenderinvoice)
    tenderinvoice:Tenderinvoice

    @ManyToOne(()=>Tenderfeetype,tenderfeetype=>tenderfeetype.applications)
    tenderfeetype:Tenderfeetype

    /**
     *  to put procurement notice relationship
     */

}
 