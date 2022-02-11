import { Account } from "src/accounts/entities/account.entity";
import { Category } from "src/categories/entities/category.entity";
import { Supplierinvoice } from "src/supplierinvoice/entities/supplierinvoice.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Supplier  extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:true})
    supplierinvoiceId:number

    @Column()
    accountId:number

    @Column()
    categoryId:number

    @Column()
    expire_year:number

    @Column({default:'PENDING'})
    status:string

    @Column({default:0})
    printed:number

    @Column({default:"0"})
    code:string

    @Column({nullable:true})
    issued_on:string

    @Column({nullable:true})
    expiry_date:string

    @Column({nullable:true})
    option:string
    
    @CreateDateColumn()
    created_at:Date


    @UpdateDateColumn()
    updated_at:Date

    @ManyToOne(()=>Category,category=>category.suppliers)
    category:Category

    @ManyToOne(()=>Account)
    account:Account

    

}
