import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Contactfeethreshold extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column({default:"LOCAL"})
    locality:string

    @Column()
    currencyId:number

    @Column()
    lower:string

    @Column()
    upper:string

    @Column({default:"PERCENTAGE"})
    type:string

    @Column()
    cost:string


    @Column()
    createdBy:number

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date
}
