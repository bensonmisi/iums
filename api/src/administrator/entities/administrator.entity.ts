import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
 import * as bcrypt from 'bcrypt'
import { Role } from "src/role/entities/role.entity";
import { administratorResetToken } from "./administratorResetToken.entity";
import { audit } from "src/audit/entities/audit.entity";
import { Currency } from "src/currency/entities/currency.entity";
import { Exchangerate } from "src/exchangerate/entities/exchangerate.entity";
import { Bank } from "src/bank/entities/bank.entity";
import { Manualtransaction } from "src/manualtransaction/entities/manualtransaction.entity";
import { Suspensetransfer } from "src/suspensetransfers/entities/suspensetransfer.entity";
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
 @Column({default:'N'})
 passwordChange:string

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

 async validatepassword(password:string):Promise<boolean>{
      if(this.passwordChange=='N')
       {
       this.password = this.password.replace(/^\$2y(.+)$/i, '$2a$1')
       } 
       console.log(this.password)     
     return bcrypt.compare(password,this.password);
       
 }

 @ManyToOne(()=>Role,role=>role.administrator)
 role:Role 

 @OneToMany(()=>administratorResetToken,token=>token.administrator)
 token:administratorResetToken[] 

 @OneToMany(()=>audit,trail=>trail.administrator)
 trail:audit[]

 @OneToMany(()=>Exchangerate,rate=>rate.agent)
 rate:Exchangerate[]

 @ManyToOne(()=>Bank, bank=>bank.administrator)
 banks:Bank[]

 @OneToMany(()=>Manualtransaction,manaul=>manaul.requester)
 manualtransaction:Manualtransaction

 @OneToMany(()=>Manualtransaction,manaul=>manaul.approver)
 approvedtransaction:Manualtransaction

 @OneToMany(()=>Suspensetransfer,transfer=>transfer.requester)
 requests:Suspensetransfer

 @OneToMany(()=>Suspensetransfer,transfer=>transfer.actioner)
 actions:Suspensetransfer

}
