import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';

@Injectable()
export class DocumentsService {
  constructor(@InjectRepository(Document) private documentRepository:Repository<Document>){}
 async  create(createDocumentDto: CreateDocumentDto) {
   const {name,filesize,filetype,pages,suppliertypeId,locality} = createDocumentDto
   const created = await this.documentRepository.create({name:name,locality:locality,filesize:filesize,filetype:filetype,pages:pages,suppliertypeId:suppliertypeId})
    await this.documentRepository.save(created)
    return {'status':'success','message':'Document Successfully Created'};
  }

  async findAll(id:number) {
    return await this.documentRepository.find({where:{suppliertypeId:id}})
  }

  async findOne(id: number) {
    return await this.documentRepository.findOne(id);
  }

  async update(id: number, updateDocumentDto: UpdateDocumentDto) {
     await this.documentRepository.update(id,updateDocumentDto)
     return {'status':'success','message':'Document Successfully Updated'};
  }

  async remove(id: number) {
    await this.documentRepository.delete(id);
    return {'status':'success','message':'Document Successfully Deleted'};
  }
}
