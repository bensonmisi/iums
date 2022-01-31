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
        var today = new Date();
var date1 = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var date2 = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+1);
let datequery=Object.assign({ updated_at:  Raw((alias) => `${alias} BETWEEN :date AND :date2 `, { date: date1 ,date2: date2  })})
let statusquery=Object.assign({status:'PAID'})
let   yearquery=Object.assign({year:today.getFullYear()})
let currencyquery=Object.assign({currencyId:2})

const query={
    ...datequery,
    ...statusquery,
    ...yearquery,
    ...currencyquery
}
        
        const invoices =  await this.supplierreportRepository.find({where:query,relations:['currency','account']})  
       
        const invoicenumbers=[]
        invoices.forEach(invoice=>{
                 if(!invoicenumbers.includes(invoice.invoicenumber)){
                  invoicenumbers.push(invoice.invoicenumber)
                } 
          })

          const records = await this.getData(invoicenumbers,invoices)       
        return records 
    
    }
   
       async filterReport(formdata:any){
           let datequery={}
           let settlementquery={}
           let statusquery=Object.assign({status:'PAID'})
           let currencyquery=Object.assign({currencyId:2})
           let yearquery={}
           if(formdata.fromdate && formdata.todate ){
               datequery=Object.assign({ updated_at:  Raw((alias) => `${alias} BETWEEN :date AND :date2 `, { date:formdata.fromdate,date2:formdata.todate })})
              }
           if(formdata.settlement){
               settlementquery=Object.assign({settlement:formdata.settlement})
           }

           if(formdata.regyear){
               yearquery=Object.assign({year:formdata.regyear})
           }
               
          
           if(formdata.currency){
               currencyquery=Object.assign({currencyId:formdata.currency})
           }
           const query={
               ...datequery,
               ...settlementquery,
               ...statusquery,
               ...currencyquery,
               ...yearquery
           }
       
       const invoices =  await this.supplierreportRepository.find({where:query,relations:['currency','account'],order:{updated_at:'DESC'}})  
       console.log(invoices)
        const invoicenumbers=[]
        invoices.forEach(invoice=>{
                 if(!invoicenumbers.includes(invoice.invoicenumber)){
                  invoicenumbers.push(invoice.invoicenumber)
                } 
          })

          const records = await this.getData(invoicenumbers,invoices)
       
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
