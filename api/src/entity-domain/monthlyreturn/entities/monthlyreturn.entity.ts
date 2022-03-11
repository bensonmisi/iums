import { Monthlyreturndatum } from "src/entity-domain/monthlyreturndata/entities/monthlyreturndatum.entity";
import { Procuremententity } from "src/procuremententity/entities/procuremententity.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Monthlyreturn extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    procuremententityId:number

    @Column()
    year:number

    @Column()
    month:string

    @Column()
    userId:number

    @Column({default:'PENDING'})
    status:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @ManyToOne(()=>Procuremententity,procuremententity=>procuremententity.monthlyreturns)
    procuremententity:Procuremententity


    @OneToMany(()=>Monthlyreturndatum,monthlyreturndata=>monthlyreturndata.monthlyreturn)
    monthlyreturndata:Monthlyreturndatum[]




}
