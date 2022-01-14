import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import moment from 'moment';
import { HelperService } from 'src/helper/helper.service';
import { Receipt } from 'src/receipt/entities/receipt.entity';
import { Supplierinvoice } from 'src/supplierinvoice/entities/supplierinvoice.entity';
import { In, Raw, Repository } from 'typeorm';

@Injectable()
export class SupplierrevenuereportService {
    constructor(
        @InjectRepository(Supplierinvoice) private readonly supplierreportRepository:Repository<Supplierinvoice>,
        private readonly helperService:HelperService
    ){}

    async getReports(){
        return await this.supplierreportRepository.find({where:{status:"PAID",year:moment().year,updated_at:moment().format('YYYY-mm-dd hh:mm:ss')},relations:['currency','account','receipts','category']})  
       }
   
       async filterReport(formdata:any){
           let datequery={}
           let settlementquery={}
           let statusquery=Object.assign({status:'PAID'})
           let currencyquery={}
           if(formdata.fromdate && formdata.todate ){
               datequery=Object.assign({ updated_at:  Raw((alias) => `${alias} BETWEEN :date AND :date2 `, { date: formdata.fromdate,date2:formdata.todate })})
              }
           if(formdata.settlement){
               settlementquery=Object.assign({settlement:formdata.settlement})
           }
               
          
           if(formdata.currency){
               currencyquery=Object.assign({currencyId:formdata.currency})
           }
           const query={
               ...datequery,
               ...settlementquery,
               ...statusquery
           }
   
       const invoices =  await this.supplierreportRepository.find({where:query,relations:['currency','account']})  
      
        const invoicenumbers=[]
        invoices.forEach(invoice=>{
                 if(!invoicenumbers.includes(invoice.invoicenumber)){
                  invoicenumbers.push(invoice.invoicenumber)
                } 
          })

          const records = await this.getData(invoicenumbers,invoices)
        console.log()
        return records


        
     
      
       }

       async getReceipts(invoicenumbers:any){
           const receipts =   await this.helperService.getReceipts(invoicenumbers)
          return receipts
       }

       async getData(invoicenumbers:any,invoices:Supplierinvoice[]){
        const records =  await  Receipt.find({where:{invoicenumber:In(invoicenumbers)}})
        let grouped =[]
          const receipts = records
        for (let index = 0; index < invoicenumbers.length; index++) {
            const inv = invoicenumbers[index];
            let filteredinvoices = invoices.filter(invoice=>{ return invoice.invoicenumber == inv })
            let filteredreceipts =  receipts.filter(receipt=>{ return receipt.invoicenumber == inv }) 
              grouped.push({inv:inv,data:{filteredinvoices,filteredreceipts}})
        }
          
         return grouped
       }
}
