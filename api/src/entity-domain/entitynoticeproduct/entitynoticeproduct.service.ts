import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from 'src/notice/entities/notice.entity';
import { Noticeproduct } from 'src/noticeproduct/entities/noticeproduct.entity';
import { Repository } from 'typeorm';
import { EntityUser } from '../entity-user/entities/entity-user.entity';
import { CreateNoticeProductDto } from './dto/create-noticeproduct.dto';
import { UpdateNoticeProductDto } from './dto/update-noticeproduct.dto';

@Injectable()
export class EntitynoticeproductService {

    constructor(@InjectRepository(Noticeproduct) private readonly noticeproductRepository:Repository<Noticeproduct>){}


  async getProducts(id:number,userId:number){
      const user = await EntityUser.findOne({where:{id:userId}})
      const notice = await Notice.findOne({where:{id:id,procuremententityId:user.procuremententityId}})
         if(!notice){
            throw new HttpException("Notice not found",HttpStatus.BAD_REQUEST)
         }
      return await this.noticeproductRepository.find({where:{noticeId:notice.id},relations:['annualplan','awards']})
  }

    async addProduct(createNoticeProductDto:CreateNoticeProductDto,userId:number){
        const user = await EntityUser.findOne({where:{id:userId}})
        if(!user){
            throw new HttpException("unauthorized access",HttpStatus.BAD_REQUEST)
        }
         const notice = await Notice.findOne({where:{id:createNoticeProductDto.noticeId,procuremententityId:user.procuremententityId}})
         if(!notice){
            throw new HttpException("Notice not found",HttpStatus.BAD_REQUEST)
         }

         await this.noticeproductRepository.save(createNoticeProductDto)

         return {status:"success",message:"Successfully Added Required Product/Service"}
    }


    async editProduct(id:number,updateNoticeProductDto:UpdateNoticeProductDto,userId:number){
         const product = await this.noticeproductRepository.findOne({where:{id:id},relations:['notice']})
         const user = await EntityUser.findOne({where:{id:userId}})
         if(!user){
            throw new HttpException("unauthorized access",HttpStatus.BAD_REQUEST)
        }
        if(!product){
            throw new HttpException("Product not found",HttpStatus.BAD_REQUEST)
         }

        if(product.notice.procuremententityId !== user.procuremententityId){
            throw new HttpException("unauthorized access",HttpStatus.BAD_REQUEST)  
        }

        console.log(product)
        console.log(updateNoticeProductDto.description)
        product.description = updateNoticeProductDto.description
        product.annualplanId = updateNoticeProductDto.annualplanId
        product.quantity = updateNoticeProductDto.quantity
        product.isplanned = updateNoticeProductDto.isplanned
        await product.save()
      //  await this.noticeproductRepository.update(id,updateNoticeProductDto)

        return {status:"success",message:"Successfully Updated Required Product/Service"}
    }


    async deleteProduct(id:number,userId:number){
        const product = await this.noticeproductRepository.findOne({where:{id:id},relations:['notice']})
        const user = await EntityUser.findOne({where:{id:userId}})
        if(!user){
           throw new HttpException("unauthorized access",HttpStatus.BAD_REQUEST)
       }
       if(!product){
           throw new HttpException("Product not found",HttpStatus.BAD_REQUEST)
        }

       if(product.notice.procuremententityId !== user.procuremententityId){
           throw new HttpException("unauthorized access",HttpStatus.BAD_REQUEST)  
       }

       if(product.notice.status ==="PUBLISHED"){
        throw new HttpException("Cannot delete items of a published notice",HttpStatus.BAD_REQUEST)   
       }

       await this.noticeproductRepository.delete(id)

       return {status:"success",message:"Notice product successfully deleted"}
    }
}
