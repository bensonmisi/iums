import { Suspense } from "src/suspense/entities/suspense.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Suspensereceipt{

 @PrimaryGeneratedColumn()
 id:number

 @Column()
 uuid:string

 @Column()
 receiptnumber:string

 @Column()
 currency:string

 @Column()
 amount:string

 @CreateDateColumn()
 created_at:Date

 @UpdateDateColumn()
 updated_at:Date

 @ManyToOne(()=>Suspense,suspense=>suspense.receipts)
 suspense:Suspense


}