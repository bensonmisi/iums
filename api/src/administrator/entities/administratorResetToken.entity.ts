import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Administrator } from "./administrator.entity";

@Entity()
export class administratorResetToken extends BaseEntity{
 @PrimaryGeneratedColumn()
 id:number
 @Column()
 administratorId:number
 @Column()
 token:string
 @Column()
 expire_date:Date
 @CreateDateColumn()
 created_at:Date
 @UpdateDateColumn()
 updated_at:Date
 @ManyToOne(()=>Administrator,user=>user.token)
 administrator:Administrator
}