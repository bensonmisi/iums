import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { TenderInvoicingService } from '../helperService/tenderinvoicingService';

@Injectable()
export class NoticeinvoicingService {


    async getPending(userId:number){
        const user = await User.findOne({where:{id:userId}})
        const tenderinvoicingService = new TenderInvoicingService()
        return await tenderinvoicingService.getPending(user.accountId)
    }

    async getAll(userId:number){
        const user = await User.findOne({where:{id:userId}})
        const tenderinvoicingService = new TenderInvoicingService() 
        return await tenderinvoicingService.getAll(user.accountId)
    }
    async addItem(id:number,userId:number){
        const tenderinvoicingService = new TenderInvoicingService()
        return await tenderinvoicingService.addFee(id,userId)
    }

    async removeItem(id:number,userId:number){
        const tenderinvoicingService = new TenderInvoicingService()
        return await tenderinvoicingService.remove(id,userId)
       }
}
