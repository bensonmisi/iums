import { Injectable } from '@nestjs/common';
import { TenderInvoicingService } from '../helperService/tenderinvoicingService';

@Injectable()
export class NoticeinvoicingService {

    async addItem(id:number,userId:number){
        const tenderinvoicingService = new TenderInvoicingService()
        return await tenderinvoicingService.addFee(id,userId)
    }

    async removeItem(id:number,userId:number){
        const tenderinvoicingService = new TenderInvoicingService()
        return await tenderinvoicingService.remove(id,userId)
       }
}
