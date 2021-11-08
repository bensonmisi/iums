import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Registrationperiod extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true})
    regyear:number

}
