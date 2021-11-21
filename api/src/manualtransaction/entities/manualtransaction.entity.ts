import { Administrator } from "src/administrator/entities/administrator.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Manualtransaction {
    @PrimaryGeneratedColumn()
    id:number
    
    @Column({unique:true})
    source_reference:string

    @Column({unique:true})
    statement_reference:string

    @Column()
    referencenumber:string

    @Column()
    bankId:number

    @Column()
    description:string

    @Column()
    accountnumber:string

    @Column()
    transactionDate:string

    @Column()
    currency:string

    @Column()
    amount:string

    @Column()
    requestedBy:number

    @Column({nullable:true})
    approvedBy:number

    @Column({default:'PENDING'})
    status:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @ManyToOne(()=>Administrator) 
    @JoinColumn([{name:'requestedBy',referencedColumnName:'id'}])
    requester:Administrator

    @ManyToOne(()=>Administrator)
    @JoinColumn([{name:'approvedBy',referencedColumnName:'id'}])
    approver:Administrator
}
