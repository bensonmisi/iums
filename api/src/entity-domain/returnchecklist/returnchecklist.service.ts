import { Injectable } from '@nestjs/common';
import { Checklist } from 'src/checklist/entities/checklist.entity';

@Injectable()
export class ReturnchecklistService {

    async getChecklist(id:number){
        return await Checklist.findOne({where:{procurementcategoryId:id},relations:['checklistquestion']})
    }

    async getAll(){
        return await Checklist.find({relations:['checklistquestion']})
    }
}
