import { Injectable } from '@nestjs/common';
import { TenderReceiptingHelperService } from '../helperService/tenderReceiptingService';

@Injectable()
export class TenderreceiptingService {

    async getReceipts(invoicenumber:string,userId:number){
        const helper = new TenderReceiptingHelperService()
        return await helper.getData(invoicenumber,userId)
    }

    async settle(formdata:any,userId:number){
        const helper = new TenderReceiptingHelperService()
        return await helper.settle(formdata.invoicenumber,formdata.suspenseId,userId)
    }
}
