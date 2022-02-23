import { Body, Controller, HttpException, HttpStatus, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { isCvSafe, uploadPMUCv } from 'src/uploadhelpers/cv.storage';
import { UploadCvDto } from './dto/upload-cv.dto';
import { UploadCvService } from './upload-cv.service';

@Controller('entity-domain/upload-cv')
@UseGuards(JwtAuthGuard)
@HasAccesslevel('ENTITY')
export class UploadCvController {
  constructor(private readonly uploadCvService: UploadCvService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file',uploadPMUCv))
  async upload(@UploadedFile() file:Express.Multer.File,@Body() uploadCvDto:UploadCvDto){
    const filename = file?.filename

    if(filename){
     const folderPath = join(process.cwd()+'/public','cv')
     const fullfilepath = join(folderPath+"/"+filename);  
     const isfilesafe = await isCvSafe(fullfilepath)
     if(isfilesafe){
       const filepath = "cv/"+filename
       uploadCvDto.cv = filepath
      return  await this.uploadCvService.upload(uploadCvDto)
     }
     throw new HttpException('Incorrect file type',HttpStatus.BAD_REQUEST)

    }
    throw new HttpException("Corrupt file",HttpStatus.BAD_REQUEST)

  }

}
