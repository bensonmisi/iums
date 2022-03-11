import { HttpException, HttpStatus } from "@nestjs/common"
import { Authorityinvoice } from "src/authorityinvoice/entities/authorityinvoice.entity"
import { Notice } from "src/notice/entities/notice.entity"
import { Noticecategory } from "src/noticecategory/entities/noticecategory.entity"
import { Supplier } from "src/supplier/entities/supplier.entity"
import { Tenderapplication } from "src/tenderapplication/entities/tenderapplication.entity"
import { Tenderfeetype } from "src/tenderfeetype/entities/tenderfeetype.entity"
import { In, MoreThanOrEqual, TreeParent } from "typeorm"
import { Authorityapplication } from "../authorityapplication/entities/authorityapplication.entity"
import * as moment from 'moment'
import { Noticeaward } from "../noticeawards/entities/noticeaward.entity"
import { Noticefee } from "src/noticefee/entities/noticefee.entity"
import { Bidbondrefundlist } from "../bidbonrefundlist/entities/bidbondrefundlist.entity"
import { Noticeproduct } from "src/noticeproduct/entities/noticeproduct.entity"
import { Monthlyreturn } from "../monthlyreturn/entities/monthlyreturn.entity"
import { Monthlyreturndatum } from "../monthlyreturndata/entities/monthlyreturndatum.entity"
import { Annualplan } from "../annualplan/entities/annualplan.entity"
import { Procurementcategory } from "src/procurementcategory/entities/procurementcategory.entity"
export class GeneralHelperService{

    async getProcurementClass(id:number){
        const today = new Date()
        const currentyear = today.getFullYear()
        return await Authorityapplication.findOne({where:{procuremententityId:id,year:MoreThanOrEqual(currentyear)},relations:['procurementclass','plan']});

    }

    async getPendingInvoice(id:number){
        const today = new Date()
        const currentyear = today.getFullYear()        
        return await Authorityinvoice.findOne({where:{procuremententityId:id,expire_year:MoreThanOrEqual(currentyear)},relations:['currency','authorityapplication']})
    }

    async getBidBonds(id:number){
        const feettype = await Tenderfeetype.findOne({where:{name:'BIDBOND'}})
        return  await Tenderapplication.find({where:{tenderfeetypeId:feettype.id,procuremententityId:id},relations:['currency']})
    }

    async getBidbondlist(id:number){
        return  await Bidbondrefundlist.find({where:{procuremententityId:id},relations:['noticefee']})
    }

    async getPublishedNotice(id:number){
        return await Notice.find({where:{procuremententityId:id,status:'PUBLISHED'},order:{id:'DESC'},relations:['noticecategory','section','noticeproduct','noticetype']})
    }

    async getNotices(id:number){
        return await Notice.find({where:{procuremententityId:id},order:{id:'DESC'},relations:['noticecategory','section','noticeproduct','noticetype']})
     
    }
    async getNoticeFees(id:number){
        return await Noticefee.find({where:{noticeId:id},relations:['tenderfeetype','currency']})
    }


    async checkNoticefee(noticefees:any,accountId:number){

        const applications = await Tenderapplication.find({where:{accountId:accountId}})
        
        if(applications.length==0){
            throw new HttpException("No record of tender fee payments found for client",HttpStatus.BAD_REQUEST)
        }
       
       let errors =[]
       let success =[]
        noticefees.forEach(fee=>{
            let  verified = 0
                applications.forEach(app=>{
                  if(app.noticefeeId == fee.noticefeeId && app.code == fee.code){
                       verified = verified+1
                  }
                })
                if(verified>0){
                  success.push({code:fee.code,message:"verified"})
                }else{
                    errors.push({code:fee.code,message:"NOT FOUND"})
                }
    })

    if(errors.length>0){
        let codes ="Required tender fees certificate codes where not found :"
        errors.forEach(err=>{
            codes = codes+","+err.code
        })
        throw new HttpException(codes,HttpStatus.BAD_REQUEST)
    }


    }

    async addTorefundTray(noticeId:number,userId:number){
        const fee = await Tenderfeetype.findOne({where:{name:'BIDBOND'}})
            if(!fee)
            {
               throw new HttpException("BidBond fee not configured",HttpStatus.BAD_REQUEST)
            }
      
        const noticefee = await Noticefee.findOne({where:{tenderfeetypeId:fee.id,noticeId:noticeId}})
        if(noticefee){
             const record = await Bidbondrefundlist.findOne({where:{noticefeeId:noticefee.id}})
             if(!record){
               const created = await Bidbondrefundlist.create({noticefeeId:noticefee.id,procuremententityId:noticefee.notice.procuremententityId,initiator:userId})
               await created.save()
             }
        }
        }

   async  checkProduct(id:number){
      const product = await Noticeproduct.findOne({where:{id:id},relations:['awards']})

      if(product){

         if(product.awards.length>0){
             const notice = await Notice.findOne({where:{id:product.noticeId}})
              notice.status ='AWARDED'
              await notice.save()
         }
      }
   }

    async checkBidderRegistration(noticeid:number,accountId:number,certificatenumber:string){
        const categories = await Noticecategory.find({where:{noticeId:noticeid}})
        const today = new Date()
        const currentyear = today.getFullYear()
        const supplier  = await Supplier.findOne({where:{code:certificatenumber,expire_year:currentyear}})
        if(!supplier){
            throw new HttpException("Registration Certificate verification code was not found",HttpStatus.BAD_REQUEST)
        }
       
        if(supplier.accountId != accountId){
          
            throw new HttpException("Registration certificate does not belong to bidder",HttpStatus.BAD_REQUEST)   
        }



        const expire_date = supplier.expiry_date

        const valid = moment(expire_date).isSameOrAfter(moment.now())

        if(!valid){
            throw new HttpException("Registration certificate has expired should not be used for business",HttpStatus.BAD_REQUEST)    
        }
        
         let checkcategory=false

         if(categories.length>0){
             categories.forEach(cat=>{
                 if(cat.categoryId==supplier.categoryId){
                     checkcategory = true
                 }
             })

             if(!checkcategory){
                throw new HttpException("Registration certificate does not below to bidder",HttpStatus.BAD_REQUEST)   
             }
         }
    
       
    }

    async checkReturn(id:number){

        const month = await this.getReturnMonth()
        const today = new Date()
        const year = today.getFullYear()
         const record = await Monthlyreturn.findOne({where:{procuremententityId:id,year:year,month:month}})
         if(!record){
             return {status:'error',message:"Monthly Return for the month of "+month+" is now due"}
         }else{
             return {status:'success',message:'Your monthly returns are upto date'}
         }

    }

    async getReturnMonth(){
        const currenDate = new Date()
        const month = currenDate.getMonth()-1
         let mon =""
        switch (month) {
            case 0:
               mon="JAN" 
                break;

            case 1:
                mon="FEB" 
                break;
            case 2:
                mon="MAR" 
                break;
            case 3:
                mon="APR" 
                break;
            case 4:
                mon="MAY"
                break;

            case 5:
                mon="JUN"
                break;

            case 6:
                mon="JUL"
                break;
            case 7:
                mon="AUG"
                break;
            case 8:
                mon="SEP"
                break;
            case 9:
                mon="OCT"
                break;
            case 10:
                mon="SEP"
                break;
            case 11:
                mon="NOV"
                break;
            case 12:
                mon="DEC"        
            default:
                break;
        }

        return mon
    }

    async return_consolidated_summary(id:number,procuremententityId:number){
       
        const groups = await Procurementcategory.find()
        const monthlyreturn =  await Monthlyreturn.findOne({where:{id:id,procuremententityId:procuremententityId}})
        let consolidated_data_set=[]
     
        groups.forEach(async(grp)=>{
                 const actual_summary= await this.return_actual_Summary(id,grp.id)
                 const budget_summary = await this.return_budget_summary(procuremententityId,monthlyreturn.month,grp.id)
                 const el ={name:grp.name,actual:actual_summary,budget:budget_summary}
                 
                 consolidated_data_set.push(el) 
         })
         
         return consolidated_data_set
    }

    async return_actual_Summary(id:number,procurementcategoryId:number){
        const data = await Monthlyreturndatum.find({where:{monthlyreturnId:id,procurementcategoryId:procurementcategoryId},relations:['currency','procurementcategory','section','noticetype']})
         let actual_data_set=[]
         if(data.length>0){
            data.forEach(dt=>{
                const el = {currency:dt.currency.name,amount:dt.value}
                actual_data_set.push(el)
            })
           
         }
         return actual_data_set
    }

    async return_budget_summary(procuremententityId:number,month:string,procurementcategoryId:number){
        const currentdate = new Date()
        const year = currentdate.getFullYear()
        const plan = await Annualplan.find({where:{year:year,procuremententityId:procuremententityId,procurementcategoryId:procurementcategoryId},relations:['individualplans','currency']})
        let budget_data_set=[]
       
        if(plan.length>0){
            plan.forEach(pl=>{
                if(pl.individualplans.length>0){
                    pl.individualplans.forEach(ind=>{
                               if(ind.date_of_purchase ==month){
                                    const amount = +pl.cost * ind.quantity
                                   const el = {currency:pl.currency.name,amount:amount}
                                   budget_data_set.push(el)
                               }
                    })    
                }
            })
        }

        return budget_data_set



    }
}