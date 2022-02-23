import { Authorityinvoice } from "src/authorityinvoice/entities/authorityinvoice.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Authorityinvoiceupload extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    authorityinvoiceId:number

    @Column()
    bank:string

    @Column()
    amount:string

    @Column()
    transdate:string

    @Column()
    filename:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date


    @ManyToOne(()=>Authorityinvoice)
    authorityinvoice:Authorityinvoice


}
