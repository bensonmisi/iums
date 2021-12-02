import { Tenderinvoice } from "src/tenderinvoice/entities/tenderinvoice.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Receipt extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    invoicenumber:string

    @Column({unique:true})
    receiptnumber:string

    @Column()
    type:string

    @Column()
    description:string

    @Column()
    accountId:number

    @Column()
    method:string

    @Column({nullable:true})
    sourceId:number

    @Column()
    currencyId:number

    @Column()
    amount:string

    @Column()
    userId:number

    @Column({default:0})
    posted:number

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

}
