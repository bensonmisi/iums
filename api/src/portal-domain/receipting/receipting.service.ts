import {Injectable } from '@nestjs/common';
import { SupplierReceiptingService } from '../helperService/SupplierReceiptingService';

@Injectable()
export class ReceiptingService {
    async getData(userId:number):Promise<any>{
     const  suppliereceiptingService = new SupplierReceiptingService()
      return await suppliereceiptingService.getData(userId)

    } 

    async settle(formdata:any,userId:number){
      const  suppliereceiptingService = new SupplierReceiptingService()
    return await suppliereceiptingService.settle(userId,formdata.suspenseId)
    }

 

}
