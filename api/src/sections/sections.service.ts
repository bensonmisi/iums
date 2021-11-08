import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Section } from './entities/section.entity';

@Injectable()
export class SectionsService {
  constructor(@InjectRepository(Section) private sectionRepository:Repository<Section>){}
  async create(createSectionDto: CreateSectionDto) {
    const created = await this.sectionRepository.create(createSectionDto)
    await this.sectionRepository.save(created)
    return {'status':'success','message':'Section Successfully Saved'}
  }

  async findAll() {
    return await this.sectionRepository.find();
  }

  async findOne(id: number) {
    return await this.sectionRepository.findOne(id);
  }

  async update(id: number, updateSectionDto: UpdateSectionDto) {
    await this.sectionRepository.update(id,updateSectionDto)
    return {'status':'success','message':'Section Successfully Updated'}
  }

  async remove(id: number) {
    return await this.sectionRepository.delete(id)
  }
}
