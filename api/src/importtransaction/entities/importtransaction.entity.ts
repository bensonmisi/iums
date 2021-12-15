import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Importtransaction extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    filepath:string

    @Column()
    administratorId:number

    @Column({default:'PENDING'})
    status:string
    
    @Column({default:0})
    records:number
    
    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

}
