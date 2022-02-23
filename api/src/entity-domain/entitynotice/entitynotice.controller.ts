import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { HasPermission } from 'src/decorators/hasPermission.decorator';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { isFileSafe, removeFile, uploadNotice } from 'src/uploadhelpers/notice.storage';
import { CreateEntityNoticeDto } from './dto/create-entitynotice.dto';
import { EntitynoticeService } from './entitynotice.service';

@Controller('entity-domain/entitynotice')
@UseGuards(JwtAuthGuard,AccessLevelGuard)
export class EntitynoticeController {
  constructor(private readonly entitynoticeService: EntitynoticeService) {}

 @Get()
 @HasPermission('GET_ENTITY_NOTICES')
 async findall(@Request() req){
   const user = req.user
   return await this.entitynoticeService.findAll(user.userId)
 }


 @Post()
 @UseInterceptors(FileInterceptor('file',uploadNotice))
 @HasPermission('CREATE_ENTITY_NOTICE')
 async create(@UploadedFile() file:Express.Multer.File,@Body() createEntityNoticeDto:CreateEntityNoticeDto,@Request() req){
  const filename = file?.filename 
  if(filename){
    const folderPath = join(process.cwd()+'/public','notices')
    const fullfilepath = join(folderPath+"/"+filename);  
    const isfilesafe = await isFileSafe(fullfilepath)
    
    if(isfilesafe)
    { 
      const path = "notices/"+filename
    const user = req.user
   createEntityNoticeDto.creator = user.userId
   createEntityNoticeDto.filename = path    
   createEntityNoticeDto.level = 'USER'
    return await this.entitynoticeService.create(createEntityNoticeDto,user.userId);
  }else{
    await removeFile(fullfilepath)
    throw new HttpException("Invalid file type",HttpStatus.BAD_REQUEST) 
  }   

}
}
}
