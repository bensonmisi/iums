import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Procurementmanagementunit } from '../procurementmanagementunit/entities/procurementmanagementunit.entity';
import { UploadCvDto } from './dto/upload-cv.dto';

@Injectable()
export class UploadCvService {

    async upload(uploadCvDto:UploadCvDto){
        const pmu = await Procurementmanagementunit.findOne({where:{id:uploadCvDto.id}})
        if(pmu && pmu.status=='PENDING')
        {
        pmu.cv = uploadCvDto.cv
        await pmu.save()
        return {status:'success',message:'Cv successfully Uploaded'}
        }
        throw new HttpException("Record not found",HttpStatus.BAD_REQUEST)

    }
}
