import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Rtg extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    accountId:number

    @Column({nullable:true})
    invoicenumber:string

    @Column()
    filename:string

    @Column({nullable:true})
    currencyId:number

    @Column({nullable:true})
    amount:string

    @Column()
    name:string

    @Column({nullable:true})
    paymentdate:string

    @Column({default:"PENDING"})
    status:string

    @Column({type:"text",nullable:true})
    comment

    @Column({nullable:true})
    refnumber:string

    @Column({nullable:true})
    transdate:string

    @Column({nullable:true})
    userId:number

    @Column({nullable:true})
    suspenseId:number

    @Column({default:"PENDING"})
    processed:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date





}
