import { Administrator } from "src/administrator/entities/administrator.entity";
import { Currency } from "src/currency/entities/currency.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Bidbondthreshold extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number
    
    @Column({default:'local'})
    locality:string

    @Column()
    currencyId:number

    @Column()
    validityperiod:string

    @Column()
    lowerlimit:string

    @Column()
    upperlimit:string

    @Column()
    amount:string

    @Column()
    administratorId:number

    @Column({default:"ACTIVE"})
    status:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date


    @ManyToOne(()=>Currency)
    currency:Currency

    @ManyToOne(()=>Administrator)
    administrator:Administrator





}
