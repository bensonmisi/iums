import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id:number
    @Column({unique:true})
    name:string
    @CreateDateColumn()
    created_at:Date
    @UpdateDateColumn()
    updated_at:Date
}
