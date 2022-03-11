import { Checklistquestion } from "src/checklistquestions/entities/checklistquestion.entity";
import { Procurementcategory } from "src/procurementcategory/entities/procurementcategory.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Checklist extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true})
    procurementcategoryId:number

    @Column({default:'ACTIVE'})
    status:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @ManyToOne(()=>Procurementcategory)
    procurementcategory:Procurementcategory

    @OneToMany(()=>Checklistquestion,checklistquestion=>checklistquestion.checklist)
    checklistquestion:Checklistquestion[]
    
}
