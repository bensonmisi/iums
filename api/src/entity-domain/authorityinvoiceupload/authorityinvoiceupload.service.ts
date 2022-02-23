import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { initialize } from 'passport';
import { HelperService } from 'src/helper/helper.service';
import { Repository } from 'typeorm';
import { EntityUser } from '../entity-user/entities/entity-user.entity';
import { GeneralHelperService } from '../EntityHelperService/generalHelperService';
import { CreateAuthorityinvoiceuploadDto } from './dto/create-authorityinvoiceupload.dto';
import { UpdateAuthorityinvoiceuploadDto } from './dto/update-authorityinvoiceupload.dto';
import { Authorityinvoiceupload } from './entities/authorityinvoiceupload.entity';

@Injectable()
export class AuthorityinvoiceuploadService {
  constructor(@InjectRepository(Authorityinvoiceupload) private readonly invoiceRepository:Repository<Authorityinvoiceupload>){}
  async create(createAuthorityinvoiceuploadDto: CreateAuthorityinvoiceuploadDto,userId:number) {
   const user = await EntityUser.findOne({where:{id:userId}})
    const helperService = new GeneralHelperService()
    const invoice = await helperService.getPendingInvoice(user.procuremententityId)
     createAuthorityinvoiceuploadDto.authorityinvoiceId = invoice.id
      const record = await this.invoiceRepository.findOne({where:{authorityinvoiceId:invoice.id}})
      if(record){
        throw new HttpException("POP already uploaded",HttpStatus.BAD_REQUEST)
      } 
     invoice.status ="AWAITING"
     await invoice.save()
      await this.invoiceRepository.save(createAuthorityinvoiceuploadDto)
      return {status:"success",message:"Proof of payment successfully upload. Your invoice will be processed once funds have been identified"}
  }

  findAll() {
    return `This action returns all authorityinvoiceupload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authorityinvoiceupload`;
  }

  update(id: number, updateAuthorityinvoiceuploadDto: UpdateAuthorityinvoiceuploadDto) {
    return `This action updates a #${id} authorityinvoiceupload`;
  }

  remove(id: number) {
    return `This action removes a #${id} authorityinvoiceupload`;
  }
}
