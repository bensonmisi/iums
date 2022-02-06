import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditService } from 'src/audit/audit.service';
import { LogDataDto } from 'src/audit/dto/logdata.dto';
import { Category } from 'src/categories/entities/category.entity';
import { HelperService } from 'src/helper/helper.service';
import { Noticecategory } from 'src/noticecategory/entities/noticecategory.entity';
import { Noticefee } from 'src/noticefee/entities/noticefee.entity';
import { Noticeproduct } from 'src/noticeproduct/entities/noticeproduct.entity';
import { Tenderapplication } from 'src/tenderapplication/entities/tenderapplication.entity';
import { In, Repository } from 'typeorm';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { Notice } from './entities/notice.entity';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice) private readonly noticeRepository:Repository<Notice>,
    @InjectRepository(Noticefee) private readonly noticefeeRepository:Repository<Noticefee>,
    private readonly auditService:AuditService,
    private readonly helperService:HelperService
  ){}
 async create(createNoticeDto: CreateNoticeDto) {
   const products = JSON.parse(createNoticeDto.products) 
   const categories = JSON.parse(createNoticeDto.categories)
   
   try {
     const uuid = await this.helperService.generateUUId()
     const today = new Date()
     const year = today.getFullYear();
     createNoticeDto.year = year
     const tendernumber = await this.helperService.sanitizename(createNoticeDto.tendernumber)
     createNoticeDto.tendernumber2 = tendernumber
     createNoticeDto.uuid = uuid
    const record = await this.noticeRepository.create(createNoticeDto)
    await this.noticeRepository.save(record)
     let productdata = []

     products.forEach(element => {
        const el = {noticeId:record.id,description:element.name,quantity:element.quantity}
        productdata.push(el)
     });

     await Noticeproduct.save(productdata)      
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
     
    const logdata:LogDataDto ={administratorId:createNoticeDto.creator,action:"CREATE",entity:"notice",newvalue:record,oldvalue:{}}
    await  this.auditService.create(logdata)
    return {"status":"success","message":"Notice Successfully Created"}
  } catch (error) {
    let message = error.sqlMessage ? error.sqlMessage : error.message
    throw new HttpException(message,HttpStatus.BAD_REQUEST)
  } 
  } 

  async findAll() {
     return await this.noticeRepository.find({order:{id:'DESC'},relations:['procuremententity','noticecategory','section','noticeproduct','noticetype']})
  }

  findOne(id: number) {
    return `This action returns a #${id} notice`;
  }

  async update(uuid: string, updateNoticeDto: UpdateNoticeDto,administratorId:number) {
    try {
      const products = JSON.parse(updateNoticeDto.products) 
      const categories = JSON.parse(updateNoticeDto.categories)
      const oldrecord = await this.noticeRepository.findOne({where:{uuid:uuid}})
      const tendernumber = await this.helperService.sanitizename(updateNoticeDto.tendernumber)
      const today = new Date()
      const year = today.getFullYear();
       updateNoticeDto.tendernumber2 = tendernumber
       oldrecord.level = updateNoticeDto.level
       oldrecord.title = updateNoticeDto.title
       oldrecord.procuremententityId = updateNoticeDto.procuremententityId
       oldrecord.tendernumber = updateNoticeDto.tendernumber
       oldrecord.tendernumber2 = await this.helperService.sanitizename(updateNoticeDto.tendernumber)
       oldrecord.closingDate = updateNoticeDto.closingDate
       oldrecord.closingTime = updateNoticeDto.closingTime
       oldrecord.reach = updateNoticeDto.reach
       oldrecord.year = year
       await oldrecord.save()
      // await this.noticeRepository.update({uuid:uuid},updateNoticeDto)
       const newrecord =  await this.noticeRepository.findOne({where:{uuid:uuid}})
       await Noticeproduct.delete({noticeId:newrecord.id})
       await Noticecategory.delete({noticeId:newrecord.id})
       let productdata = []

       products.forEach(element => {
          const el = {noticeId:newrecord.id,description:element.name,quantity:element.quantity}
          productdata.push(el)
       });
  
       await Noticeproduct.save(productdata)      
       if(categories)
       {
       
        const categorydata  = await Category.find({where:{code:In(categories)}})
  
        let categoryarray=[]
        categorydata.forEach(cat=>{
          const el ={noticeId:newrecord.id,categoryId:cat.id}
          categoryarray.push(el)
        })
        await Noticecategory.save(categoryarray)
  
       }
       

       /**
        *  trigger  update event
        */
      const logdata:LogDataDto ={administratorId:administratorId,action:"UPDATE",entity:"notice",newvalue:newrecord,oldvalue:oldrecord}
      await  this.auditService.create(logdata)
      return {"status":"success","message":"Notice Successfully Updated"}
    } catch (error) {
      let message = error.sqlMessage ? error.sqlMessage : error.message
      throw new HttpException(message,HttpStatus.BAD_REQUEST)
    }
  }

 async remove(uuid: string , administratorId:number) {
    try {
      const oldrecord = await this.noticeRepository.findOne({where:{uuid:uuid}})
       const newrecord =  {}
       const applications = await Tenderapplication.find({where:{tendernumber:oldrecord.tendernumber}})
       let message = ""
       let action=""
       if(applications.length>0){
        oldrecord.status ="CANCELLED"
        oldrecord.save()
        message ="Notice Successfully Cancelled"
        action="CANCELLED"
       }else{
         await Noticefee.delete({noticeId:oldrecord.id})
        await Noticeproduct.delete({noticeId:oldrecord.id})
        await Noticecategory.delete({noticeId:oldrecord.id})
         await this.noticeRepository.delete({uuid:uuid})
         message ="Notice Successfully Deleted"
         action="DELETED"
       }
      

       /**
        *  trigger  refund event
        */
      const logdata:LogDataDto ={administratorId:administratorId,action:action,entity:"notice",newvalue:newrecord,oldvalue:oldrecord}
      await  this.auditService.create(logdata)
      return {"status":"success","message":message}
    } catch (error) {
      let message = error.sqlMessage ? error.sqlMessage : error.message
      throw new HttpException(message,HttpStatus.BAD_REQUEST)
    }
  }
}
