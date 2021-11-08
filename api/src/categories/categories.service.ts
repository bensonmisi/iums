import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private categoryRepository:Repository<Category>){}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const created = await this.categoryRepository.create(createCategoryDto)
      await this.categoryRepository.save(created)
      return {'status':'success','message':'Category Successfully Created'}
    } catch (error) {
      throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST) 
    }
  }

  async findAll() {
    return await this.categoryRepository.find()
  }

 async  findOne(id: number) {
    return await this.categoryRepository.findOne(id)
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
   const updated = await this.categoryRepository.update(id,updateCategoryDto)
   return {'status':'success','message':'Category Successfully Updated'}
  }

  async remove(id: number) {
    await this.categoryRepository.delete(id)
    return {'status':'success','message':'Category Successfully Deleted'}
  }
}
