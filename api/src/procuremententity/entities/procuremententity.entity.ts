import { Tenderapplication } from "src/tenderapplication/entities/tenderapplication.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Procuremententity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
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
    createdBy:number

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date


    @OneToMany(()=>Tenderapplication,tenderapplication=>tenderapplication.procuremententity)
    applications:Tenderapplication[]

}
