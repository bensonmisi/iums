import { Tenderapplication } from "src/tenderapplication/entities/tenderapplication.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Tenderfeetype extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column({nullable:true})
    required:string

    @Column({nullable:true})
    rule:string
    
    @Column({default:'ACTIVE'})
    status:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @OneToMany(()=>Tenderapplication,tenderapplication=>tenderapplication.tenderfeetype)
    applications:Tenderapplication[]


}
