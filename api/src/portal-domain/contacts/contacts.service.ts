import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/contacts/entities/contact.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(@InjectRepository(Contact) private readonly contactRepository:Repository<Contact>){}
  async create(createContactDto: CreateContactDto,userId:number) {
    try {
      const user = await User.findOne({where:{id:userId}})
      createContactDto.accountId=user.accountId
      await this.contactRepository.save(createContactDto)
      return {status:'success',message:'Successfully Created Contacts'};
    } catch (error) {
      const message = error.sqlMessage ? error.sqlMessage :error.message
     throw new HttpException(message,HttpStatus.BAD_REQUEST)
    }
   
  }

  findAll() {
    return `This action returns all contacts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  async update(id: number, updateContactDto: UpdateContactDto,userId:number) {
    try {
      const user = await User.findOne({where:{id:userId}})
      const contact = await this.contactRepository.findOne(id)
      if(contact.accountId !== user.accountId){
        throw new HttpException("Unauthorized access",HttpStatus.BAD_REQUEST)
      }
      await this.contactRepository.update(id,updateContactDto)
      return {status:'success',message:'Successfully Updated Contacts'};
    } catch (error) {
      const message = error.sqlMessage ? error.sqlMessage :error.message
     throw new HttpException(message,HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: number,userId:number) {
    try {
      const user = await User.findOne({where:{id:userId}})
      const contact = await this.contactRepository.findOne(id)
      if(contact.accountId !== user.accountId){
        throw new HttpException("Unauthorized access",HttpStatus.BAD_REQUEST)
      }
      await this.contactRepository.delete(id)
      return {status:'success',message:'Successfully Deleted Contacts'};
    } catch (error) {
      const message = error.sqlMessage ? error.sqlMessage :error.message
     throw new HttpException(message,HttpStatus.BAD_REQUEST)
    }
  }
}
