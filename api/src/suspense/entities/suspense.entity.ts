import { Account } from "src/accounts/entities/account.entity";
import { Banktransaction } from "src/banktransaction/entities/banktransaction.entity";
import { Onlinepayment } from "src/onlinepayment/entities/onlinepayment.entity";
import { Suspensereceipt } from "src/suspensereceipt/entities/suspensereceipt.entity";
import { Suspensetransfer } from "src/suspensetransfers/entities/suspensetransfer.entity";
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Suspense extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:true})
    banktransactionId:number

    @Column({nullable:true})
     onlinepaymentId:number

    @Column({nullable:true})
    suspensetransferId:number
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

    @OneToOne(()=>Banktransaction,banktransaction=>banktransaction.suspense)
    @JoinColumn()
    banktransaction:Banktransaction

    @OneToOne(()=>Onlinepayment,onlinepayment=>onlinepayment)
    @JoinColumn()
    onlinepayment:Onlinepayment

    @ManyToOne(()=>Account,account=>account.suspense)
    account:Account

    @OneToMany(()=>Suspensetransfer,transfer=>transfer.suspense)
    transfers:Suspensetransfer[]

    @OneToMany(()=>Suspensereceipt,suspensereceipt=>suspensereceipt.suspense)
    receipts:Suspensereceipt[]


    @OneToOne(() => Suspensetransfer)
    @JoinColumn()
    suspensetransfer:Suspensetransfer
   

}
