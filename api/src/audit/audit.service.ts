import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrator } from 'src/administrator/entities/administrator.entity';
import { Repository } from 'typeorm';
import { audit } from './entities/audit.entity';

@Injectable()
export class AuditService {
    constructor(@InjectRepository(audit) private auditRepository:Repository<audit>){}

    async create(administratorId:number,old_value:{},new_value:{},entityname:string,action:string):Promise<any>{
     await this.auditRepository.create({administratorId:administratorId,oldValue:old_value,newValue:new_value,entity:entityname,action:action})
    }
}
