import { Noticefee } from "src/noticefee/entities/noticefee.entity";
import { Tenderapplication } from "src/tenderapplication/entities/tenderapplication.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Bidbondrefundlist extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    noticefeeId:number

    @Column()
    procuremententityId:number

    @Column({default:'PENDING'})
    status:string

    @Column()
    initiator:number

    @Column({nullable:true})
    processedby:number

    @Column({nullable:true})
    processed_at:Date

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @ManyToOne(()=>Noticefee)
    noticefee:Noticefee


}
