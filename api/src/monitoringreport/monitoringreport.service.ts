import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GeneralHelperService } from 'src/entity-domain/EntityHelperService/generalHelperService';
import { Individualplan } from 'src/entity-domain/individualplan/entities/individualplan.entity';
import { Monthlyreturn } from 'src/entity-domain/monthlyreturn/entities/monthlyreturn.entity';
import { Monthlyreturndatum } from 'src/entity-domain/monthlyreturndata/entities/monthlyreturndatum.entity';
import { Noticetype } from 'src/noticetype/entities/noticetype.entity';
import { Procurementcategory } from 'src/procurementcategory/entities/procurementcategory.entity';
import { Procuremententity } from 'src/procuremententity/entities/procuremententity.entity';
import { Section } from 'src/sections/entities/section.entity';
import { FilterMonitoringDto } from './dto/filter-monitoring-dto';
import { ReportMonitoringDto } from './dto/report-monitoring-dto';

@Injectable()
export class MonitoringreportService {

    async getData(){
      const entities = await Procuremententity.find({relations:['monthlyreturns']})
          const helperService = new GeneralHelperService()
          const month = await helperService.getReturnMonth()
          const currentdate = new Date()
          const currentyear = currentdate.getFullYear()
         let data_set=[]
         entities.forEach(enty=>{
                      let submitted = false
                     if(enty.monthlyreturns.length>0){
                           enty.monthlyreturns.forEach(mnth=>{
                               if(mnth.month==month && mnth.year == currentyear){
                                   submitted = true
                               }
                           })
                     }

                     let el ={id:enty.id,name:enty.name,submitted:submitted}
                data_set.push(el)
         })

         return {dataset:data_set,month:month,year:currentyear} 

    }

    async filterData(filterData:FilterMonitoringDto){
        const entities = await Procuremententity.find({relations:['monthlyreturns']})
            const helperService = new GeneralHelperService()
           let data_set=[]
           entities.forEach(enty=>{
                        let submitted = false
                       if(enty.monthlyreturns.length>0){
                             enty.monthlyreturns.forEach(mnth=>{
                                 if(mnth.month==filterData.month && mnth.year == filterData.year){
                                     submitted = true
                                 }
                             })
                       }
  
                       let el ={id:enty.id,name:enty.name,submitted:submitted}
                  data_set.push(el)
           })
  
           return {dataset:data_set,month:filterData.month,year:filterData.year} 
  
      }

    async getReport(filtermonitoringDto:ReportMonitoringDto){
        const helperService = new GeneralHelperService()
        const monthlyreturn =  await Monthlyreturn.findOne({where:{month:filtermonitoringDto.month,year:filtermonitoringDto.year,procuremententityId:filtermonitoringDto.procuremententityId},relations:['monthlyreturndata']})
       
        if(!monthlyreturn){
            throw new HttpException("Monthly return not found",HttpStatus.BAD_REQUEST)
        }
         const returns = await Monthlyreturndatum.find({where:{monthlyreturnId:monthlyreturn.id},relations:['currency','procurementcategory','section','noticetype','awards']});
        const entity = await Procuremententity.findOne({where:{id:filtermonitoringDto.procuremententityId}})
        const plans = await Individualplan.find({where:{procuremententityId:entity.id,year:monthlyreturn.year,date_of_purchase:monthlyreturn.month},relations:['annualplan']})        
        const groups = await Procurementcategory.find()
        const noticetypes = await Noticetype.find()
        const sections = await Section.find()
        return {returns:returns,plans:plans,groups:groups,noticetypes:noticetypes,entity:entity,sections:sections}


    }
}
