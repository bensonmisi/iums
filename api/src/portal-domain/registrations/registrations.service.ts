import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { Supplierinvoice } from 'src/supplierinvoice/entities/supplierinvoice.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegistrationsService {
    constructor(@InjectRepository(Supplier) private readonly supplierRepository:Repository<Supplier>){}

    async getAll(userId:number){
        const user = await User.findOne({where:{id:userId}})
        return await this.supplierRepository.find({where:{accountId:user.accountId},order:{id:'DESC'},relations:['category']})
    }

    async change(formdata:any,userId:number){
        const user = await User.findOne({where:{id:userId}})
        const category = await this.supplierRepository.findOne({where:{id:formdata.id,accountId:user.accountId}})
        if(category){
           if(category.printed>0){
               throw new HttpException("Category already downloaded cannot be changed",HttpStatus.BAD_REQUEST)
           }
           const check = await this.supplierRepository.findOne({where:{categoryId:formdata.categoryId,accountId:user.accountId,expire_year:category.expire_year}})
           if(check){
               throw new HttpException("Change request failed: Category already registerd",HttpStatus.BAD_REQUEST)
           }

           const invoice = await Supplierinvoice.findOne({where:{id:category.supplierinvoiceId}})
           invoice.categoryId = formdata.categoryId
           await invoice.save()

           category.categoryId = formdata.categoryId
           await category.save()

           return {"status":"success","message":"Successfully changed category"}
        }
        throw new HttpException("Registration not found",HttpStatus.BAD_REQUEST)
    }

   
}
