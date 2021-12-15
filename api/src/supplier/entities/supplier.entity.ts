import { Supplierinvoice } from "src/supplierinvoice/entities/supplierinvoice.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

}
