import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { UpdateChecklistDto } from './dto/update-checklist.dto';
import { Checklist } from './entities/checklist.entity';

@Injectable()
export class ChecklistService {
  constructor(@InjectRepository(Checklist) private readonly checklistRepository:Repository<Checklist>){}
  async create(createChecklistDto: CreateChecklistDto) {
    await this.checklistRepository.save(createChecklistDto)
    return {status:"success",message:"Checklist successfully created"}
  }

  async findAll() {
    return await this.checklistRepository.find({relations:['checklistquestion']})
  }

  findOne(id: number) {
    return `This action returns a #${id} checklist`;
  }

  update(id: number, updateChecklistDto: UpdateChecklistDto) {
    return `This action updates a #${id} checklist`;
  }

  remove(id: number) {
    return `This action removes a #${id} checklist`;
  }
}
