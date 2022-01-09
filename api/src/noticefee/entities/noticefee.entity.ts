import { Currency } from "src/currency/entities/currency.entity";
import { Notice } from "src/notice/entities/notice.entity";
import { Tenderapplication } from "src/tenderapplication/entities/tenderapplication.entity";
import { Tenderfeetype } from "src/tenderfeetype/entities/tenderfeetype.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Noticefee extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    noticeId:number

    @Column()
    tenderfeetypeId:number

    @Column()
    name:string

    @Column()
    currencyId:number

    @Column()
    amount:string

    @Column()
    closingDate:Date


    @Column({nullable:true,default:0})
    validityperiod:number

    @Column({default:0})
    extention:number

    @Column({nullable:true})
    maturityDate:Date

    @Column({default:'ACTIVE'})
    status:string
    
    @Column({default:'N'})
    refund:string

    @Column({default:'N'})
    refunded:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date


    @ManyToOne(()=>Currency)
    currency:Currency

    @ManyToOne(()=>Notice,notice=>notice.noticefee,{eager:true})
    notice:Notice

    @OneToMany(()=>Tenderfeetype,tenderfeetype=>tenderfeetype.noticefee)
    tenderfeetype:Tenderfeetype[]

    @OneToMany(()=>Tenderapplication,tenderapplication=>tenderapplication.noticefee)
    tenderapplication:Tenderapplication[]
}
