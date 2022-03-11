import { Bidbondperiod } from "src/bidbondperiod/entities/bidbondperiod.entity";
import { Currency } from "src/currency/entities/currency.entity";
import { Notice } from "src/notice/entities/notice.entity";
import { Tenderapplication } from "src/tenderapplication/entities/tenderapplication.entity";
import { Tenderfeetype } from "src/tenderfeetype/entities/tenderfeetype.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Noticefee extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    noticeId:number

    @Column()
    tenderfeetypeId:number

    @Column()
    currencyId:number

    @Column()
    amount:string

    @Column({nullable:true})
    bidbondperiodId:number

    @Column({default:0})
    extention:number

    @Column({default:'ACTIVE'})
    status:string
    
    @Column({default:'N'})
    refund:string

    @Column({default:'N'})
    refunded:string

    @Column({default:'user'})
    level:string

    @Column()
    creator:number

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date


    @ManyToOne(()=>Currency,{eager:true})
    currency:Currency

    @ManyToOne(()=>Notice,notice=>notice.noticefee,{eager:true})
    notice:Notice

    @ManyToOne(()=>Tenderfeetype,{eager:true})
    tenderfeetype:Tenderfeetype

    @OneToMany(()=>Tenderapplication,tenderapplication=>tenderapplication.noticefee)
    tenderapplication:Tenderapplication[]
    
    @ManyToOne(()=>Bidbondperiod,{eager:true})
    bidbondperiod:Bidbondperiod
}
