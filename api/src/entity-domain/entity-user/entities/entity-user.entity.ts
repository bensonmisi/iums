import { IsEmail, IsNotEmpty, Min } from "class-validator";
import { Procuremententity } from "src/procuremententity/entities/procuremententity.entity";
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
import { Role } from "src/role/entities/role.entity";
@Entity()
export class EntityUser extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    procuremententityId:number

    @Column()
    name:string

    @Column()
    surname:string

    @Column()
    title:string

    @Column()
    jobtitle:string

    @Column()
    roleId:number

    @Column()
    phonenumber:string
    
    @Column({unique:true})
    email:string

    @Column({nullable:true})
    cv:string

    @Column({nullable:true})
    signature:string

    @Column()
    password:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date
    
    @BeforeInsert()
    async hashPassword() {
    this.password = await bcrypt.hash(this.password,10)
    }

    
 async validatepassword(password:string):Promise<boolean>{       
   return bcrypt.compare(password,this.password);     
}

    @ManyToOne(()=>Role)
    role:Role

    @ManyToOne(()=>Procuremententity,procuremententity=>procuremententity.users)
    procuremententity:Procuremententity
}
