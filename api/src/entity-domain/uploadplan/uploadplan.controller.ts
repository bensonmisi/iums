import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { UploadplanService } from './uploadplan.service';
import { CreateUploadplanDto } from './dto/create-uploadplan.dto';
import { UpdateUploadplanDto } from './dto/update-uploadplan.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { isFileSafe, uploadProcurementPlan } from 'src/uploadhelpers/plan.storage';
import { join } from 'path';

@Controller('entity-domain/uploadplan')
@UseGuards(JwtAuthGuard)
@HasAccesslevel('ENTITY')
export class UploadplanController {
  constructor(private readonly uploadplanService: UploadplanService) {}

@Get()
async getUpload(@Request() req){
  const user = req.user
  return await this.uploadplanService.getUpload(user.userId)
}

@Post()
@UseInterceptors(FileInterceptor('file',uploadProcurementPlan)) 
async uploadPlan(@UploadedFile() file:Express.Multer.File,@Body() createUploadplanDto:CreateUploadplanDto,@Request() req){
  const filename = file?.filename       

  if(filename){ 
    const folderPath = join(process.cwd()+'/public','procurementplan')
    const fullfilepath = join(folderPath+"/"+filename);  
    const isfilesafe = await isFileSafe(fullfilepath)
    if(isfilesafe)
         {
          const path = "procurementplan/"+filename
          const user = req.user
          createUploadplanDto.filename = path
          return await this.uploadplanService.upload(createUploadplanDto,user.userId)
         }else{
          throw new HttpException("Invalid file type",HttpStatus.BAD_REQUEST) 
         }
  }else{
    throw new HttpException("Filename not found",HttpStatus.BAD_REQUEST) 
  }
}

@Delete(":id")
async removeItem(@Param('id') id:string, @Request() req){
   const user = req.user
   return await this.uploadplanService.remove(+id,user.userId)
}

  
}
