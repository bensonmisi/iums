import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Bidbondperiod {
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true})
    days:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date
}
