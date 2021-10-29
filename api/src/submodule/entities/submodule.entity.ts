import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Submodule extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    moduleId:number
    @Column()
    name:string
    @Column()
    icon:string
    @Column()
    url:string
    @CreateDateColumn()
    created_at:Date
    @UpdateDateColumn()
    updated_at:Date


}
