import { HttpException, HttpStatus } from "@nestjs/common";
import { Account } from "src/accounts/entities/account.entity";
import { Bankdetail } from "src/bankdetails/entities/bankdetail.entity";
import { Bidbondthreshold } from "src/bidbondthreshold/entities/bidbondthreshold.entity";
import { HelperService } from "src/helper/helper.service";
import { Notice } from "src/notice/entities/notice.entity";
import { Noticecategory } from "src/noticecategory/entities/noticecategory.entity";
import { Noticefee } from "src/noticefee/entities/noticefee.entity";
import { Supplier } from "src/supplier/entities/supplier.entity";
import { Tenderfeetype } from "src/tenderfeetype/entities/tenderfeetype.entity";
import { Tenderinvoice } from "src/tenderinvoice/entities/tenderinvoice.entity";
import { User } from "src/user/entities/user.entity";
import { In } from "typeorm";

export class TenderInvoicingService{

    async getPending(accountId:number){
        return Tenderinvoice.find({where:{accountId:accountId}})
    }

    async addFee(id:number,userId:number){
        const noticefee = await Noticefee.findOne({where:{id:id},relations:['notice','tenderfeetype','bidbondperiod']})
        const user = await User.findOne({where:{id:userId},relations:['account']})
        if(!user){
            throw new HttpException("UNAUTHORIZED TO ACCESS RESOURCE",HttpStatus.BAD_REQUEST)
        }



        if(user.account.locality.toUpperCase() !=='LOCAL')
        {
               if(noticefee.notice.reach.toUpperCase() ==='LOCAL'){
                   throw new HttpException("Tender open to local bidders only",HttpStatus.BAD_REQUEST)
               }
        }
        

         if(!noticefee){
          throw new HttpException("Tender fee not found",HttpStatus.BAD_REQUEST)
         }

         /**
          * 
          */
        await this.checkbankaccount(user.accountId)
         /**
         * check if bidder is registered
         */
        await this.checkRegistration(noticefee,user.accountId)
        /**
        * check if the fee type has a required fee
        */
      
        await this.checkItem(noticefee.id,user.accountId)
        let type ='NONREFUNDABLE'

        if(noticefee.tenderfeetype.name =='BIDBOND'){
            type ="REFUNDABLE"
        }

        await this.addItem(user.accountId,noticefee.notice.tendernumber,noticefee.tenderfeetype.name,noticefee.id,type,noticefee.currencyId,noticefee.notice.year,noticefee.amount,noticefee.notice.procuremententityId)
      
         
        await this.checkRequiredFee(noticefee,user.account)

        return {status:"success",message:"Invoice successfully generated"}




    }

    async checkbankaccount(accountId:number){
      const record = await Bankdetail.findOne({where:{accountId:accountId}})
      if(!record){
        throw new HttpException('Please enter company banking details. Please note we will use these details to process any refunds back to you',HttpStatus.PRECONDITION_FAILED)
      }
    }

    async remove(id:number,userId:number){
        const user = await User.findOne({where:{id:userId}})
        const item = await Tenderinvoice.findOne({where:{id:id,accountId:user.accountId}})
        if(item.status==='PENDING'){
            await Tenderinvoice.delete({accountId:user.accountId,status:'PENDING'})
            return {status:"success",message:"successfully deleted invoice"}
        }

        throw new HttpException("Invoice not in PENDING state cannot be deleted",HttpStatus.BAD_REQUEST)
    }

    async checkRequiredFee(noticefee:Noticefee,account:Account){
      
        if(noticefee.tenderfeetype.required != null){
            if(noticefee.tenderfeetype.required==='ESTABLISHMENT FEE'){
             
                const requiredfee = await Tenderfeetype.findOne({where:{name:'ESTABLISHMENT FEE'}})
               const requirednoticefee =  await Noticefee.findOne({where:{noticeId:noticefee.noticeId,tenderfeetypeId:requiredfee.id}})
               const checkfee = await this.checkItem(requirednoticefee.id,account.id)
               if(!checkfee){
                   throw new HttpException("Item already added to invoice",HttpStatus.BAD_REQUEST)
               }

               await this.addItem(account.id,noticefee.notice.tendernumber,requiredfee.name,requirednoticefee.id,'NONREFUNDABLE',noticefee.currencyId,noticefee.notice.year,requirednoticefee.amount,noticefee.notice.procuremententityId)
            }

            return 0
        }

        return 0 

    }



    async checkRegistration(noticefee:Noticefee,accountId:number){
      const requiredCategories = await Noticecategory.find({where:{noticeId:noticefee.noticeId},relations:['category']})

      /**
       * if there are required categories check if user is registered to those categories, else check if use is registered to atlease one category 
       */
       const today = new Date()
       const year = today.getFullYear()
       let requied_category_array=[]

       if(requiredCategories.length>0){
            requiredCategories.forEach(cat=>{
                requied_category_array.push(cat.categoryId)
            })

           const registrations = await Supplier.find({where:{expire_year:year,accountId:accountId,categoryId:In(requied_category_array)}})

            if(registrations.length==0){
                throw new HttpException("You are not registered to the specified categories required to participate in this tender",HttpStatus.BAD_REQUEST)
            }
            return true
            
       }else{
        const registrations = await Supplier.find({where:{expire_year:year,accountId:accountId}})
        if(registrations.length==0){
            throw new HttpException("You need to be registered supplier  to participate in this tender",HttpStatus.BAD_REQUEST)
        }
        return true

       }
    }

    async checkItem(noticefeeId:number,accountId:number){
        const record = await Tenderinvoice.findOne({where:{noticefeeId:noticefeeId,accountId:accountId}})

        if(record){
            return false
        }
        return true
    }

    async addItem(accountId:number,tendernumber:string,description:string,noticefeeId:number,type:string,currencyId:number,year:number,amount:string,procuremententityId:number){
        const tenderinvoice = new Tenderinvoice()
        const helperService = new HelperService()
        const invoicenumber = await helperService.generate_tender_invoice_number(accountId)

        tenderinvoice.invoicenumber = invoicenumber
        tenderinvoice.accountId = accountId
        tenderinvoice.tendernumber = tendernumber
        tenderinvoice.description = description
        tenderinvoice.noticefeeId = noticefeeId
        tenderinvoice.type = type
        tenderinvoice.currencyId = currencyId
        tenderinvoice.year = year
        tenderinvoice.amount = amount,
        tenderinvoice.procuremententityId = procuremententityId

        await tenderinvoice.save()
    }
}