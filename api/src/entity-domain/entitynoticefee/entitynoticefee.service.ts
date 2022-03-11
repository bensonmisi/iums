import { Injectable } from '@nestjs/common';
import { GeneralHelperService } from '../EntityHelperService/generalHelperService';

@Injectable()
export class EntitynoticefeeService {

    async getFees(id:number){
        const helperService = new GeneralHelperService()
        return await helperService.getNoticeFees(id)
    }
}
