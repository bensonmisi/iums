import { Section } from "src/sections/entities/section.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Category {
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

    @ManyToOne(()=>Section,section=>section.category,{onDelete:'SET NULL',eager:true})
    section:Section

}
