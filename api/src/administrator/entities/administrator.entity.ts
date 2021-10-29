import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
 import * as bcrypt from 'bcrypt'
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

 @Column()
 password:string

 @CreateDateColumn()
 created_at:Date

 @UpdateDateColumn()
 updated_at:Date

 @BeforeInsert()
 async hashPassword() {
 this.password = await bcrypt.hash(this.password,10)
 }

 

}
