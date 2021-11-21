import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSuspenseDto } from './dto/create-suspense.dto';
import { UpdateSuspenseDto } from './dto/update-suspense.dto';
import { Suspense } from './entities/suspense.entity';

@Injectable()
export class SuspenseService {
  constructor(@InjectRepository(Suspense) private readonly suspenseRepository:Repository<Suspense>){}
  async create(createSuspenseDto: any):Promise<any> {
   try {
      const check = await this.suspenseRepository.findOne({where:{banktransactionId:createSuspenseDto.banktransactionId,source:createSuspenseDto.source}})
       if(!check)
       {
           await this.suspenseRepository.save(createSuspenseDto)
            return {"status":"success","message":"success"}
       }else{
         throw new ForbiddenException("transaction already in the suspense")
       }
   } catch (error) {
      throw new HttpException(error.sqlMessage,HttpStatus.UNAUTHORIZED)
  }
}
  findAll() {
    return `This action returns all suspense`;
  }

  findOne(id: number) {
    return `This action returns a #${id} suspense`;
  }

  update(id: number, updateSuspenseDto: UpdateSuspenseDto) {
    return `This action updates a #${id} suspense`;
  }

  remove(id: number) {
    return `This action removes a #${id} suspense`;
  }
}
