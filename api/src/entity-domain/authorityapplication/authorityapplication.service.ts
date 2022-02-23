import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MoreThanOrEqual } from 'typeorm';
import { EntityUser } from '../entity-user/entities/entity-user.entity';
import { Authorityapplication } from './entities/authorityapplication.entity';

@Injectable()
export class AuthorityapplicationService {

  async confirm(userId:number){
    const user = await EntityUser.findOne({where:{id:userId}})
    const today = new Date()
    const currentyear = today.getFullYear()
    const  record = await Authorityapplication.findOne({where:{procuremententityId:user.procuremententityId,year:MoreThanOrEqual(currentyear),status:'PENDING'}})
    if(!record)
    {
      throw new HttpException('No Record found',HttpStatus.BAD_REQUEST)
    }

    record.status ='AWAITING'
    await record.save()
    return{status:"success",message:"Application successfully completed"}
  }
}
