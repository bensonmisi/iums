import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrator } from 'src/administrator/entities/administrator.entity';
import { Repository } from 'typeorm';
import { LogDataDto } from './dto/logdata.dto';
import { audit } from './entities/audit.entity';

@Injectable()
export class AuditService {
    constructor(@InjectRepository(audit) private auditRepository:Repository<audit>){}

    async create(logDataDto:LogDataDto):Promise<any>{
            try {
              await this.auditRepository.save(logDataDto) 
            } catch (error) {
               throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)
            }
            
             }
}
