import { Category } from "src/categories/entities/category.entity";
import { Notice } from "src/notice/entities/notice.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Noticecategory extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    noticeId:number

    @Column()
    categoryId:number

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @ManyToOne(()=>Notice,notice=>notice.noticecategory)
    notice:Notice

    @ManyToOne(()=>Category,{eager:true})
    category:Category


}
