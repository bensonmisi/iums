import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { HelperService } from 'src/helper/helper.service';
import { MailService } from 'src/mail/mail.service';
import { Mailinglist } from 'src/mailinglist/entities/mailinglist.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { Repository } from 'typeorm';
import { CreateAccountdocumentDto } from './dto/create-accountdocument.dto';
import { UpdateAccountdocumentDto } from './dto/update-accountdocument.dto';
import { Accountdocument } from './entities/accountdocument.entity';

@Injectable()
export class AccountdocumentsService {
  constructor(@InjectRepository(Accountdocument) private readonly accountdocumentRepository:Repository<Accountdocument>,private readonly helperService:HelperService,private readonly mailService:MailService){}
  create(createAccountdocumentDto: CreateAccountdocumentDto) {
    
    return 'This action adds a new accountdocument';
  }

  findAll() {
    return `This action returns all accountdocuments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accountdocument`;
  }

  update(id: number, updateAccountdocumentDto: UpdateAccountdocumentDto) {
    return `This action updates a #${id} accountdocument`;
  }

  remove(id: number) {
    return `This action removes a #${id} accountdocument`;
  }

  async approve(id:number,userId:number):Promise<any>{
     const account = await Account.findOne({where:{id:id},relations:['suppliertype']})

     const suppliers = await Supplier.find({where:{accountId:id,status:'PENDING'},relations:['category']})

     const check = await this.helperService.check_registration_permission(account.suppliertypeId,suppliers)
     if(check.length==0){
     await this.accountdocumentRepository.update({accountId:account.id},{status:'APPROVED',administratorId:userId})
     const today = new Date()
     var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
     var issuedate = date+' '+time;
     await Supplier.update({accountId:id,status:'PENDING'},{issued_on:issuedate,status:'APPROVED'})
     const maillist = await Mailinglist.findOne({where:{accountId:id}})
     if(maillist){
     this.mailService.generalNotification(maillist.email,"Your application to be included on our list of suppliers has been successfully proceed")
     }
    return {"status":"success","message":"Application was successfully processed"}
     }else{
       return {status:"error",message:JSON.stringify(check)}
     }

    
  }
}
