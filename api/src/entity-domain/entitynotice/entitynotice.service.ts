import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { HelperService } from 'src/helper/helper.service';
import { Notice } from 'src/notice/entities/notice.entity';
import { Noticecategory } from 'src/noticecategory/entities/noticecategory.entity';
import { Noticeproduct } from 'src/noticeproduct/entities/noticeproduct.entity';
import { In, Repository } from 'typeorm';
import { EntityUser } from '../entity-user/entities/entity-user.entity';
import { CreateEntityNoticeDto } from './dto/create-entitynotice.dto';

@Injectable()
export class EntitynoticeService {
    constructor(
        @InjectRepository(Notice) private readonly noticeRepository:Repository<Notice>,
        private readonly helperService:HelperService
        ){}

    async findAll(userId:number){
        const user = await EntityUser.findOne({where:{id:userId}})
        return await this.noticeRepository.find({where:{procuremententityId:user.procuremententityId},order:{id:'DESC'},relations:['procuremententity','noticecategory','section','noticeproduct','noticetype']})

    }

    async create(createNoticeDto: CreateEntityNoticeDto,userId:number) {
        const products = JSON.parse(createNoticeDto.products) 
        const categories = JSON.parse(createNoticeDto.categories)
        
        try {
          const user = await EntityUser.findOne({where:{id:userId}})
          const uuid = await this.helperService.generateUUId()
          const tendernumber = await this.helperService.get_tender_number(user.procuremententityId,createNoticeDto.reach)
          const today = new Date()
          const year = today.getFullYear();
          createNoticeDto.year = year
          createNoticeDto.tendernumber2 = tendernumber
          createNoticeDto.uuid = uuid
         const record = await this.noticeRepository.create(createNoticeDto)
         await this.noticeRepository.save(record)

         /**
          * create products
          */
          let productdata = []
     
          products.forEach(element => {
             const el = {noticeId:record.id,description:element.name,quantity:element.quantity}
             productdata.push(el)
          });
     
          await Noticeproduct.save(productdata)     
          
          

          /**
           * end create productis
           */



          /** Save categories
           */
          if(categories)
          {
          
           const categorydata  = await Category.find({where:{code:In(categories)}})
     
           let categoryarray=[]
           categorydata.forEach(cat=>{
             const el ={noticeId:record.id,categoryId:cat.id}
             categoryarray.push(el)
           })
           await Noticecategory.save(categoryarray)
     
          }

          /**
           * end save categories
           */
          

          /**
           * save noteice fees
           */
        
         return {"status":"success","message":"Notice Successfully Created"}
       } catch (error) {
         let message = error.sqlMessage ? error.sqlMessage : error.message
         throw new HttpException(message,HttpStatus.BAD_REQUEST)
       } 
       } 
}
