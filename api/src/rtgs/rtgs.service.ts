import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRtgDto } from './dto/create-rtg.dto';
import { UpdateRtgDto } from './dto/update-rtg.dto';
import { Rtg } from './entities/rtg.entity';

@Injectable()
export class RtgsService {
  constructor(@InjectRepository(Rtg) private readonly rtgRepository:Repository<Rtg>){}
  async create(formdata: any):Promise<any> {
     await this.rtgRepository.save(formdata)
     return {"status":'success',"message":"Proof of Payment successfully Uploaded"}
  }

  async findOne(id:number) {
    return await this.rtgRepository.findOne(id);
  }

  async find(id: number) {
    return await this.rtgRepository.find({where:{accountId:id,status:'PENDING'}});
  }

  update(id: number, updateRtgDto: UpdateRtgDto) {
    return `This action updates a #${id} rtg`;
  }

  remove(id: number) {
    return `This action removes a #${id} rtg`;
  }
}
