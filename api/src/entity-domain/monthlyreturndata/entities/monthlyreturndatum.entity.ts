import { Currency } from "src/currency/entities/currency.entity";
import { Monthlyreturn } from "src/entity-domain/monthlyreturn/entities/monthlyreturn.entity";
import { Noticeaward } from "src/entity-domain/noticeawards/entities/noticeaward.entity";
import { Noticetype } from "src/noticetype/entities/noticetype.entity";
import { Procurementcategory } from "src/procurementcategory/entities/procurementcategory.entity";
import { Section } from "src/sections/entities/section.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Monthlyreturndatum extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    monthlyreturnId:number

    @Column()
    sectionId:number

    @Column({nullable:true})
    noticeawardId:number

    @Column()
    noticetypeId:number

    @Column()
    tendernumber:string

    @Column()
    currencyId:number
    

    @Column({nullable:true})
    procurementtypeId:number

    @Column()
    procurementcategoryId:number

    @Column()
    value:string

    @Column()
    userId:number

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @ManyToOne(()=>Monthlyreturn,monthlyreturn=>monthlyreturn.monthlyreturndata)
    monthlyreturn:Monthlyreturn

    @ManyToOne(()=>Currency,{eager:true})
    currency:Currency

    @ManyToOne(()=>Procurementcategory,{eager:true})
    procurementcategory:Procurementcategory

    @ManyToOne(()=>Section)
    section:Section

    @ManyToOne(()=>Noticetype,{eager:true})
    noticetype:Noticetype

    @ManyToOne(()=>Noticeaward)
    @JoinColumn({name:'noticeawardId',referencedColumnName:'id'})
    awards:Noticeaward

    
}
