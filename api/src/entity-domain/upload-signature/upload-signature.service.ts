import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Procurementmanagementunit } from '../procurementmanagementunit/entities/procurementmanagementunit.entity';
import { UploadSignatureDto } from './dto/upload-signature.dto';

@Injectable()
export class UploadSignatureService {

    async upload(uploadSignatureDto:UploadSignatureDto){
        const pmu = await Procurementmanagementunit.findOne({where:{id:uploadSignatureDto.id}})
        if(pmu && pmu.status=='PENDING')
        {
        pmu.signature = uploadSignatureDto.signature
        await pmu.save()
        return {status:'success',message:'Signature successfully Uploaded'}
        }
        throw new HttpException("Record not found",HttpStatus.BAD_REQUEST)
    }
}
