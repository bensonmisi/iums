import { Account } from "src/accounts/entities/account.entity";
import { Role } from "src/role/entities/role.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User  extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    roleId:number

    @Column()
    accountId:number

    @Column()
    name:string

    @Column()
    surname:string

    @Column()
    phone:string

    @Column()
    email:string

    @Column()
    username:string

    @Column({default:'ACTIVATED'})
    status:string

    @Column()
    authcode:string

    @Column()
    type:string

    @ManyToOne(()=>Role)
    @JoinColumn()
    role:Role

    @ManyToOne(()=>Account,account=>account.user)
    @JoinColumn()
    account:Account

}
