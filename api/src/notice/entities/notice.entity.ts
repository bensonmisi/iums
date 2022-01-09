import { Noticefee } from "src/noticefee/entities/noticefee.entity";
import { Noticeproduct } from "src/noticeproduct/entities/noticeproduct.entity";
import { Noticetype } from "src/noticetype/entities/noticetype.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Notice extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    uuid:string

    @Column()
    procuremententityId:number

    @Column()
    tendernumber:string

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

    @Column({default:'ACTIVE'})
    status:string

    @Column()
    created_by:number

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @OneToMany(()=>Noticefee,noticefee=>noticefee.notice)
    noticefee:Noticefee[]

    @ManyToMany(()=>Noticetype,noticetype=>noticetype.notice)
    noticetype:Noticetype[]

    @OneToMany(()=>Noticeproduct,noticeproduct=>noticeproduct.notice)
     noticeproduct:Noticeproduct[]
}
