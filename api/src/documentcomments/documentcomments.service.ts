import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { Mailinglist } from 'src/mailinglist/entities/mailinglist.entity';
import { Repository } from 'typeorm';
import { CreateDocumentcommentDto } from './dto/create-documentcomment.dto';
import { UpdateDocumentcommentDto } from './dto/update-documentcomment.dto';
import { Documentcomment } from './entities/documentcomment.entity';

@Injectable()
export class DocumentcommentsService {
  constructor(@InjectRepository(Documentcomment) private readonly documentcommentRepository:Repository<Documentcomment>,private readonly mailService:MailService){}
  async create(createDocumentcommentDto: CreateDocumentcommentDto,userId:number):Promise<any> {
     try {
      createDocumentcommentDto.administratorId=userId
      await this.documentcommentRepository.save(createDocumentcommentDto)
      const maillist = await Mailinglist.findOne({where:{accountId:createDocumentcommentDto.accountId}})
      if(maillist){
        this.mailService.generalNotification(maillist.email,createDocumentcommentDto.comment)
      }
      return {"status":"success","message":"Comment successfully saved"} 
     } catch (error) {
      throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST);
     }
  }

  findAll() {
    return `This action returns all documentcomments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} documentcomment`;
  }

  update(id: number, updateDocumentcommentDto: UpdateDocumentcommentDto) {
    return `This action updates a #${id} documentcomment`;
  }

  remove(id: number) {
    return `This action removes a #${id} documentcomment`;
  }
}
