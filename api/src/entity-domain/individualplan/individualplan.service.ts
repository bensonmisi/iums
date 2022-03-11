import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Annualplan } from '../annualplan/entities/annualplan.entity';
import { EntityUser } from '../entity-user/entities/entity-user.entity';
import { CreateIndividualplanDto } from './dto/create-individualplan.dto';
import { UpdateIndividualplanDto } from './dto/update-individualplan.dto';
import { Individualplan } from './entities/individualplan.entity';

@Injectable()
export class IndividualplanService {
  constructor(@InjectRepository(Individualplan) private readonly individualplanRepository:Repository<Individualplan>){}
  async create(createIndividualplanDto: CreateIndividualplanDto,userId:number) {
    const user = await EntityUser.findOne({where:{id:userId}})
    const plan = await Annualplan.findOne({where:{id:createIndividualplanDto.annualplanId,procuremententityId:user.procuremententityId},relations:['individualplans']})  
    if(!plan){
      throw new HttpException("Plan not found",HttpStatus.BAD_REQUEST)
    }
    let balance = await this.computebalance(plan)
 
    if(+createIndividualplanDto.quantity>balance){
      throw new HttpException("Quantity Specified is greater than specified on annual plan. Maximum quantity permitted is: "+plan.quantity,HttpStatus.BAD_REQUEST)
     }

    await this.checkdate(plan.date_of_purchase,createIndividualplanDto.date_of_purchase)
    createIndividualplanDto.procuremententityId = plan.procuremententityId
    createIndividualplanDto.year = plan.year
    await this.individualplanRepository.save(createIndividualplanDto)
    return {status:'success',message:'Individual item successfully save'}
   
  }


  async findAll(id: number,userId:number) {
    const user = await EntityUser.findOne({where:{id:userId}})
   // return await Annualplan.findOne({where:{id:id,procuremententityId:user.procuremententityId},relations:['individualplans']})
  return await this.individualplanRepository.find({where:{annualplanId:id}})
  }

  async update(id: number, updateIndividualplanDto: UpdateIndividualplanDto,userId:number) {
    const user = await EntityUser.findOne({where:{id:userId}})
    const plan = await Annualplan.findOne({where:{id:updateIndividualplanDto.annualplanId,procuremententityId:user.procuremententityId},relations:['individualplans']}) 
    if(!plan){
      throw new HttpException("Plan not found",HttpStatus.BAD_REQUEST)
    }
    if(plan.status !=='PENDING'){
      throw new HttpException("FAILED TO update :ANNUAL PLAN already approved",HttpStatus.BAD_REQUEST)
    }
    let balance = await this.computebalance(plan)
    let individualplan = plan.individualplans.filter(pl=>{return pl.id==id})
    const bal = balance+individualplan[0].quantity
    if(+updateIndividualplanDto.quantity>bal){
      throw new HttpException("Quantity Specified is greater than specified on annual plan. Maximum quantity permitted is: "+plan.quantity,HttpStatus.BAD_REQUEST)
     }

     await this.checkdate(plan.date_of_purchase,updateIndividualplanDto.date_of_purchase)
     await this.individualplanRepository.update(id,updateIndividualplanDto)
     return {status:'success',message:'Individual item successfully Updated'}

  }

  async remove(id: number,userId:number) {
    const plan = await this.individualplanRepository.findOne({where:{id:id},relations:['annualplan']})
    if(!plan){
      throw new HttpException("Plan not found",HttpStatus.BAD_REQUEST)
    }
     const user = await EntityUser.findOne({where:{id:userId}})
    if(plan.annualplan.procuremententityId!== user.procuremententityId){
      throw new HttpException("UNAUTHORIZED",HttpStatus.BAD_REQUEST)
    }

    if(plan.annualplan.status !=='PENDING'){
      throw new HttpException("FAILED TO DELETE :ANNUAL PLAN already approved",HttpStatus.BAD_REQUEST)
    }
    await this.individualplanRepository.delete(id)
    return {status:'success',message:'item successfully deleted'}
    
  }

 
async computebalance(plan:Annualplan){
  const individualplans = plan.individualplans
  let balance = +plan.quantity
  if(individualplans.length>0){
    let totalquantity = 0
    individualplans.forEach(pl=>{
      totalquantity = totalquantity+pl.quantity
    })

     balance = +plan.quantity-totalquantity      
   
 }
 return balance
}
  async checkdate(permittedDate:string,capturedDate:string){
    const range = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

    const permittedindex = range.indexOf(permittedDate)
    const capturedIndex = range.indexOf(capturedDate)

    if(capturedIndex>permittedindex){
      throw new HttpException("Date of purchase cannot be after "+permittedDate+"  which was specified in the annual plan",HttpStatus.BAD_REQUEST)
    }
  }

}
