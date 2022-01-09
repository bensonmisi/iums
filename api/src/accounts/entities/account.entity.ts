import { Accountdocument } from "src/accountdocuments/entities/accountdocument.entity";
import { Accountprofile } from "src/accountprofile/entities/accountprofile.entity";
import { Banktransaction } from "src/banktransaction/entities/banktransaction.entity";
import { Contact } from "src/contacts/entities/contact.entity";
import { Directorate } from "src/directorate/entities/directorate.entity";
import { Onlinepayment } from "src/onlinepayment/entities/onlinepayment.entity";
import { Supplier } from "src/supplier/entities/supplier.entity";
import { Supplierinvoice } from "src/supplierinvoice/entities/supplierinvoice.entity";
import { Suppliertype } from "src/suppliertype/entities/suppliertype.entity";
import { Suspense } from "src/suspense/entities/suspense.entity";
import { Suspensetransfer } from "src/suspensetransfers/entities/suspensetransfer.entity";
import { Tenderapplication } from "src/tenderapplication/entities/tenderapplication.entity";
import { Tenderinvoice } from "src/tenderinvoice/entities/tenderinvoice.entity";
import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Account extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:true})
    regnumber:string

    @Column({unique:true})
    name:string

    @Column({nullable:true})
    sector:string

    @Column()
    suppliertypeId:number 

    @Column({nullable:true})
    locality:string

    @Column({nullable:true})
    country:string

    @Column({nullable:true})
    city:string

    @Column({nullable:true})
    province:string

    @Column({nullable:true})
    district:string

    @Column({default:0})
    posted:0

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @ManyToOne(()=>Suppliertype,suppliertype=>suppliertype.accounts)
     @JoinColumn()
     suppliertype:Suppliertype

     @OneToMany(()=>User,user=>user.account)
     user:User[]

     @OneToOne(()=>Contact,contact=>contact.account,{
        eager: true
    })
     contact:Contact

     @OneToMany(()=>Accountdocument,document=>document.account)
     accountdocument:Accountdocument[]

     @OneToMany(()=>Accountprofile,profile=>profile.account)
     profile:Accountprofile[]

     @OneToMany(()=>Directorate,directorate=>directorate.account)
     directors:Directorate[]

     @OneToOne(()=>Banktransaction,banktransaction=>banktransaction.account)
     banktransaction:Banktransaction

     @OneToMany(()=>Suspense,suspense=>suspense.account)
     suspense:Suspense[]

     @OneToMany(()=>Suspensetransfer,transfer=>transfer.source)
     fromtransfer:Suspensetransfer[]

     @OneToMany(()=>Suspensetransfer,transfer=>transfer.destination)
     todestination:Suspensetransfer[]

     @OneToMany(()=>Onlinepayment,onlinepayments=>onlinepayments.account)
     onlinepayments:Onlinepayment[]

     @OneToMany(()=>Tenderapplication,tenderapplication=>tenderapplication.account)
     applications:Tenderapplication[]

     @OneToMany(()=>Tenderinvoice,tenderinvoice=>tenderinvoice.account)
     tenderinvoices:Tenderinvoice[]

     @OneToMany(()=>Supplierinvoice,supplierinvoice=>supplierinvoice.account)
     supplierinvoice:Supplierinvoice[]

     @OneToMany(()=>Supplier,supplier=>supplier.account)
     registrations:Supplier[] 





}
