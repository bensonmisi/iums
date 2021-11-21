import { Account } from "src/accounts/entities/account.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Directorate {
@PrimaryGeneratedColumn()
id:number

@Column()
accountId:number

@Column()
name:string

@Column()
gender:string

@Column()
idnumber:string

@CreateDateColumn()
created_at:Date

@UpdateDateColumn()
updated_at:Date


@ManyToOne(()=>Account,account=>account.directors)
account:Account


}
