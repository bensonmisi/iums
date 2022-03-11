import { Injectable } from '@nestjs/common';
import { Individualplan } from 'src/entity-domain/individualplan/entities/individualplan.entity';
import { Noticeaward } from 'src/entity-domain/noticeawards/entities/noticeaward.entity';
import { Notice } from 'src/notice/entities/notice.entity';
import { Procuremententity } from 'src/procuremententity/entities/procuremententity.entity';

@Injectable()
export class WelcomeService {

    async getEntitylist(){
        return await Procuremententity.find()
    }

    async getPlan(id:number){
        const today = new Date()
        const currentyear = today.getFullYear()
        const plan = await Individualplan.find({where:{procuremententityId:id,year:currentyear},relations:['annualplan']})

        let array = []

        if(plan.length>0){
            plan.forEach(pl=>{
                const el = {month:pl.date_of_purchase,description:pl.annualplan ? pl.annualplan.description :"",quantity:pl.quantity,rate:pl.annualplan.rate_of_purchase}
                array.push(el)
            })
        }

        return array
    }

    async getAwards(){
         return  await Notice.find({where:{status:'AWARDED'},order:{id:'DESC'},relations:['noticetype','procuremententity','noticeproduct']}) 
        
    }
}
