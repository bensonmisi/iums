import { Administrator } from "src/administrator/entities/administrator.entity";
import { Currency } from "src/currency/entities/currency.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Exchangerate {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    primaryId:number

    @Column()
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
