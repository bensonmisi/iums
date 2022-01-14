import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplierinvoice } from 'src/supplierinvoice/entities/supplierinvoice.entity';
import { Tenderinvoice } from 'src/tenderinvoice/entities/tenderinvoice.entity';
import { Repository } from 'typeorm';
import { CreateTaskmanagerDto } from './dto/create-taskmanager.dto';
import { UpdateTaskmanagerDto } from './dto/update-taskmanager.dto';
import { Taskmanager } from './entities/taskmanager.entity';

@Injectable()
export class TaskmanagerService {
  constructor(@InjectRepository(Taskmanager) private readonly taskmanagerRepository:Repository<Taskmanager>){}
  async create(createTaskmanagerDto: CreateTaskmanagerDto) {
    try {
       const record = await this.findOne(createTaskmanagerDto.identifier,createTaskmanagerDto.type)
       if(!record)
       {
       await this.taskmanagerRepository.save(createTaskmanagerDto)
       return {"status":"success","message":"Successfully Added Job to task"}
       }else{
         throw new HttpException("Job already add to:"+record.administrator.name,HttpStatus.BAD_REQUEST)
       }
    } catch (error) {
      throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(administratorId:number) {
    return  await this.taskmanagerRepository.find({where:{administratorId:administratorId,status:'PENDING'},relations:['account']});
  }
 async findOne(identifier:string,type:string){
   return await this.taskmanagerRepository.findOne({where:{identifier:identifier,type:type},relations:['administrator']})
 }

  async remove(id: number,administratorId:number) {
    const record = await this.taskmanagerRepository.findOne({where:{id:id}})
       if(record.administratorId==administratorId)
       {
        await this.taskmanagerRepository.delete(id);
        return {"status":"success","message":"Task successfully deleted"}
       }else{
         throw new HttpException("You can only delete you tasks",HttpStatus.BAD_REQUEST)
       }
  }

  async completed(id:number,administratorId:number){
    const record = await this.taskmanagerRepository.findOne({where:{id:id}})
    if(record.administratorId==administratorId)
    {
      const check = await this.checkTask(record)
      if(check)
      {
     await this.taskmanagerRepository.update(id,{status:'COMPLETED'});
     return {"status":"success","message":"Task successfully Marked as Completed"}
      }else{
         throw new HttpException('Task not yet completed',HttpStatus.BAD_REQUEST)
        
      }
    }else{
      throw new HttpException("You can only delete you tasks",HttpStatus.BAD_REQUEST)
    }
  }

  async checkTask(task:Taskmanager){
     if(task.type=='TENDERINVOICES'){
       const record = await Tenderinvoice.findOne({where:{id:task.identifier}})
       if(record){
         if(record.status==='PAID'){
            return true
         }else{
           return false
         }
       }
       throw new HttpException("Tender invoice not found",HttpStatus.BAD_REQUEST)
     }
     if(task.type=='SUPPLIERINVOICES'){
      const record = await Supplierinvoice.findOne({where:{id:task.identifier}})
      if(record){
        if(record.status==='PAID'){
           return true
        }else{
          return false
        }
      }
      throw new HttpException("Supplier invoice not found",HttpStatus.BAD_REQUEST)
    }
  }
}
