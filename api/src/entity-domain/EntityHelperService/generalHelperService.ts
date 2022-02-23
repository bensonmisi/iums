import { Authorityinvoice } from "src/authorityinvoice/entities/authorityinvoice.entity"
import { MoreThanOrEqual } from "typeorm"
import { Authorityapplication } from "../authorityapplication/entities/authorityapplication.entity"

export class GeneralHelperService{

    async getProcurementClass(id:number){
        const today = new Date()
        const currentyear = today.getFullYear()
        return await Authorityapplication.findOne({where:{procuremententityId:id,year:MoreThanOrEqual(currentyear)},relations:['procurementclass','plan']});

    }

    async getPendingInvoice(id:number){
        const today = new Date()
        const currentyear = today.getFullYear()        
        return await Authorityinvoice.findOne({where:{procuremententityId:id,expire_year:MoreThanOrEqual(currentyear)},relations:['currency','authorityapplication']})
    }
}