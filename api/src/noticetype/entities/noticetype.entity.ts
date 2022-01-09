import { Notice } from "src/notice/entities/notice.entity";
import { Tenderfeetype } from "src/tenderfeetype/entities/tenderfeetype.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Noticetype extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    update_at:Date

    @ManyToMany(()=>Notice,notice=>notice.noticetype)
    @JoinTable()
    notice:Notice[]

    @ManyToMany(()=>Tenderfeetype,tenderfeetype=>tenderfeetype.noticefee)
    @JoinTable({ name: "tenderfeetype_noticetype",
    joinColumn: { name: "noticetypeId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "tenderfeetypeId" }})
    tenderfeetype:Tenderfeetype[]
}
