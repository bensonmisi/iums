import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { Tenderapplication } from 'src/tenderapplication/entities/tenderapplication.entity';
import { Repository } from 'typeorm';
import { VerifyDto } from './dto/verify.dto';

@Injectable()
export class VerificationService {

  constructor(@InjectRepository(Supplier) private readonly supplierRepository:Repository<Supplier>){}
    async verify(verifyDto:VerifyDto){
        let supplier =await this.supplierRepository.findOne({where:{code:verifyDto.code,status:'APPROVED'},relations:['account','category']})
        let tenderapplication= await Tenderapplication.findOne({where:{code:verifyDto.code},relations:['procuremententity','notice','currency','account']})
        if(!supplier && !tenderapplication){
            throw new HttpException("Verification code could not be found. This can be caused by mistyping the verification code or a fake certificate. Please try to capture the verification code correctly(including - sign) ",HttpStatus.BAD_REQUEST)
        }
        
        return {tenderapplication:tenderapplication,supplier:supplier}
    }
}
