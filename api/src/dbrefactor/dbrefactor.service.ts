import { Injectable } from '@nestjs/common';
import { Tenderapplication } from 'src/tenderapplication/entities/tenderapplication.entity';
import { Tenderinvoice } from 'src/tenderinvoice/entities/tenderinvoice.entity';
import { createQueryBuilder } from 'typeorm';

@Injectable()
export class DbrefactorService {

    async tenderapplications():Promise<any>{
         
          const data = await Tenderapplication.find()
           let array=[]
        const newdata=   data.map(async dt=>{
              const invoice = await Tenderinvoice.findOne({where:{accountId:dt.accountId,tendernumber:dt.tendernumber}})
              if(invoice){
                  const items = {id:dt.id,Tamount:dt.amount,Tstatus:dt.status,Tnumber:dt.tendernumber,invoicenumber:invoice.invoicenumber,tenderapplicationId:invoice.tenderapplicationId,invoiceamount:invoice.amount,invoicestatus:invoice.status}
                   console.log(items)
                  return items
              }
          })

          return newdata

        
    }

    
}
