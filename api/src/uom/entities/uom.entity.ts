import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Uom extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true})
    name:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    update_at:Date
}
