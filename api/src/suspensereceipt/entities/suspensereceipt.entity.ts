import { Suspense } from "src/suspense/entities/suspense.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
 @JoinColumn()
 suspense:Suspense


}