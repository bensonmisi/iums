import { Injectable } from '@nestjs/common';
import { HelperService } from 'src/helper/helper.service';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { User } from 'src/user/entities/user.entity';
import * as moment from 'moment'
import { Tenderapplication } from 'src/tenderapplication/entities/tenderapplication.entity';
import { In } from 'typeorm';
import { Account } from 'src/accounts/entities/account.entity';

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

        return {account:account,wallet:wallet,registrations:registrations,bidbonds:bidbonds,applications:applications}
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
}
