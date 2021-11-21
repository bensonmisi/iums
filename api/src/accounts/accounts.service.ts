import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelperService } from 'src/helper/helper.service';
import { Suppliertype } from 'src/suppliertype/entities/suppliertype.entity';
import { CreateDateColumn, Like, Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(@InjectRepository(Account) private accountRepository:Repository<Account>,
             private helperService:HelperService
             ){}
  async create(createAccountDto: CreateAccountDto) {
    const {name} = createAccountDto
    try {
      const accounts = await this.findAll()
      const processedname = await this.helperService.checkCompanyName(accounts,name)      
      if(processedname){
       const created = await this.accountRepository.create(createAccountDto)
       const save = await this.accountRepository.save(created)
       const regnumber = await this.helperService.generateRegistrationNumber(save.id)
       save.regnumber = regnumber
       await save.save()
       return {'status':'success','message':'Account Successfully Created'}
      }else{
        throw new HttpException({message:"Account name already exist"},HttpStatus.BAD_REQUEST)
      }
    } catch (error) {
      throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)
    }
 
  }


  async findAll() {
    return await this.accountRepository.find();
  }

  async findOne(id: number) {
    return await  this.accountRepository.find({where:{id:id}})
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
     try {
      const accounts = await this.findAll()
      const {name} = updateAccountDto
      const processedname = await this.helperService.checkCompanyName(accounts,name)      
      if(!processedname){
         const{name,...rest} = updateAccountDto
         await this.accountRepository.update(id,rest)
         return {'status':'success','message':'Profile Updated However company was not updated because it already exists'}
      }
      else{
        await this.accountRepository.update(id,updateAccountDto)
        return {'status':'success','message':'Profile Updated Successfully '}

      }
      
     } catch (error) {
        throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)
     }
  }

  async search(query:string){
    return await this.accountRepository.createQueryBuilder("account")
                                       .where("name like :name",{name:`%${query}%`})
                                       .orWhere("regnumber like  :regnumber ",{regnumber:`%${query}%`})
                                       .getMany()

  }

  async searchByDescription(description:string):Promise<Account>{
    return await this.accountRepository.findOne({regnumber:description})
  }
  async remove(id: number) {
    /**
     * delete an account if it doesnt have any activities
     */
    return `This action removes a #${id} account`;
  }

 
}
