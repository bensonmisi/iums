import { Administrator } from "src/administrator/entities/administrator.entity";
import { Currency } from "src/currency/entities/currency.entity";
import { Supplierinvoice } from "src/supplierinvoice/entities/supplierinvoice.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Exchangerate extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    primaryId:number

    @Column({default:'INTERNAL'})
    type:string
    
    @Column()
    secondaryId:number

    @Column()
    value:string

    @Column()
    administratorId:number

    @CreateDateColumn()
    created_at:Date
    @UpdateDateColumn()
    updated_at:Date

    @ManyToOne(()=>Currency,currency=>currency.primaryrate,{eager:true})
    @JoinColumn({name:'primaryId'})
    primaryCurrency:Currency

    @ManyToOne(()=>Currency,currency=>currency.secondaryrate,{eager:true})
    @JoinColumn({name:'secondaryId'})
    secondaryCurrency:Currency

    @ManyToOne(()=>Administrator,admini=>admini.rate,{eager:true})
    @JoinColumn({name:'administratorId'})
    agent:Administrator



}
