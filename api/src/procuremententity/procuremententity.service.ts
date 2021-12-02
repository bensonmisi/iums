import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelperService } from 'src/helper/helper.service';
import { Repository } from 'typeorm';
import { CreateProcuremententityDto } from './dto/create-procuremententity.dto';
import { UpdateProcuremententityDto } from './dto/update-procuremententity.dto';
import { Procuremententity } from './entities/procuremententity.entity';

@Injectable()
export class ProcuremententityService {

  constructor(@InjectRepository(Procuremententity) 
             private readonly procuremententityRepository:Repository<Procuremententity>,
             private helperService:HelperService
             ){}
  async create(createProcuremententityDto: CreateProcuremententityDto):Promise<any> {
      try {
         const {name } = createProcuremententityDto
         const data = await this.procuremententityRepository.find()
         const findneedle = await this.helperService.checkEntityName(data,name)
         if(findneedle){

         }else{
           throw new HttpException("Procurement Entity Name Already Saved",HttpStatus.BAD_REQUEST)
         }

      } catch (error) {
       throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)  
      }
  }

  findAll() {
    return `This action returns all procuremententity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} procuremententity`;
  }

  update(id: number, updateProcuremententityDto: UpdateProcuremententityDto) {
    return `This action updates a #${id} procuremententity`;
  }

  remove(id: number) {
    return `This action removes a #${id} procuremententity`;
  }
}
