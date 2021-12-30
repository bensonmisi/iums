import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Documentcomment extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number
    
     @Column({nullable:true})
     documentId:number

    @Column({nullable:true})
    administratorId:number

    @Column({nullable:true})
    accountId:number

    @Column({type:'text',nullable:true})
    comment

    @Column({default:'PENDING'})
    status:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date


}
