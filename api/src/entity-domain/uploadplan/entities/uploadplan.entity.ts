import { Authorityapplication } from "src/entity-domain/authorityapplication/entities/authorityapplication.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Uploadplan extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    authorityapplicationId:number
    @Column()
    filename:string

    @Column({default:'PENDING'})
    status:string

    @Column({type:'text',nullable:true})
    comment

    @Column()
    entityuserId:number

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @ManyToOne(()=>Authorityapplication,authorityapplication=>authorityapplication.plan)
    authorityapplication:Authorityapplication
}
