import { Checklist } from "src/checklist/entities/checklist.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Checklistquestion extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    checklistId:number

    @Column()
    question:string

    @Column({default:'ACTIVE'})
    status:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @ManyToOne(()=>Checklist,checklist=>checklist.checklistquestion)
    checklist:Checklist

    
}
