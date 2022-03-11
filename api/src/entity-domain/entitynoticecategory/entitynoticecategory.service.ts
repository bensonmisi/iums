import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from 'src/notice/entities/notice.entity';
import { CreateNoticecategoryDto } from 'src/noticecategory/dto/create-noticecategory.dto';
import { Noticecategory } from 'src/noticecategory/entities/noticecategory.entity';
import { Repository } from 'typeorm';
import { EntityUser } from '../entity-user/entities/entity-user.entity';
import { CreateEntityNoticeCategoryDto } from './dto/create-entitynoticecategory.dto';

@Injectable()
export class EntitynoticecategoryService {
    constructor(@InjectRepository(Noticecategory) private readonly noticecategoryRepository:Repository<Noticecategory>){}

    async getCategories(id:number,userId:number){
        const user = await EntityUser.findOne({where:{id:userId}})
        const notice = await Notice.findOne({where:{id:id,procuremententityId:user.procuremententityId}})
           if(!notice){
              throw new HttpException("Notice not found",HttpStatus.BAD_REQUEST)
           }
        return await this.noticecategoryRepository.find({where:{noticeId:notice.id},relations:['category']})
    }
  
      async addCategory(createNoticeCategoryDto:CreateEntityNoticeCategoryDto,userId:number){
          const user = await EntityUser.findOne({where:{id:userId}})
          if(!user){
              throw new HttpException("unauthorized access",HttpStatus.BAD_REQUEST)
          }
           const notice = await Notice.findOne({where:{id:createNoticeCategoryDto.noticeId,procuremententityId:user.procuremententityId}})
           if(!notice){
              throw new HttpException("Notice not found",HttpStatus.BAD_REQUEST)
           }
  
           await this.noticecategoryRepository.save(createNoticeCategoryDto)
  
           return {status:"success",message:"Successfully Added Category"}
      }
  
  
   
  
      async deleteCategory(id:number,userId:number){
          const category = await this.noticecategoryRepository.findOne({where:{id:id},relations:['notice']})
          const user = await EntityUser.findOne({where:{id:userId}})
          if(!user){
             throw new HttpException("unauthorized access",HttpStatus.BAD_REQUEST)
         }
         if(!category){
             throw new HttpException("Category not found",HttpStatus.BAD_REQUEST)
          }
  
         if(category.notice.procuremententityId !== user.procuremententityId){
             throw new HttpException("unauthorized access",HttpStatus.BAD_REQUEST)  
         }
  
         if(category.notice.status ==="PUBLISHED"){
          throw new HttpException("Cannot delete items of a published notice",HttpStatus.BAD_REQUEST)   
         }
  
         await this.noticecategoryRepository.delete(id)
  
         return {status:"success",message:"Notice category successfully deleted"}
      }

}
