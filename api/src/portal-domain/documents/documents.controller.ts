import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { isFileSafe, pageCount, removeFile, uploadBidderDocuments } from 'src/uploadhelpers/document.storage';
import { DocumentsService } from './documents.service';

@Controller('bidder/documents')
@UseGuards(JwtAuthGuard)
export class DocumentsController {
    constructor(private readonly documentsService:DocumentsService){}
    @Get()
    async getDocs(@Request() req){
        const user = req.user
        return await this.documentsService.findAll(user.userId)
    }
    @Post()
    @UseInterceptors(FileInterceptor('file',uploadBidderDocuments))
    async uploadDoc(@UploadedFile() file:Express.Multer.File,@Body() formdata:any,@Request() req){
        const filename = file?.filename       
      
        if(filename){
         const folderPath = join(process.cwd()+'/public','documents')
         const fullfilepath = join(folderPath+"/"+filename);  
         const isfilesafe = await isFileSafe(fullfilepath)
         const pcount = await pageCount(fullfilepath,formdata.id)  
         console.log(pcount)      
         if(isfilesafe)
         { 
           
          if(pcount.status=='success')
          {
          const path = "documents/"+filename
          const user = req.user
          formdata.filename = path
          return await this.documentsService.uploadDocument(formdata,user.userId);
          }else{
            await removeFile(fullfilepath)
            throw new HttpException(pcount.message,HttpStatus.BAD_REQUEST)
          }
        }else{
          await removeFile(fullfilepath)
          throw new HttpException("Invalid file type 1",HttpStatus.BAD_REQUEST) 
        }        
    }
    throw new HttpException("Filename not found",HttpStatus.BAD_REQUEST) 
 
}
}
