import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { group } from 'console';
import { Noticefee } from 'src/noticefee/entities/noticefee.entity';
import { Tenderapplication } from 'src/tenderapplication/entities/tenderapplication.entity';
import { createQueryBuilder, Raw, Repository } from 'typeorm';

var moment = require('moment');
@Injectable()
export class BidbondmanagementService {
    constructor(
        @InjectRepository(Tenderapplication) private readonly tenderapplicationRepository:Repository<Tenderapplication>,
        @InjectRepository(Noticefee) private readonly noticefeeRepository:Repository<Noticefee>
    ){}

    async getLists(status:string){
         let query={}
         const currentDate = moment().format('YYYY-MM-DD hh:mm:ss')
         if(status==='ACTIVE'){


            query=Object.assign({status:status,name:'BIDBOND', maturityDate:  Raw((alias) => `${alias} >= :date `, { date:currentDate })})
   
         }
         else if(status==='AWAITING')
         {
            query=Object.assign({refund:'Y',name:'BIDBOND',status:'ACTIVE',refunded:'N', maturityDate:  Raw((alias) => `${alias} <= :date `, { date:currentDate })}) 
         }
         else{
            query=Object.assign({refund:'Y',name:'BIDBOND',status:'ACTIVE',refunded:'Y', maturityDate:  Raw((alias) => `${alias} <= :date `, { date:currentDate})}) 
          
         }

         return await this.noticefeeRepository.find({where:query,relations:['notice','tenderapplication','currency']})
    
    }

    async getDetails(id:number){
        
        const record = await this.tenderapplicationRepository.findOne({where:{id:id}})
        return await this.tenderapplicationRepository.find({where:{tendernumber:record.tendernumber,status:'PAID',type:'BIDBOND'},relations:['account','currency']})
            
    }

    async getList(){
       
      const records = await createQueryBuilder(Tenderapplication,'tenderapplication')
                            .leftJoinAndSelect('tenderapplication.currency','currency')
                            .leftJoinAndSelect('tenderapplication.procuremententity','procuremententity')
                            .where('tenderapplication.status=:status',{status:'PAID'})
                            .andWhere('tenderapplication.type=:type',{type:'BIDBOND'})
                            .groupBy('tenderapplication.tendernumber')
                            .orderBy('tenderapplication.id',"DESC")
                            .getMany()

             
          let array =[]
        if(records.length>0){
               records.forEach(async record=>{
                   const entity = record.procuremententity ? record.procuremententity.name :'-'   
                   let maturitydate = moment(record.closingDate).add(Number(record.validityperiod),'days').format('YYYY-MM-DD hh:mm:ss') 
                   let check = moment(maturitydate).isSameOrAfter(moment().format('YYYY-MM-DD hh:mm:ss'))
                   let days = "";

                   if(check){
                    days = moment(maturitydate).endOf('day').fromNow() 
                   }
                  let status ="ACTIVE"
                   if(!check){
                       status='MATURED'
                       days = moment(maturitydate).startOf('day').fromNow() 
                   }
                            
                   const el = {id:record.id,tendernumber:record.tendernumber,entity:entity,closingdate:record.closingDate,maturitydate:maturitydate,validityperiod:record.validityperiod,status:status,days:days}
                    array.push(el)
                })
        }

        return array 
    }
}
