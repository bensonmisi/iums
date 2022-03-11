import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accountdocument } from 'src/accountdocuments/entities/accountdocument.entity';
import { Account } from 'src/accounts/entities/account.entity';
import { Documentcomment } from 'src/documentcomments/entities/documentcomment.entity';
import { HelperService } from 'src/helper/helper.service';
import { createQueryBuilder, In, Raw, Repository } from 'typeorm';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './entities/supplier.entity';

@Injectable()
export class SupplierService {
  constructor(@InjectRepository(Supplier) private readonly supplierRepository:Repository<Supplier>,
             private readonly helperService:HelperService
  ){}
  async create(createSupplierDto: CreateSupplierDto) {
    let datequery={}
    let statusquery={}
    if(createSupplierDto.fromDate && createSupplierDto.toDate ){
      datequery=Object.assign({ issued_on:  Raw((alias) => `${alias} BETWEEN :date AND :date2 `, { date: createSupplierDto.fromDate,date2:createSupplierDto.toDate })})
     }
     if(createSupplierDto.status){
      statusquery = Object.assign({status:createSupplierDto.status})
    }
     const query = { ...datequery,...statusquery}
     const data =  await this.supplierRepository.find({where:query,relations:['category','account']})
    
     let array =[]

     if(data.length>0){
       data.forEach(dt=>{
         const date = new Date(dt.issued_on)
         const el = {
                  issuedOn:date,
                  name:dt.account ? dt.account.name :"-",
                  regnumber:dt.account ? dt.account.regnumber :"-",
                  code:dt.category ? dt.category.code:'-',
                  description:dt.category ? dt.category.name :'',
                  country:dt.account ? dt.account.country:'',
                  city:dt.account?dt.account.city:'',
                  emails:dt.account?dt.account.contact?dt.account.contact.emails:'-':'-',
                  phones:dt.account?dt.account.contact?dt.account.contact.phones:'-':'-',
                  address:dt.account?dt.account.contact?dt.account.contact.address:'-':'-'
                }

           array.push(el)
       })
     }
     return array

  }

  async findAll():Promise<any> {
    const date = new Date()
    const expire_year = date.getFullYear()
    console.log(expire_year)
    const suppliers= await  createQueryBuilder(Supplier,'suppliers')
                           .leftJoinAndSelect('suppliers.account','account')
                           .where('suppliers.status=:status',{status:'PENDING'})
                           .andWhere('suppliers.expire_year >= :expire_year',{expire_year:expire_year})
                           .groupBy("suppliers.accountId")
                           .orderBy('suppliers.id','DESC')
                           .getMany()
      let pending=[]
      let awaiting=[]
       let id =[]
      suppliers.forEach(async supplier=>{
          id.push(supplier.accountId)
      })
      let comments = await Documentcomment.find({where:{accountId:In(id)}})
       suppliers.forEach(supplier=>{
          let found = false
            comments.forEach(comment=>{
              if(comment.accountId == supplier.accountId){
                  found = true
              }
            })

            if(found){
              awaiting.push({id:supplier.accountId,created_at:supplier.created_at,name:supplier.account ? supplier.account.name :''})
            }else{
              pending.push({id:supplier.accountId,created_at:supplier.created_at,name:supplier.account ? supplier.account.name :''}) 
            }
       })
    return {pending:pending,awaiting:awaiting}
  }

  async findOne(id: number) {
    const account = await  Account.findOne({where:{id:id},relations:['suppliertype']})
    const documents = await this.helperService.accountdocuments(account)
    const comments = await Documentcomment.find({where:{accountId:account.id}})
    const registrations = await Supplier.find({where:{accountId:id,status:'PENDING'},relations:['category']})

    return {account:account,documents:documents,comments:comments,registrations:registrations}
  }

  async viewDocument(id:number){
    return await Accountdocument.findOne({where:{id:id}})
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return `This action updates a #${id} supplier`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }


}
