import { Injectable } from '@nestjs/common';
import { Category } from 'src/categories/entities/category.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';

@Injectable()
export class RegisteredsuppliersService {
    async findAll(){
        const categories = await Category.find({where:{status:'CREATED'},relations:['suppliers']})
        let filteredData=[]
        const today = new Date()
        const fullyear = today.getFullYear()
         categories.forEach(cat=>{
             const suppliers = cat.suppliers.filter(supplier=>{
                 return supplier.expire_year==fullyear
             })
             const el = {id:cat.id,code:cat.code,description:cat.name,suppliers:suppliers.length}
             filteredData.push(el)
         })

         return filteredData
    }

    async find(id:number){
        const today = new Date()
        const fullyear = today.getFullYear()
        return await Supplier.find({where:{categoryId:id,expire_year:fullyear},relations:['category','account']})
    }
}
