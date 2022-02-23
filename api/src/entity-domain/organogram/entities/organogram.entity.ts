import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Organogram extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    procuremententityId:number

    @Column()
    entityuserId:number

    @Column()
    full:string

    @Column()
    pmu:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date
}
