import { Procuremententity } from "src/procuremententity/entities/procuremententity.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Procurementmanagementunit extends BaseEntity {
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

    @Column({unique:true})
    email:string

    @Column()
    phonenumber:string

    @Column({nullable:true})
    signature:string

    @Column({default:'N'})
    hasaccount:string

    @Column({nullable:true})
    cv:string

    @Column()
    entityuserId:number

   @Column({default:'PENDING'})
   status:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date


    @ManyToOne(()=>Procuremententity,procuremententity=>procuremententity.pmu)
    procuremententity:Procuremententity

    
}
