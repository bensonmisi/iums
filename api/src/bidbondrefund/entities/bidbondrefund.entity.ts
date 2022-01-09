import { Administrator } from "src/administrator/entities/administrator.entity";
import { Bankdetail } from "src/bankdetails/entities/bankdetail.entity";
import { Tenderapplication } from "src/tenderapplication/entities/tenderapplication.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bidbondrefund extends BaseEntity{
 @PrimaryGeneratedColumn()
 id:number

 @Column({unique:true})
 applicationId:number

 @Column()
 tendernumber:string

 @Column()
 bankdetailId:number

 @Column()
 initiator:number 

 @Column({nullable:true})
 approvedBy:number

 @Column({default:'PENDING'})
 status:string

 @Column({nullable:true})
 refunded_on:Date

 @Column({nullable:true})
 referencenumber:string

 @OneToOne(()=>Tenderapplication)
 @JoinColumn({name:"applicationId",referencedColumnName:"id"})
 application:Tenderapplication

 @ManyToOne(()=>Bankdetail)
 bankdetail:Bankdetail

 @ManyToOne(()=>Administrator,{eager:true})
 @JoinColumn({name:'initiator',referencedColumnName:'id'})
 admininitiator:Administrator

 @ManyToOne(()=>Administrator,{eager:true})
 @JoinColumn({name:'approvedBy',referencedColumnName:'id'})
 adminapprover:Administrator
 

}