import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBidbondthresholdDto } from './dto/create-bidbondthreshold.dto';
import { UpdateBidbondthresholdDto } from './dto/update-bidbondthreshold.dto';
import { Bidbondthreshold } from './entities/bidbondthreshold.entity';

@Injectable()
export class BidbondthresholdService {
  constructor(@InjectRepository(Bidbondthreshold) private readonly bidbondthresholdRepository:Repository<Bidbondthreshold>){}
  async create(createBidbondthresholdDto: CreateBidbondthresholdDto):Promise<any> {
     const record = await this.bidbondthresholdRepository.findOne({where:{lowerlimit:createBidbondthresholdDto.lowerlimit,upperlimit:createBidbondthresholdDto.upperlimit,currencyId:createBidbondthresholdDto.currencyId,status:'ACTIVE'}})
     if(!record)
     {
     await this.bidbondthresholdRepository.save(createBidbondthresholdDto)
     return {'status':'success','message':'Record successfully Saved'}
     }else{
       throw new HttpException("Record already captured",HttpStatus.BAD_REQUEST)
     }
  }

  async findAll():Promise<Bidbondthreshold[]>{
    return await this.bidbondthresholdRepository.find({relations:['currency']});
  }

  async findOne(id: number):Promise<Bidbondthreshold[]> {
    return await this.bidbondthresholdRepository.find({where:{validityperiod:id},relations:['currency']});
  }

  async update(id: number, updateBidbondthresholdDto: UpdateBidbondthresholdDto):Promise<any> {
     await this.bidbondthresholdRepository.update(id,updateBidbondthresholdDto)
     return {'status':'success','message':'Record successfully Update'}
  }

 async remove(id: number):Promise<any> {
   const record = await this.bidbondthresholdRepository.findOne(id)
   record.status ="DELETED"
   await record.save()
   return {'status':'success','message':'Record successfully Deleted'}
  }
}
