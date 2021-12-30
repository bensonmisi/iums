import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accountdocument } from 'src/accountdocuments/entities/accountdocument.entity';
import { Accountnumber } from 'src/accountnumber/entities/accountnumber.entity';
import { Accountprofile } from 'src/accountprofile/entities/accountprofile.entity';
import { Banktransaction } from 'src/banktransaction/entities/banktransaction.entity';
import { Contact } from 'src/contacts/entities/contact.entity';
import { Directorate } from 'src/directorate/entities/directorate.entity';
import { Documentcomment } from 'src/documentcomments/entities/documentcomment.entity';
import { Document } from 'src/documents/entities/document.entity';
import { HelperService } from 'src/helper/helper.service';
import { Onlinepayment } from 'src/onlinepayment/entities/onlinepayment.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { Supplierinvoice } from 'src/supplierinvoice/entities/supplierinvoice.entity';
import { Suppliertype } from 'src/suppliertype/entities/suppliertype.entity';
import { Suspense } from 'src/suspense/entities/suspense.entity';
import { Tenderapplication } from 'src/tenderapplication/entities/tenderapplication.entity';
import { Tenderinvoice } from 'src/tenderinvoice/entities/tenderinvoice.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateDateColumn, createQueryBuilder, In, Like, Repository } from 'typeorm';
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
    const account =  await  this.accountRepository.findOne({where:{id:id},relations:['suppliertype']})
    const users = await User.find({where:{accountId:id}})
    const profile = await Accountprofile.find({where:{accountId:id}})
    const contact = await Contact.findOne({where:{accountId:id}})
    const documents = await this.helperService.accountdocuments(account)
    const comments = await Documentcomment.find({where:{accountId:account.id}})
    const directors = await Directorate.find({where:{accountId:id}})
    const transactions = await Banktransaction.find({where:{regnumber:account.regnumber}})
    const suspense = await Suspense.find({where:{accountId:id},order:{id: "DESC"}})
    const balances = await this.helperService.get_suspense_balances(account.id)
    const onlinepayments = await Onlinepayment.find({where:{accountId:id}})
    const tenderappplications = await Tenderapplication.find({where:{accountId:id},relations:['currency']})
    const tenderinvoices = await Tenderinvoice.find({where:{accountId:id}})
    const supplierinvoices = await Supplierinvoice.find({where:{accountId:id},relations:['category','currency']})
    const registrations = await Supplier.find({where:{accountId:id},relations:['category']})
    return {account,users,profile,contact,documents,comments,supplierinvoices,directors,balances:balances,transactions,suspense,onlinepayments,tenderappplications,tenderinvoices,registrations}

  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
     try {
      const accounts = await this.findAll()
      const {name} = updateAccountDto
      const account = accounts.filter(accnt=>{
       if(accnt.id==id){
         return accnt
       }
      })
      let processedname = true
      if(account[0].name !== updateAccountDto.name){      
      processedname = await this.helperService.checkCompanyName(accounts,name)  
      } 
      if(updateAccountDto.country.toUpperCase()=='ZIMBABWE'){
        updateAccountDto.locality='LOCAL'
      }else{
        updateAccountDto.locality='FOREIGN'
      }
      if(processedname){
         const{name,...rest} = updateAccountDto
         await this.accountRepository.update(id,rest)
         return {'status':'success','message':'Profile Updated However name was not updated because it already exists'}
      }
      else{
        await this.accountRepository.update(id,updateAccountDto)
        return {'status':'success','message':'Profile Updated Successfully '}

      }
      
     } catch (error) {
       console.log(error)
        throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)
     }
  }

  async search(data:any){
    const query = data.query
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
