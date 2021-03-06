import { Exchangerate } from "src/exchangerate/entities/exchangerate.entity";
import { Registrationfee } from "src/registrationfee/entities/registrationfee.entity";
import { Supplierinvoice } from "src/supplierinvoice/entities/supplierinvoice.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Currency extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true})
    name:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date
    @OneToMany(() => Exchangerate, rate => rate.primaryCurrency)
    primaryrate: Exchangerate[];
    @OneToMany(() => Exchangerate, rate => rate.secondaryCurrency)
    secondaryrate: Exchangerate[];

    @OneToMany(()=>Registrationfee,fee=>fee.currency)
    registrationfee:Registrationfee[]

    @OneToMany(()=>Supplierinvoice,supplierinvoice=>supplierinvoice.currency)
    supplierinvoice:Supplierinvoice[]
}
