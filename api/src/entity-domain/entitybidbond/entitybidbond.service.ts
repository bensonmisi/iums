import { Injectable } from '@nestjs/common';
import { EntityUser } from '../entity-user/entities/entity-user.entity';
import { GeneralHelperService } from '../EntityHelperService/generalHelperService';

@Injectable()
export class EntitybidbondService {

    async getData(id:number){
        const helperService = new GeneralHelperService()
        const user = await EntityUser.findOne({where:{id:id}})
        return await helperService.getBidBonds(user.procuremententityId)
    }
}
