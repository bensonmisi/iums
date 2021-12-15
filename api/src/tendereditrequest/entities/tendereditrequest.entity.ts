 import {Entity,BaseEntity, PrimaryGeneratedColumn, Column} from 'typeorm'
@Entity()
export class Tendereditrequest extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    tenderapplicationId:number

    @Column()
    tendernumber:string

    
}
