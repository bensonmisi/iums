import { Accountdocument } from "src/accountdocuments/entities/accountdocument.entity";
import { Suppliertype } from "src/suppliertype/entities/suppliertype.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class Document extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

     @Column()
     locality:string

     @Column()
     name:string

     @Column()
     pages:number

     @Column()
     filetype:string

     @Column()
     filesize:string
     @Column()
     suppliertypeId:number
     
     @CreateDateColumn()
     created_at:Date

     @UpdateDateColumn()
     updated_at:Date
     
     @ManyToOne(()=>Suppliertype,suppliertype=>suppliertype.documents)
     suppliertype:Suppliertype

     @OneToMany(()=>Accountdocument,accountdocument=>accountdocument.account)
     account:Accountdocument[]


}
