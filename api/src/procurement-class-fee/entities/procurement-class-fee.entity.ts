import { Currency } from "src/currency/entities/currency.entity";
import { Procurementclass } from "src/procurementclass/entities/procurementclass.entity";
import { BaseEntity, Column, CreateDateColumn, CursorCommentOptions, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ProcurementClassFee extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    procurementclassId:number

    @Column()
    currencyId:number

    @Column()
    cost:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @DeleteDateColumn()
    deleted_at:Date

    @ManyToOne(()=>Currency)
    currency:Currency


    @ManyToOne(()=>Procurementclass)
    procurementclass:Procurementclass
    
}
