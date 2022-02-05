import { Category } from "src/categories/entities/category.entity";
import { Noticecategory } from "src/noticecategory/entities/noticecategory.entity";
import { Noticefee } from "src/noticefee/entities/noticefee.entity";
import { Noticeproduct } from "src/noticeproduct/entities/noticeproduct.entity";
import { Noticetype } from "src/noticetype/entities/noticetype.entity";
import { Procuremententity } from "src/procuremententity/entities/procuremententity.entity";
import { Section } from "src/sections/entities/section.entity";
import { Tenderapplication } from "src/tenderapplication/entities/tenderapplication.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Notice extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    uuid:string

    @Column()
    procuremententityId:number

    @Column()
    sectionId:number

    @Column({unique:true})
    tendernumber:string

    @Column({unique:true})
    tendernumber2:string

    @Column()
    title:string


    @Column()
    closingDate:string

    @Column()
    closingTime:string

    @Column({default:0})
    extention:number

     @Column({nullable:true})
     site_visit_location:string

     @Column({nullable:true})
     site_visit_date:Date

    @Column({nullable:true})
    noticetypeId:number

    @Column({nullable:true})
    filename:string

    @Column({default:'LOCAL'})
    reach:string

    @Column({nullable:true})
    year:number

    @Column({default:'ACTIVE'})
    status:string

    @Column({default:"user"})
    level:string

    @Column({default:0})
    downloads:number

    @Column()
    creator:number

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    
    @ManyToOne(()=>Procuremententity)
    procuremententity:Procuremententity

    @OneToMany(()=>Tenderapplication,tenderapplication=>tenderapplication.notice)
    tenderapplications:Tenderapplication[]

    @OneToMany(()=>Noticefee,noticefee=>noticefee.notice,{onDelete:'CASCADE'})
    noticefee:Noticefee[]

    @ManyToOne(()=>Noticetype,noticetype=>noticetype.notice)
    noticetype:Noticetype[]

    @OneToMany(()=>Noticeproduct,noticeproduct=>noticeproduct.notice,{onDelete:'CASCADE'})
     noticeproduct:Noticeproduct[]

     @OneToMany(()=>Noticecategory,noticecategory=>noticecategory.notice)
     noticecategory:Noticecategory[]

     @ManyToOne(()=>Section)
     section:Section


} 
