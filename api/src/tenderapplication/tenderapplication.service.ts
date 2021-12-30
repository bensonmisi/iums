import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bidbondthreshold } from 'src/bidbondthreshold/entities/bidbondthreshold.entity';
import { HelperService } from 'src/helper/helper.service';
import { Tenderinvoice } from 'src/tenderinvoice/entities/tenderinvoice.entity';
import { Not, Repository } from 'typeorm';
import { CreateTenderapplicationDto } from './dto/create-tenderapplication.dto';
import { UpdateTenderapplicationDto } from './dto/update-tenderapplication.dto';
import { Tenderapplication } from './entities/tenderapplication.entity';

@Injectable()
export class TenderapplicationService {
  constructor(@InjectRepository(Tenderapplication) private readonly tenderapplicationRepository:Repository<Tenderapplication>,private helperService:HelperService){}
  create(createTenderapplicationDto: CreateTenderapplicationDto) {
    return 'This action adds a new tenderapplication';
  }

  findAll() {
    return `This action returns all tenderapplication`;
  }

  async findOne(id: number) :Promise<any> {
    const record =  await this.tenderapplicationRepository.findOne(id)
    if(record){
      console.log(record)
          const invoice = await Tenderinvoice.findOne({where:{accountId:record.accountId,tendernumber:record.tendernumber,tenderfeetypeId:record.tenderfeetypeId}})
          if(invoice){
              invoice.tenderapplicationId = id
              await invoice.save()
              return {"status":"success","message":"Application successfully Linked to Invoice"} 
          }
    }else{
      throw new HttpException("Record not found",HttpStatus.BAD_REQUEST)
    }
  }

 async update(id: number, updateTenderapplicationDto: UpdateTenderapplicationDto):Promise<any> {
   /**
    * get tender application
    */
    const record =  await this.tenderapplicationRepository.findOne(id)
    if(record){
      if(record.status=='PENDING'){
         
        // if  type is BID BOND   and  period  or amount has changed  recalcuate the establishment fee  if  the establishment fee had already been 
        if(record.type=='BIDBOND')
        {
           if(record.validityperiod !== Number(updateTenderapplicationDto.validityperiod) || record.amount !== updateTenderapplicationDto.amount){
               const establishmentfee = await this.calculate_establishment_fee(record.amount,record.validityperiod.toString(),record.currencyId)
              const invoice =  await this.getInvoice(record.accountId,record.tendernumber,'ESTABLISHMENT FEE')
              if(Number(invoice.amount) !== establishmentfee){
                throw new HttpException("Please change first the establishment fee to "+establishmentfee,HttpStatus.BAD_REQUEST)
              }

               record.amount = updateTenderapplicationDto.amount
               record.validityperiod = Number(updateTenderapplicationDto.validityperiod)
               record.maturitydate = await (await this.helperService.calculate_maturity_date(record.closingDate,Number(updateTenderapplicationDto.validityperiod))).toString()
              record.tendernumber = updateTenderapplicationDto.tendernumber
              await record.save()

              const tenderinvoice = await  this.getInvoice(record.accountId,record.tendernumber,record.type)

              tenderinvoice.amount = updateTenderapplicationDto.amount
              tenderinvoice.tendernumber = updateTenderapplicationDto.tendernumber
              await tenderinvoice.save()
              return {"status":"success","message":"Tender Application successfully changed"}

              
            }
        }else if(record.type=='ESTABLISHMENT FEE'){
          const tenderinvoice = await  this.getInvoice(record.accountId,record.tendernumber,record.type)

          if(tenderinvoice.status ==='PAID'){
            throw new HttpException("Invoice already settled. You do not have permission to change record",HttpStatus.BAD_REQUEST)
          }else{
            record.amount = updateTenderapplicationDto.amount
            record.tendernumber = updateTenderapplicationDto.tendernumber
           await record.save()
           tenderinvoice.amount = updateTenderapplicationDto.amount
           tenderinvoice.tendernumber = updateTenderapplicationDto.tendernumber
           await tenderinvoice.save()
           return {"status":"success","message":"Tender Application successfully changed"}
          }


        }

      }else{
        throw new HttpException('Record does not have an AWAITING Status',HttpStatus.BAD_REQUEST)
      }
    }else{
      throw new HttpException("No record found",HttpStatus.BAD_REQUEST)
    }
      
  }

  async remove(id: number):Promise<any> {
    const record =  await this.tenderapplicationRepository.findOne(id)
    if(record){
       const records =  await this.tenderapplicationRepository.find({where:{accountId:record.accountId,tendernumber:record.tendernumber,type:record.type,id:Not(record.id)}}) 
       if(records.length>0){
          records.forEach(async record=>{
             await  this.tenderapplicationRepository.delete(record.id)
          })

          return {"status":"success","message":"Duplicates successfully Removed"}
       } 
       
    }else{
      throw new HttpException("Record not found",HttpStatus.BAD_REQUEST)
    }
  }

  async calculate_establishment_fee(bidvalue:string,validityperiod:string,currencyId:number){
    const bidbonds = await Bidbondthreshold.find({where:{currencyId:currencyId,validityperiod:validityperiod}})
    if(bidbonds.length>0){
        let fee = 0;

        bidbonds.forEach(bid=>{
          if(Number(bid.lowerlimit)< Number(bidvalue)&& Number(bidvalue)<Number(bid.upperlimit)){
            fee = Number(bid.amount)
             }
        })
        return fee
    }
    else{
      throw new HttpException("Bid Bond Threshold not set",HttpStatus.BAD_REQUEST)
    }
 }

 async getInvoice(accountId:number,tendernumber:string,type:string){
   return await Tenderinvoice.findOne({where:{accountId:accountId,tendernumber:tendernumber,description:type}})
 }

 
}
