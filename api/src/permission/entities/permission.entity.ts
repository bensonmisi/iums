import { Submodule } from "src/submodule/entities/submodule.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    submoduleId:number
    @Column({unique:true})
    name:string
    @CreateDateColumn()
    created_at:Date
    @UpdateDateColumn()
    updated_at:Date

    @ManyToOne(()=>Submodule,submodule=>submodule.permission)
    submodule:Submodule
}
