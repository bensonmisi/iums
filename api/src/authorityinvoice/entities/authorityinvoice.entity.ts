import { Currency } from "src/currency/entities/currency.entity";
import { Authorityapplication } from "src/entity-domain/authorityapplication/entities/authorityapplication.entity";
import { Authorityinvoiceupload } from "src/entity-domain/authorityinvoiceupload/entities/authorityinvoiceupload.entity";
import { Procuremententity } from "src/procuremententity/entities/procuremententity.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Authorityinvoice extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    authorityapplicationId:number

    @Column()
    procuremententityId:number

    @Column()
    invoicenumber:string

    @Column()
    currencyId:number

    @Column()
    cost:string

    @Column()
    expire_year:number

    @Column({default:'PENDING'})
    status:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @ManyToOne(()=>Currency,{eager:true})
    currency:Currency

    @ManyToOne(()=>Authorityapplication,{eager:true})
    authorityapplication:Authorityapplication

    @ManyToOne(()=>Procuremententity)
    procuremententity:Procuremententity

    @OneToMany(()=>Authorityinvoiceupload,authorityinvoiceupload=>authorityinvoiceupload.authorityinvoice)
    authorityinvoiceupload:Authorityinvoiceupload

    

}
