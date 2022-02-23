import { Authorityapplicationcomment } from "src/authorityapplicationcomments/entities/authorityapplicationcomment.entity";
import { Uploadplan } from "src/entity-domain/uploadplan/entities/uploadplan.entity";
import { Procurementclass } from "src/procurementclass/entities/procurementclass.entity";
import { Procuremententity } from "src/procuremententity/entities/procuremententity.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Authorityapplication extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    procuremententityId:number

    @Column()
    year:number

    @Column({nullable:true})
    procurementclassId:number

    @Column({default:'PENDING'})
    status:string

    @Column()
    entityuserId:number

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @Column({nullable:true})
    administratorId:number

    @ManyToOne(()=>Procurementclass,{eager:true})
    procurementclass:Procurementclass

    @OneToMany(()=>Uploadplan,uploadplan=>uploadplan.authorityapplication)
    plan:Uploadplan

    @ManyToOne(()=>Procuremententity,procuremententity=>procuremententity.authorityapplications)
    procuremententity:Procuremententity

    @OneToMany(()=>Authorityapplicationcomment,authorityapplicationcomment=>authorityapplicationcomment.authorityapplication)
    comments:Authorityapplicationcomment[]

}
