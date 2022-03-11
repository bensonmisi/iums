import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Monthlyreturnchecklist extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    monthlyreturndataId:number

    @Column()
    checklistquestionId:number

    @Column()
    answer:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date


}
