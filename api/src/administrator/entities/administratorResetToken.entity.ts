import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
}