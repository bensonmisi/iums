import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenderapplication } from 'src/tenderapplication/entities/tenderapplication.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ApplicationService {
    constructor(@InjectRepository(Tenderapplication) private readonly tenderapplicationRepository:Repository<Tenderapplication>){}

    async getAll(userId:number){
        const user = await User.findOne({where:{id:userId}})
        return await this.tenderapplicationRepository.find({where:{accountId:user.accountId},relations:['procuremententity','currency']})
    }

    async download(id:number,userId:number){
        
    }
}
