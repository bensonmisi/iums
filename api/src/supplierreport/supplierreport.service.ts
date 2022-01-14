import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import moment from 'moment';
import { Supplierinvoice } from 'src/supplierinvoice/entities/supplierinvoice.entity';
import { Raw, Repository } from 'typeorm';

@Injectable()
export class SupplierreportService {

    constructor(@InjectRepository(Supplierinvoice) private readonly supplierinvoiceRepository:Repository<Supplierinvoice>){}

    async getReports(){
     return await this.supplierinvoiceRepository.find({where:{status:"PAID",year:moment().year,updated_at:moment().format('YYYY-mm-dd hh:mm:ss')},relations:['currency','account','receipts','category']})  
    }

    async filterReport(formdata:any){
        let datequery={}
        let settlementquery={}
        let statusquery={}
        let currencyquery={}
        if(formdata.fromdate && formdata.todate ){
            datequery=Object.assign({ updated_at:  Raw((alias) => `${alias} BETWEEN :date AND :date2 `, { date: formdata.fromdate,date2:formdata.todate })})
           }
        if(formdata.settlement){
            settlementquery=Object.assign({settlement:formdata.settlement})
        }

        if(formdata.status){
            statusquery=Object.assign({status:formdata.status})
        }
        if(formdata.currency){
            currencyquery=Object.assign({currencyId:formdata.currency})
        }
        const query={
            ...datequery,
            ...settlementquery,
            ...statusquery
        }

        return await this.supplierinvoiceRepository.find({where:query,relations:['currency','account','receipts','category']})  
  
    }

}
