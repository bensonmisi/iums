import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterDto } from 'src/tenderrevenuereport/dto/filter.dto';
import { Tenderinvoice } from 'src/tenderinvoice/entities/tenderinvoice.entity';
import { In, Raw, Repository } from 'typeorm';
import * as moment from 'moment'

@Injectable()
export class TenderrevenuereportService {
constructor(@InjectRepository(Tenderinvoice) private readonly tenderinvoiceRepository:Repository<Tenderinvoice>){}

async latest():Promise<Tenderinvoice[]>{
    var today = new Date();
    var date1 = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var date2 = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+1);
    let datequery=Object.assign({ updated_at:  Raw((alias) => `${alias} BETWEEN :date AND :date2 `, { date: date1 ,date2: date2  })})
    let statusquery=Object.assign({status:'PAID'})
    let   yearquery=Object.assign({year:today.getFullYear()})
    let currencyquery=Object.assign({currencyId:2})
    let descriptionquery=Object.assign({description:In(['SPOC','CONTRACT FEE','ESTABLISHMENT FEE'])})
    
    const query={
        ...datequery,
        ...statusquery,
        ...yearquery,
        ...currencyquery,
        ...descriptionquery
    }  

    const invoices = await this.tenderinvoiceRepository.find({where:query,relations:['account','currency']})
    return invoices
}

async filter(filterDto:FilterDto):Promise<Tenderinvoice[]>{
    var today = new Date();
    let date1 = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let date2 = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+1);
    let year = today.getFullYear()
    let currency = 2
    if(filterDto.startdate){
        date1 = moment(filterDto.startdate).format('YYYY-MM-DD')
    }
    if(filterDto.enddate){
        date2 = moment(filterDto.enddate).format('YYYY-MM-DD')
    }
    if(filterDto.year){
      year = filterDto.year
    }
    if(filterDto.currencyId){
        currency = filterDto.currencyId
    }
    let datequery=Object.assign({ updated_at:  Raw((alias) => `${alias} BETWEEN :date AND :date2 `, { date: date1 ,date2: date2  })})
    let statusquery=Object.assign({status:'PAID'})
    let   yearquery=Object.assign({year:year})
    let currencyquery=Object.assign({currencyId:currency})
    let descriptionquery=Object.assign({description:In(['SPOC','CONTRACT FEE','ESTABLISHMENT FEE'])})
    
    const query={
        ...datequery,
        ...statusquery,
        ...yearquery,
        ...currencyquery,
        ...descriptionquery
    }  

    const invoices = await this.tenderinvoiceRepository.find({where:query,relations:['account','currency']})
    return invoices  
}

}
