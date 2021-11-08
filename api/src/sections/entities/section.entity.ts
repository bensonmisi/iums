import { Category } from "src/categories/entities/category.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Section {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @CreateDateColumn()
    created_at:Date
    @UpdateDateColumn()
    updated_at:Date

    @OneToMany(()=>Category,category=>category.section,{onDelete:'CASCADE'})
    category:Category[]
}
