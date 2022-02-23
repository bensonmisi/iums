import { Procuremententity } from "src/procuremententity/entities/procuremententity.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Evaluationcommitte extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    procuremententityId:number

    @Column()
    name:string

    @Column()
    surname:string

    @Column()
    title:string

    @Column()
    jobtitle:string

    @Column()
    email:string

    @Column()
    entityuserId:number

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date 

    @ManyToOne(()=>Procuremententity,procuremententity=>procuremententity.evaluationcommitte)
    procuremententity:Procuremententity


}
