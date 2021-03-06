import { Account } from "src/accounts/entities/account.entity";
import { Role } from "src/role/entities/role.entity";
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
@Entity()
export class User  extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column({default:12})
    roleId:number

    @Column()
    accountId:number

    @Column({nullable:true})
    name:string

    @Column({nullable:true})
    surname:string

    @Column({nullable:true})
    phone:string 

    @Column({unique:true})
    email:string

    @Column({nullable:true})
    username:string

    @Column({default:'ACTIVATED'})
    status:string

    @Column({nullable:true})
    authcode:string

    @Column({default:'BIDDER'})
    type:string

    @Column({nullable:true})
    password:string
    
    @Column({default:'N'})
    passwordChange:string

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
   return bcrypt.compare(password,this.password);
     
}

    @ManyToOne(()=>Role)
    @JoinColumn()
    role:Role

    @ManyToOne(()=>Account,account=>account.user)
    @JoinColumn()
    account:Account

}
