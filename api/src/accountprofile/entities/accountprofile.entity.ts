import { Account } from "src/accounts/entities/account.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Accountprofile extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    accountId:number

    @Column()
    entityname:string

    @Column()
    product:string

    @Column()
    quantity:string

    @Column()
    delivery_date:Date

    @Column({type:"text"})
    description

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @ManyToOne(()=>Account,account=>account.profile)
    @JoinColumn()
     account:Account
    
}
