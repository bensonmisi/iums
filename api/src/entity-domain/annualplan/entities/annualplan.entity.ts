import { Administrator } from "src/administrator/entities/administrator.entity";
import { Currency } from "src/currency/entities/currency.entity";
import { Individualplan } from "src/entity-domain/individualplan/entities/individualplan.entity";
import { Noticetype } from "src/noticetype/entities/noticetype.entity";
import { Procurementcategory } from "src/procurementcategory/entities/procurementcategory.entity";
import { Procurementclassification } from "src/procurementclassification/entities/procurementclassification.entity";
import { Procuremententity } from "src/procuremententity/entities/procuremententity.entity";
import { Uom } from "src/uom/entities/uom.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Annualplan extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    procuremententityId:number

    @Column()
    procurementcategoryId:number

    @Column()
    procurementclassificationId:number

    @Column()
    year:number

    @Column({type:"text"})
    description

    @Column()
    quantity:string

    @Column()
    cost:string

    @Column()
    annualcost:string

    @Column()
    uomId:number

    @Column()
    noticetypeId:number

    @Column()
    currencyId:number

    @Column()
    spoc:string

    @Column()
    rate_of_purchase:string

    @Column()
    cycle_time:string

    @Column()
    date_of_purchase:string

    @Column()
    prequalification:string

    @Column()
    external_lead_time:string
    @Column()
    source_of_funds:string

    @Column()
    author:number

    @Column({nullable:true})
    approver:number

    @Column({default:'PENDING'})
    status:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date
    

    @ManyToOne(()=>Procuremententity,procuremententity=>procuremententity.annualplans)
    procuremententity:Procuremententity

    @ManyToOne(()=>Noticetype,{eager:true})
    noticetype:Noticetype

    @ManyToOne(()=>Uom,{eager:true})
    uom:Uom

    @ManyToOne(()=>Procurementcategory)
    procurementcategory:Procurementcategory

    @ManyToOne(()=>Procurementclassification)
    procurementclassification:Procurementclassification

    @ManyToOne(()=>Currency,{eager:true})
    currency:Currency

    @OneToMany(()=>Individualplan,individualplan=>individualplan.annualplan)
    individualplans:Individualplan[]

    
}
