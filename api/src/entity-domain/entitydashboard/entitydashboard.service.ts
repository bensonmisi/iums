import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EntityUser } from '../entity-user/entities/entity-user.entity';
import { GeneralHelperService } from '../EntityHelperService/generalHelperService';

@Injectable()
export class EntitydashboardService {

    async dashboard(userId:number){
        const user = await EntityUser.findOne({where:{id:userId}})
        if(!user){
            throw new UnauthorizedException("Please refresh page and login again")
        }
        const HelperServer = new GeneralHelperService()
        const procurementclass = await HelperServer.getProcurementClass(user.procuremententityId)
        const invoice = await HelperServer.getPendingInvoice(user.procuremententityId)
        const bidbonds = await HelperServer.getBidbondlist(user.procuremententityId)
        const notices = await HelperServer.getNotices(user.procuremententityId)
        const checkreturn = await HelperServer.checkReturn(user.procuremententityId)
        return{procurementclass:procurementclass,invoice:invoice,bidbonds:bidbonds,notices:notices,monthlyreturn:checkreturn}
    }
}
