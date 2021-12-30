import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Documentcomment } from 'src/documentcomments/entities/documentcomment.entity';
import { createQueryBuilder, In, Repository } from 'typeorm';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './entities/supplier.entity';

@Injectable()
export class SupplierService {
  constructor(@InjectRepository(Supplier) private readonly supplierRepository:Repository<Supplier>){}
  create(createSupplierDto: CreateSupplierDto) {
    return 'This action adds a new supplier';
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

  findOne(id: number) {
    return `This action returns a #${id} supplier`;
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return `This action updates a #${id} supplier`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }


}
