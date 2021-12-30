import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Mailinglist extends BaseEntity{
 @PrimaryGeneratedColumn()
 id:number

 @Column({unique:true})
 accountId:number

 @Column({unique:true})
 email:string

 @CreateDateColumn()
 created_at:Date

 @UpdateDateColumn()
 updated_at:Date
}