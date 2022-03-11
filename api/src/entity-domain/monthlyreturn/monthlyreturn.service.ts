import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from 'src/notice/entities/notice.entity';
import { Repository } from 'typeorm';
import { EntityUser } from '../entity-user/entities/entity-user.entity';
import { GeneralHelperService } from '../EntityHelperService/generalHelperService';
import { Noticeaward } from '../noticeawards/entities/noticeaward.entity';
import { CreateMonthlyreturnDto } from './dto/create-monthlyreturn.dto';
import { UpdateMonthlyreturnDto } from './dto/update-monthlyreturn.dto';
import { Monthlyreturn } from './entities/monthlyreturn.entity';

@Injectable()
export class MonthlyreturnService {
  constructor(@InjectRepository(Monthlyreturn) private readonly monthlyreturnRepository:Repository<Monthlyreturn>){}
  async create(createMonthlyreturnDto: CreateMonthlyreturnDto,userId:number) {
    const user = await EntityUser.findOne({where:{id:userId}})
    const helperService = new GeneralHelperService()
    const month = await helperService.getReturnMonth()
    const today = new Date()
    const year = today.getFullYear()
     const record = await this.monthlyreturnRepository.findOne({where:{month:month,year:year,procuremententityId:user.procuremententityId}})
     if(!record){       
     
     createMonthlyreturnDto.procuremententityId = user.procuremententityId
     createMonthlyreturnDto.month = month
     createMonthlyreturnDto.year = year
     createMonthlyreturnDto.userId = userId

     await this.monthlyreturnRepository.save(createMonthlyreturnDto)
     }
     return {status:"success",message:"Monthly return process successfully initiated"};
  }

  async findAll(userId:number) {
     const currentdate = new Date()
     const currentyear = currentdate.getFullYear()
     const user = await EntityUser.findOne({where:{id:userId}})
     const helperService = new GeneralHelperService()
     const month = await helperService.getReturnMonth()
     const notice = await Notice.find({where:{procuremententityId:user.procuremententityId,status:'AWARDED'},relations:['noticeproduct','section','noticetype']})
      const returns =  await this.monthlyreturnRepository.find({where:{year:currentyear,procuremententityId:user.procuremententityId},relations:['monthlyreturndata']})
      return {notices:notice,returns:returns}
    }

  async findOne(id: number,userId:number) {
    const user = await EntityUser.findOne({where:{id:userId}})
    const helperService = new GeneralHelperService()
    const summary = await helperService.return_consolidated_summary(id,user.procuremententityId)
    const notice = await Notice.find({where:{procuremententityId:user.procuremententityId,status:'AWARDED'},relations:['noticeproduct','section','noticetype']})
     const returns =  await this.monthlyreturnRepository.findOne({where:{id:id,procuremententityId:user.procuremententityId},relations:['monthlyreturndata']})
     return {notices:notice,returns:returns,summary:summary}
  }

  update(id: number, updateMonthlyreturnDto: UpdateMonthlyreturnDto) {
    return `This action updates a #${id} monthlyreturn`;
  }

  remove(id: number) {
    return `This action removes a #${id} monthlyreturn`;
  }
}
