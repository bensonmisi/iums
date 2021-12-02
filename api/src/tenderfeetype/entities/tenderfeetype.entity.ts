import { Tenderapplication } from "src/tenderapplication/entities/tenderapplication.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Tenderfeetype {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column({nullable:true})
    required:number
    
    @Column({default:'ACTIVE'})
    status:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @OneToMany(()=>Tenderapplication,tenderapplication=>tenderapplication.tenderfeetype)
    applications:Tenderapplication[]
}
