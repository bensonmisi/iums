import { Role } from "src/role/entities/role.entity";
import { Submodule } from "src/submodule/entities/submodule.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Permission extends BaseEntity {
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

    @ManyToMany(()=>Role,role=>role.premissions)
    @JoinTable({
        name: "permission_roles",
        joinColumn: { name: "permissionId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "roleId" }
    })
    role:Role[]
    
    @ManyToOne(()=>Submodule,submodule=>submodule.permission)
    submodule:Submodule
}
