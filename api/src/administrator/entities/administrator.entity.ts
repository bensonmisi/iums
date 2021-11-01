import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
 import * as bcrypt from 'bcrypt'
import { Role } from "src/role/entities/role.entity";
import { administratorResetToken } from "./administratorResetToken.entity";
@Entity()
export class Administrator extends BaseEntity {
 @PrimaryGeneratedColumn()
 id:number
 @Column()
 name:string

 @Column() 
 surname:string

 @Column({unique:true})
 username:string
 @Column({unique:true})
 email:string
 @Column()
 roleId:number
 
 @Column()
 password:string

 @Column({default:'ACTIVE'})
 status:string

 @CreateDateColumn()
 created_at:Date

 @UpdateDateColumn()
 updated_at:Date

 @BeforeInsert()
 async hashPassword() {
 this.password = await bcrypt.hash(this.password,10)
 }

 @ManyToOne(()=>Role,role=>role.administrator)
 role:Role 

 @OneToMany(()=>administratorResetToken,token=>token.administrator)
 token:administratorResetToken[] 

}