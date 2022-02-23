import { Administrator } from "src/administrator/entities/administrator.entity";
import { Authorityapplication } from "src/entity-domain/authorityapplication/entities/authorityapplication.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Authorityapplicationcomment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    authorityapplicationId:number

    @Column({type:"text"})
    comment

    @Column()
    administratorId:number

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @ManyToOne(()=>Authorityapplication,authorityapplication=>authorityapplication.comments)
    authorityapplication:Authorityapplication

    @ManyToOne(()=>Administrator,{eager:true})
    administrator:Administrator
}
