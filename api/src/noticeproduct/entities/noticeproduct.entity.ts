import { Notice } from "src/notice/entities/notice.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Noticeproduct {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    noticeId:number

    @Column({type:'text'})
    description

    @Column()
    quantity:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date


    @ManyToOne(()=>Notice,notice=>notice.noticeproduct)
    notice:Notice
    
}
