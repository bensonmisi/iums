import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChecklistquestionDto } from './dto/create-checklistquestion.dto';
import { UpdateChecklistquestionDto } from './dto/update-checklistquestion.dto';
import { Checklistquestion } from './entities/checklistquestion.entity';

@Injectable()
export class ChecklistquestionsService {
  constructor(@InjectRepository(Checklistquestion) private readonly checklistquestionRepository:Repository<Checklistquestion>){}
  async create(createChecklistquestionDto: CreateChecklistquestionDto) {
      await this.checklistquestionRepository.save(createChecklistquestionDto)
      return {status:"success",message:"Successfully Created Question"}
  }

  async findAll(id:number) {
    return await this.checklistquestionRepository.find({where:{checklistId:id}})
  }

  findOne(id: number) {
    return `This action returns a #${id} checklistquestion`;
  }

  update(id: number, updateChecklistquestionDto: UpdateChecklistquestionDto) {
    return `This action updates a #${id} checklistquestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} checklistquestion`;
  }
}
