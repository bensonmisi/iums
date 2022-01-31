import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Registrationoption extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true})
    name:string

    @Column()
    duration:number

    @Column()
    creator:number

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date
}
