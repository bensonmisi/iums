import { Annualplan } from "src/entity-domain/annualplan/entities/annualplan.entity";
import { Noticeaward } from "src/entity-domain/noticeawards/entities/noticeaward.entity";
import { Notice } from "src/notice/entities/notice.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Noticeproduct extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    noticeId:number

    @Column({type:'text'})
    description

    @Column()
    quantity:string

    @Column()
    isplanned:string

    @Column({nullable:true})
    annualplanId:number

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date


    @ManyToOne(()=>Notice,notice=>notice.noticeproduct)
    notice:Notice

    @ManyToOne(()=>Annualplan)
    annualplan:Annualplan

    @OneToMany(()=>Noticeaward,noticeaward=>noticeaward.noticeproduct,{eager:true})
    awards:Noticeaward[]
    
}
