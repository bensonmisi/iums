import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Contactfeethreshold extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    currencyId:number

    @Column()
    noticetypeId:number

    @Column({default:'DOMESTIC'})
    group:string

    @Column()
    lower:string

    @Column()
    upper:string

    @Column({default:"PERCENTAGE"})
    type:string

    @Column()
    mincost:string

    @Column()
    maxcost:string


    @Column()
    createdBy:number

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date
}
