import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Receipt } from 'src/receipt/entities/receipt.entity';
import { Supplierinvoice } from 'src/supplierinvoice/entities/supplierinvoice.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReceiptingService {
    constructor(@InjectRepository(Supplierinvoice) private readonly supplierinvoiceRepository:Repository<Supplierinvoice>,
             @InjectRepository(Receipt) private readonly receiptRepository:Repository<Receipt>
    ){}

    async getData(userId:number):Promise<any>{
        const user = await User.findOne({where:{id:userId}})
        const today = new Date()
        const year = today.getFullYear()
         const invoices = await this.supplierinvoiceRepository.find({where:{accountId:user.accountId,year:year,status:'PENDING'}})
         let totalinvoice = 0
         let totalreceipts=0
         if(invoices.length>0){

             invoices.forEach(inv=>{
                totalinvoice = totalinvoice+Number(inv.cost)
             })

             const receipts = await this.receiptRepository.find({where:{invoicenumber:invoices[0].invoicenumber}})
             if(receipts.length>0){
                 receipts.forEach(receipt=>{
                     totalreceipts  = totalreceipts + Number(receipt.amount)
                 })
             }

         }

         return{totalreceipts,totalinvoice}

    }
}
