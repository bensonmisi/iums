import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityUser } from '../entity-user/entities/entity-user.entity';
import { CreateAnnualplanDto } from './dto/create-annualplan.dto';
import { UpdateAnnualplanDto } from './dto/update-annualplan.dto';
import { Annualplan } from './entities/annualplan.entity';

@Injectable()
export class AnnualplanService {
  constructor(@InjectRepository(Annualplan) private readonly annualplanRepository:Repository<Annualplan>){}
 async create(createAnnualplanDto: CreateAnnualplanDto,userId:number) {
   try {
     const today = new Date()
     const currentyear = today.getFullYear()
     const user = await EntityUser.findOne({where:{id:userId}})
    createAnnualplanDto.author = userId  
    createAnnualplanDto.procuremententityId = user.procuremententityId
    createAnnualplanDto.year = currentyear 
    await this.annualplanRepository.save(createAnnualplanDto)
    return {status:"success",message:"Successfully Created Annual plan item"}
   } catch (error) {
       const message = error.sqlMessage ? error.sqlMessage : error.message
       throw new HttpException(message,HttpStatus.BAD_REQUEST) 
   }
     
  }

  async findAll(userId:number) {
    const today = new Date()
    const currentyear = today.getFullYear()
    const user = await EntityUser.findOne({where:{id:userId}})
    return await Annualplan.find({where:{procuremententityId:user.procuremententityId,year:currentyear},relations:['noticetype','currency','uom','procurementcategory','procurementclassification']})
   
  }

  findOne(id: number) {
    return `This action returns a #${id} annualplan`;
  }

  async update(id: number, updateAnnualplanDto: UpdateAnnualplanDto,userId:number) {
   
    const user = await EntityUser.findOne({where:{id:userId}})
    const item = await this.annualplanRepository.findOne({where:{id:id,status:'PENDING'}})
    if(item)
    {
      if(user.procuremententityId !== item.procuremententityId){
        throw new HttpException('Unauthorized',HttpStatus.BAD_REQUEST)
      }
    item.description = updateAnnualplanDto.description
    item.cost = updateAnnualplanDto.cost
    item.annualcost = updateAnnualplanDto.annualcost
    item.author = updateAnnualplanDto.author
    item.noticetypeId = updateAnnualplanDto.noticetypeId
    item.spoc = updateAnnualplanDto.spoc
    item.rate_of_purchase = updateAnnualplanDto.rate_of_purchase
    item.cycle_time = updateAnnualplanDto.cycle_time
    item.prequalification = updateAnnualplanDto.prequalification
    item.external_lead_time = updateAnnualplanDto.external_lead_time
    item.source_of_funds = updateAnnualplanDto.source_of_funds
    item.date_of_purchase = updateAnnualplanDto.date_of_purchase
    item.currencyId = updateAnnualplanDto.currencyId
    item.procurementcategoryId = updateAnnualplanDto.procurementcategoryId
    item.procurementclassificationId = updateAnnualplanDto.procurementclassificationId
    item.quantity = updateAnnualplanDto.quantity
    item.uomId = updateAnnualplanDto.uomId
    await item.save();
    return {status:"success",message:'Item successfully Updated'}
 
    }else{
      throw new HttpException("Item not found",HttpStatus.BAD_REQUEST)
    }


  }

  async remove(id: number,userId:number) {
    const item = await this.annualplanRepository.findOne({where:{id:id,status:'PENDING'}})
    const user = await EntityUser.findOne({where:{id:userId}})
    if(item)
    {
      if(user.procuremententityId !== item.procuremententityId){
        throw new HttpException('Unauthorized',HttpStatus.BAD_REQUEST)
      }
      await this.annualplanRepository.delete(id)
     return {status:"success",message:'Item successfully Deleted'}
  
    }else{
      throw new HttpException("Item not found",HttpStatus.BAD_REQUEST)
    }
  }

  async approve(userId:number){
    const today = new Date()
    const currentyear = today.getFullYear()
    const user = await EntityUser.findOne({where:{id:userId}})
    const plans = await Annualplan.find({where:{procuremententityId:user.procuremententityId,year:currentyear,status:'PENDING'},relations:['individualplans']})
   await this.checkplan(plans)
   await Annualplan.update({procuremententityId:user.procuremententityId,year:currentyear,status:'PENDING'},{status:'APPROVED',approver:userId})
   return {status:"success",message:"Plan successfully approved"}
  }

  async checkplan(plan:Annualplan[]){
     let error = false 
    
     plan.forEach(pl=>{
       let totalquantity = 0

       if(pl.individualplans.length==0){
         error = true
       }
       pl.individualplans.forEach(ind=>{
          totalquantity = totalquantity+ind.quantity
       })

       if(totalquantity<+pl.quantity){
         error = true
       }
     })

     if(error){
       throw new HttpException("Plan cannot be approve please make sure every item in the plan has corresponding individual plans breakdown",HttpStatus.BAD_REQUEST)
     }
    
  }

}
