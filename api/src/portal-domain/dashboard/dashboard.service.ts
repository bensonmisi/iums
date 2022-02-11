import { Injectable } from '@nestjs/common';
import { HelperService } from 'src/helper/helper.service';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { User } from 'src/user/entities/user.entity';
import * as moment from 'moment'
import { Tenderapplication } from 'src/tenderapplication/entities/tenderapplication.entity';
import { In, MoreThanOrEqual } from 'typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { Supplierinvoice } from 'src/supplierinvoice/entities/supplierinvoice.entity';
import { Contact } from 'src/contacts/entities/contact.entity';
import { Directorate } from 'src/directorate/entities/directorate.entity';
import { Mailinglist } from 'src/mailinglist/entities/mailinglist.entity';
import { Documentcomment } from 'src/documentcomments/entities/documentcomment.entity';

@Injectable()
export class DashboardService {
    constructor(private readonly helperService:HelperService){}
    async getData(userId:number){
        const user = await User.findOne({where:{id:userId}})
        const account = await Account.findOne({where:{id:user.accountId},relations:['suppliertype','directors','profile','contact']})
        /**
         * calculate wallet balances
         */

       const wallet = await this.walletBalance(user.accountId)

        /**
         * get registrations  data
         */

        const registrations = await this.registrationData(user.accountId)
        /**
         * get bidbonds applications
         */
         const bidbonds = await this.bidbondData(user.accountId)
        /**
         * get tender fees application
         */
        const applications = await this.tenderfees(user.accountId)
        const awaiting = await this.awaitinginvoices(user.accountId)

        const contacts = await this.contacts(user.accountId)

        const directors = await this.directors(user.accountId)

        const maillist = await this.maillist(user.accountId)
        const comments = await this.comments(user.accountId)
         let redirect = false
         if(directors.length == 0 || contacts ==null || maillist==null){
           redirect = true
         }
        return {account:account,wallet:wallet,comments:comments,maillist:maillist,registrations:registrations,bidbonds:bidbonds,applications:applications,awaiting:awaiting,contacts:contacts,directors:directors,redirect:redirect}
    }

    async walletBalance(accountId:number){
      return await this.helperService.get_suspense_balances(accountId)
    }

    async registrationData(accountId:number){
        var today = new Date();
        const year = today.getFullYear()
        return  await Supplier.find({where:{accountId:accountId,expire_year:year},relations:['category']})
    }
    async bidbondData(accountId:number){
     return  await Tenderapplication.find({where:{accountId:accountId,type:'BIDBOND'},relations:['currency']})
    }

    async tenderfees(accountId:number){
        return  await Tenderapplication.find({where:{accountId:accountId,type:In(['ESTABLISHMENT FEE','SPOC','CONTRACT FEE'])},relations:['currency']})
    }

    async contacts(accountId:number){
        return await Contact.findOne({where:{accountId:accountId}})
    }

    async directors(accountId:number){
        return await Directorate.find({where:{accountId:accountId}})
    }

    async awaitinginvoices(accountId:number){
        
        const today = new Date()
        const year = today.getFullYear()
        const invoices = await Supplierinvoice.find({where:{accountId:accountId,year:MoreThanOrEqual(year),status:'AWAITING'},relations:['currency','category']})
       return invoices
    }
   
    async comments (accountId:number){
        return await Documentcomment.find({where:{accountId:accountId},order:{id:'DESC'}})
    }
    async maillist(accountId:number){
        return await Mailinglist.findOne({where:{accountId:accountId}})
    }
}
