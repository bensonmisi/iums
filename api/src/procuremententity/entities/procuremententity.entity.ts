import { Annualplan } from "src/entity-domain/annualplan/entities/annualplan.entity";
import { Authorityapplication } from "src/entity-domain/authorityapplication/entities/authorityapplication.entity";
import { EntityUser } from "src/entity-domain/entity-user/entities/entity-user.entity";
import { Evaluationcommitte } from "src/entity-domain/evaluationcommitte/entities/evaluationcommitte.entity";
import { Procurementmanagementunit } from "src/entity-domain/procurementmanagementunit/entities/procurementmanagementunit.entity";
import { Tenderapplication } from "src/tenderapplication/entities/tenderapplication.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Procuremententity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column({nullable:true})
    regnumber:string

    @Column({nullable:true})
    slug:string

    @Column({nullable:true})
    city:string

    @Column({nullable:true})
    province:string

    @Column({nullable:true})
    district:string

    @Column({nullable:true})
    sector:string

    @Column({default:0})
    posted:number

    @Column({nullable:true})
    creator:number

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @DeleteDateColumn()
    deleted_at:Date


    @OneToMany(()=>Tenderapplication,tenderapplication=>tenderapplication.procuremententity)
    applications:Tenderapplication[]

    @OneToMany(()=>EntityUser,entityuser=>entityuser.procuremententity)
    users:EntityUser[]

    @OneToMany(()=>Annualplan,annualplan=>annualplan.procuremententity)
    annualplans:Annualplan[]

    @OneToMany(()=>Procurementmanagementunit,procurementmanagementunit=>procurementmanagementunit.procuremententity)
    pmu:Procurementmanagementunit[]

    @OneToMany(()=>Evaluationcommitte,evaluationcommitte=>evaluationcommitte.procuremententity)
    evaluationcommitte:Evaluationcommitte[]

    @OneToMany(()=>Authorityapplication,authorityapplication=>authorityapplication.procuremententity)
    authorityapplications:Authorityapplication[]

}
