import { Body, Controller, HttpException, HttpStatus, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { isSignatureFileSafe,uploadPMUSignatre } from 'src/uploadhelpers/signature.storage';
import { UploadSignatureDto } from './dto/upload-signature.dto';
import { UploadSignatureService } from './upload-signature.service';

@Controller('entity-domain/upload-signature')
@UseGuards(JwtAuthGuard)
@HasAccesslevel('ENTITY')

export class UploadSignatureController {
  constructor(private readonly uploadSignatureService: UploadSignatureService) {}

  @Post()
  //@HasPermission('UPLOAD_SIGNATURE')
  @UseInterceptors(FileInterceptor('file',uploadPMUSignatre))
  async upload(@UploadedFile() file:Express.Multer.File,@Body() uploadSignatureDto:UploadSignatureDto){
  
     const filename = file?.filename

     if(filename){
      const folderPath = join(process.cwd()+'/public','signature')
      const fullfilepath = join(folderPath+"/"+filename);  
      const isfilesafe = await isSignatureFileSafe(fullfilepath)
      if(isfilesafe){
        const filepath = "signature/"+filename
        uploadSignatureDto.signature =filepath
       return  await this.uploadSignatureService.upload(uploadSignatureDto)
      }
      throw new HttpException('Incorrect file type',HttpStatus.BAD_REQUEST)

     }
     throw new HttpException("Corrupt file",HttpStatus.BAD_REQUEST)
  }
}
