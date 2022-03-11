import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { MailService } from 'src/mail/mail.service';
import { Mailinglist } from 'src/mailinglist/entities/mailinglist.entity';
import { Noticecategory } from 'src/noticecategory/entities/noticecategory.entity';
import { Noticeproduct } from 'src/noticeproduct/entities/noticeproduct.entity';
import { Repository } from 'typeorm';
import { GeneralHelperService } from '../EntityHelperService/generalHelperService';
import { CreateNoticeawardDto } from './dto/create-noticeaward.dto';
import { Noticeaward } from './entities/noticeaward.entity';

@Injectable()
export class NoticeawardsService {
  constructor(
    @InjectRepository(Noticeaward) private readonly noticewardRepository:Repository<Noticeaward>,
    private readonly mailingService:MailService
  ){}
  async create(createNoticeawardDto: CreateNoticeawardDto,userId:number) {

    createNoticeawardDto

    const noticefees = JSON.parse(createNoticeawardDto.feecodes)
  
    const helperService = new GeneralHelperService()
    
    /**
     * get product
     */
        const noticeproduct = await Noticeproduct.findOne({where:{id:createNoticeawardDto.noticeproductId},relations:['notice']})
        if(!noticeproduct)
        {
         throw new HttpException("Notice product not found",HttpStatus.BAD_REQUEST)
        }

    /**
     * check  awards
     */

    const awards = await Noticeaward.find({where:{noticeproductId:createNoticeawardDto.noticeproductId}})


    /**
     * get bidder
     */

    const account = await Account.findOne({where:{regnumber:createNoticeawardDto.regnumber}})
    createNoticeawardDto.accountId = account.id

    if(!account){
      throw new HttpException("Bidder not found",HttpStatus.BAD_REQUEST)
    }
    
    if(noticefees.length>0)
    {
    await helperService.checkNoticefee(noticefees,account.id)
    }

    await helperService.checkBidderRegistration(noticeproduct.noticeId,account.id,createNoticeawardDto.certificatenumber)

    let totalaward = 0

    if(awards.length>0){
      awards.forEach(aw=>{
        totalaward = totalaward + aw.quantity
      })
    }

    const balance = +noticeproduct.quantity - totalaward

    if(balance==0){
      throw new HttpException("Quantity already Awarded",HttpStatus.BAD_REQUEST)
    }
    if(createNoticeawardDto.quantity>balance){
      throw new HttpException("Quantity more than required ",HttpStatus.BAD_REQUEST)
    }

    await this.noticewardRepository.save(createNoticeawardDto)

 

    
    /**
     *   initiate refund
     */

     await helperService.addTorefundTray(noticeproduct.noticeId,userId)

     await helperService.checkProduct(noticeproduct.id)

        /**
     * send  notification
     */

    const mailling = await Mailinglist.findOne({where:{accountId:account.id}})
    const message = "This serves to inform you that your company was successfully award a contract  to supplier "+noticeproduct.quantity+" "+noticeproduct.description+" to "+noticeproduct.notice.procuremententity.name
    this.mailingService.generalNotification(mailling.email,message)


    

    return{status:"success",message:"Award successfully Saved"}

  }

  async findAll(id:number){
    return Noticeaward.find({where:{noticeproductId:id},relations:['account','currency','noticeproduct']})
  }

  
}
