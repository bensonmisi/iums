import { Administrator } from "src/administrator/entities/administrator.entity";
import { Banktransaction } from "src/banktransaction/entities/banktransaction.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Bank extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    authcode:string

    @Column({default:'ACTIVE'})
    status:string

    @Column()
    adminId:number
    
    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @OneToMany(()=>Banktransaction,banktransaction=>banktransaction.bank)
    banktransactions:Banktransaction[]

    @ManyToOne(()=>Administrator,administrator=>administrator.banks)
    administrator:Administrator
}
