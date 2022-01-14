import { Receipt } from "src/receipt/entities/receipt.entity";
import { Suspense } from "src/suspense/entities/suspense.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Suspensereceipt extends BaseEntity{

 @PrimaryGeneratedColumn()
 id:number

 @Column()
 uuid:string

 @Column()
 receiptnumber:string

 @Column()
 currency:string

@Column({nullable:true})
suspenseId:number

 @Column()
 amount:string

 @CreateDateColumn()
 created_at:Date

 @UpdateDateColumn()
 updated_at:Date

 @ManyToOne(()=>Suspense,suspense=>suspense.receipts)
 @JoinColumn({name:'suspenseId',referencedColumnName:'id'})
 suspense:Suspense


}