import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenderinvoice } from 'src/tenderinvoice/entities/tenderinvoice.entity';
import { Not, Repository } from 'typeorm';
import { CreateTenderapplicationDto } from './dto/create-tenderapplication.dto';
import { UpdateTenderapplicationDto } from './dto/update-tenderapplication.dto';
import { Tenderapplication } from './entities/tenderapplication.entity';

@Injectable()
export class TenderapplicationService {
  constructor(@InjectRepository(Tenderapplication) private readonly tenderapplicationRepository:Repository<Tenderapplication>){}
  create(createTenderapplicationDto: CreateTenderapplicationDto) {
    return 'This action adds a new tenderapplication';
  }

  findAll() {
    return `This action returns all tenderapplication`;
  }

  async findOne(id: number) :Promise<any> {
    const record =  await this.tenderapplicationRepository.findOne(id)
    if(record){
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

  update(id: number, updateTenderapplicationDto: UpdateTenderapplicationDto) {
    return `This action updates a #${id} tenderapplication`;
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
}
