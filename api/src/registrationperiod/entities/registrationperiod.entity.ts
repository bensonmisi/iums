import { Supplierinvoice } from "src/supplierinvoice/entities/supplierinvoice.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Registrationperiod extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true})
    regyear:number


    @OneToMany(()=>Supplierinvoice,supplierinvoice=>supplierinvoice.registrationperiod)
    supplierinvoice:Supplierinvoice[]

}
