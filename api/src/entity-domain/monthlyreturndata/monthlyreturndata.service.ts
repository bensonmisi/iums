import { Injectable } from '@nestjs/common';
import { EntityUser } from '../entity-user/entities/entity-user.entity';
import { Monthlyreturnchecklist } from '../monthlyreturnchecklist/entities/monthlyreturnchecklist.entity';
import { CreateMonthlyreturndatumDto } from './dto/create-monthlyreturndatum.dto';
import { UpdateMonthlyreturndatumDto } from './dto/update-monthlyreturndatum.dto';
import { Monthlyreturndatum } from './entities/monthlyreturndatum.entity';

@Injectable()
export class MonthlyreturndataService {
 async create(createMonthlyreturndatumDto: CreateMonthlyreturndatumDto,userId:number) {
   const answers = JSON.parse(createMonthlyreturndatumDto.answers)
   const user = await EntityUser.findOne({where:{id:userId}})
   createMonthlyreturndatumDto.userId = userId
   createMonthlyreturndatumDto.procurementtypeId = user.procuremententityId
   const record = await Monthlyreturndatum.create(createMonthlyreturndatumDto)
   await record.save()

   if(answers.length>0){

    answers.forEach( async(element) => {
        const created = await Monthlyreturnchecklist.create({monthlyreturndataId:record.id,checklistquestionId:element.checklistquestionId,answer:element.answer}) 
        await created.save()
    });

   }
   return {status:"success",message:"Monthly return Item successfully Save"}
  }

  findAll() {
    return `This action returns all monthlyreturndata`;
  }

  findOne(id: number) {
    return `This action returns a #${id} monthlyreturndatum`;
  }

  update(id: number, updateMonthlyreturndatumDto: UpdateMonthlyreturndatumDto) {
    return `This action updates a #${id} monthlyreturndatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} monthlyreturndatum`;
  }
}
