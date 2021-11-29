import { Account } from "src/accounts/entities/account.entity";
import { Administrator } from "src/administrator/entities/administrator.entity";
import { Suspense } from "src/suspense/entities/suspense.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Suspensetransfer extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    suspenseId:number

    @Column()
    from_account_id:number

    @Column()
    to_account_id:number

    @Column()
    accountnumber:string

    @Column()
    amount:string

    @Column({nullable:true})
    filename:string

    @Column()
    requestedBy:number

    @Column({nullable:true})
    actionedBy:number

    @Column({default:"PENDING"})
    status:string

    @Column({nullable:true})
    reason:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @ManyToOne(()=>Account,account=>account.fromtransfer)
    @JoinColumn({name:'from_account_id',referencedColumnName:'id'})
    source:Account

    @ManyToOne(()=>Account,account=>account.todestination)
    @JoinColumn({name:'to_account_id',referencedColumnName:'id'})
    destination:Account

    @ManyToOne(()=>Suspense,suspense=>suspense.transfers)
    @JoinColumn()
    suspense:Suspense

    

    @ManyToOne(()=>Administrator,administrator=>administrator.requests)
    @JoinColumn({name:"requestedBy",referencedColumnName:"id"})
    requester:Administrator

    @ManyToOne(()=>Administrator,administrator=>administrator.actions)
    @JoinColumn({name:"actionedBy",referencedColumnName:"id"})
    actioner:Administrator

    @OneToOne(()=>Suspense,suspense=>suspense.suspensetransfer)
    processedsuspense:Suspense



}
