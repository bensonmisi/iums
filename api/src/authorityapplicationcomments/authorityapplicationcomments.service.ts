import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Authorityapplication } from 'src/entity-domain/authorityapplication/entities/authorityapplication.entity';
import { Repository } from 'typeorm';
import { CreateAuthorityapplicationcommentDto } from './dto/create-authorityapplicationcomment.dto';
import { UpdateAuthorityapplicationcommentDto } from './dto/update-authorityapplicationcomment.dto';
import { Authorityapplicationcomment } from './entities/authorityapplicationcomment.entity';

@Injectable()
export class AuthorityapplicationcommentsService {
  constructor(@InjectRepository(Authorityapplicationcomment) private readonly authorityapplicationRepository:Repository<Authorityapplicationcomment>){}
  async create(createAuthorityapplicationcommentDto: CreateAuthorityapplicationcommentDto,userId:number) {
   createAuthorityapplicationcommentDto.administratorId = userId
   await this.authorityapplicationRepository.save(createAuthorityapplicationcommentDto)
   return {status:'success',message:'Comment successfully Created'}

   /**
     send an email to all entity users
   */
  }

  findAll() {
    return `This action returns all authorityapplicationcomments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authorityapplicationcomment`;
  }

  update(id: number, updateAuthorityapplicationcommentDto: UpdateAuthorityapplicationcommentDto) {
    return `This action updates a #${id} authorityapplicationcomment`;
  }

  remove(id: number) {
    return `This action removes a #${id} authorityapplicationcomment`;
  }
}
