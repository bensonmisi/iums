import { Currency } from "src/currency/entities/currency.entity";
import { Procurementclass } from "src/procurementclass/entities/procurementclass.entity";
import { Procurementclassification } from "src/procurementclassification/entities/procurementclassification.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Procurementthreshold extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    procurementclassId:number

    @Column()
    procurementclassificationId:number

    @Column()
    currencyId:number

    @Column()
    value:string

    @Column()
    fee:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date


    @ManyToOne(()=>Procurementclass)
    procurementclass:Procurementclass

    @ManyToOne(()=>Procurementclassification)
    procurementclassification:Procurementclassification

    @ManyToOne(()=>Currency)
    currency:number
}
