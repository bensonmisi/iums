import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegistrationsService {
    constructor(@InjectRepository(Supplier) private readonly supplierRepository:Repository<Supplier>){}

    async getAll(userId:number){
        const user = await User.findOne({where:{id:userId}})
        return await this.supplierRepository.find({where:{accountId:user.accountId},order:{id:'DESC'},relations:['category']})
    }

   
}
