import { Account } from "src/accounts/entities/account.entity";
import { Currency } from "src/currency/entities/currency.entity";
import { EntityUser } from "src/entity-domain/entity-user/entities/entity-user.entity";
import { Noticeproduct } from "src/noticeproduct/entities/noticeproduct.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Noticeaward extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    noticeproductId:number

    @Column()
    accountId:number

    @Column()
    quantity:number

    @Column()
    currencyId:number

    @Column()
    value:string

    @Column()
    entityuserId:number

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @ManyToOne(()=>Currency,{eager:true})
    currency:Currency

    @ManyToOne(()=>Account,{eager:true})
    account:Account


    @ManyToOne(()=>Noticeproduct,noticeproduct=>noticeproduct.awards)
    noticeproduct:Noticeproduct

    @ManyToOne(()=>EntityUser)
    entityuser:EntityUser


}
