import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Module extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @Column()
    icon:string
    @Column()
    widget:string
    @Column({default:'PENDING'})
    status:string
    @Column()
    description:string
    
    @CreateDateColumn()
    created_at:Date 
    @UpdateDateColumn()
    updated_at:Date

}
