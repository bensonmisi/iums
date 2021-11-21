import { Banktransaction } from "src/banktransaction/entities/banktransaction.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Accountnumber extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true})
    accountnumber:string

    @Column()
    currency:string

    @Column()
    type:string

    @Column({default:'ACTIVE'})
    status:string

    @CreateDateColumn()
    created_at:Date
    
    
    @UpdateDateColumn()
    updated_at:Date

    //@OneToMany(()=>Banktransaction,transaction=>transaction.accntnumber)
    //transaction:Banktransaction[]
}
