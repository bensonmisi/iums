import { Annualplan } from "src/entity-domain/annualplan/entities/annualplan.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Individualplan {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    annualplanId:number

    @Column()
    quantity:number

    @Column()
    date_of_purchase:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @ManyToOne(()=>Annualplan,annualplan=>annualplan.individualplans)
    annualplan:Annualplan
}
