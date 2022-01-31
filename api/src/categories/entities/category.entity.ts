import { Section } from "src/sections/entities/section.entity";
import { Supplierinvoice } from "src/supplierinvoice/entities/supplierinvoice.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Category  extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true})
    code:string
    @Column()
    name:string
    
    @Column({default:'ACTIVE'})
    status:string

    @CreateDateColumn()
    created_at:Date
    @UpdateDateColumn()
    updated_at:Date

    @DeleteDateColumn()
    deleted_at:Date

    @ManyToOne(()=>Section,section=>section.category,{onDelete:'SET NULL',eager:true})
    section:Section

    @OneToMany(()=>Supplierinvoice,supplierinvoice=>supplierinvoice.category)
    supplierinvoice:Supplierinvoice[]

}
