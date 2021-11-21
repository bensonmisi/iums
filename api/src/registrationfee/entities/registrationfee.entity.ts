import { Currency } from "src/currency/entities/currency.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class Registrationfee extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    locality:string

    @Column()
    action:string

    @Column()
    currencyId:number


    @Column()
    price:string

    @Column()
    administrator_id:number

    @Column({default:'ACTIVE'})
    status:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date


    @ManyToOne(()=>Currency,currency=>currency.registrationfee,{eager:true})
    @JoinColumn()
    currency:Currency

}
