import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from 'src/notice/entities/notice.entity';
import { Noticetype } from 'src/noticetype/entities/noticetype.entity';
import { Procuremententity } from 'src/procuremententity/entities/procuremententity.entity';
import { Section } from 'src/sections/entities/section.entity';
import { Tenderfeetype } from 'src/tenderfeetype/entities/tenderfeetype.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TendersService {
    constructor(@InjectRepository(Notice) private readonly noticeRepository:Repository<Notice>){}


    async getAll(){
        const sections = await Section.find()
        const entity = await Procuremententity.find()
        const types = await  Noticetype.find()
        const notices =  await this.noticeRepository.find({relations:['procuremententity','noticecategory','section','noticeproduct','noticetype'],order:{id:'DESC'}})
        return {sections:sections,entities:entity,types:types,notices:notices}
    }

    async findOne(uuid:string){
        return await this.noticeRepository.findOne({where:{uuid:uuid},relations:['procuremententity','noticecategory','section','noticeproduct','noticetype','tenderapplications','noticefee'],order:{id:'DESC'}})
    }

    async download(uuid:string){
        const record =  await this.noticeRepository.findOne({where:{uuid:uuid}})
        record.downloads = record.downloads+1
        await record.save()
        return record
    }

   
}
