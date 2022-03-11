import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Request, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { HasPermission } from 'src/decorators/hasPermission.decorator';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { isFileSafe, removeFile, uploadNotice } from 'src/uploadhelpers/notice.storage';
import { CreateEntityNoticeDto } from './dto/create-entitynotice.dto';
import { UpdateEntityNoticeDto } from './dto/update-entitynotice.dto';
import { EntitynoticeService } from './entitynotice.service';

@Controller('entity-domain/entitynotice')
export class EntitynoticeController {
  constructor(private readonly entitynoticeService: EntitynoticeService) {}

 @Get()
 @UseGuards(JwtAuthGuard,AccessLevelGuard)
 @HasPermission('GET_ENTITY_NOTICES')
 async findall(@Request() req){
   const user = req.user
   return await this.entitynoticeService.findAll(user.userId)
 }


 @Post()
 @UseGuards(JwtAuthGuard,AccessLevelGuard)
 @UseInterceptors(FileInterceptor('file',uploadNotice))
 @HasPermission('CREATE_ENTITY_NOTICE')
  async create(@UploadedFile() file:Express.Multer.File,@Body() createEntityNoticeDto:CreateEntityNoticeDto,@Request() req)
  {
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

 @Patch(':id')
 @UseGuards(JwtAuthGuard,AccessLevelGuard)
 @UseInterceptors(FileInterceptor('file',uploadNotice))
 @HasPermission('UPDATE_ENTITY_NOTICE')
  async update(@Param('id') id:string,@UploadedFile() file:Express.Multer.File,@Body() updateEntityNoticeDto:UpdateEntityNoticeDto,@Request() req)
  {
        const filename = file?.filename 
        if(filename){
          const folderPath = join(process.cwd()+'/public','notices')
          const fullfilepath = join(folderPath+"/"+filename);  
          const isfilesafe = await isFileSafe(fullfilepath)
          
          if(isfilesafe)
          { 
            const path = "notices/"+filename
          const user = req.user
        updateEntityNoticeDto.creator = user.userId
        updateEntityNoticeDto.filename = path    
       updateEntityNoticeDto.level = 'USER'
          return await this.entitynoticeService.update(+id,updateEntityNoticeDto,user.userId);
        }else{
          await removeFile(fullfilepath)
          throw new HttpException("Invalid file type",HttpStatus.BAD_REQUEST) 
        }   

      }
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard,AccessLevelGuard)
  async findOne(@Param("id") id:string,@Request() req){
    const user = req.user
    return await this.entitynoticeService.findOne(+id,user.userId)
  }

  @Get('confirm/:id')
  @UseGuards(JwtAuthGuard,AccessLevelGuard)
  async confirm(@Param("id") id:string,@Request() req){
    const user = req.user
    return await this.entitynoticeService.confirm(+id,user.userId)
  }

  @Get('download/:id')
  async download(@Param('id') id:string,@Request() req,@Res() res){
    const user = req.user
     const notice = await this.entitynoticeService.getDowload(+id)
     return res.sendFile(notice.filename,{root:'public'})

  }

  @Get('publish/:id')
  @UseGuards(JwtAuthGuard,AccessLevelGuard)
  async publish(@Param('id') id:string,@Request() req){
    const user = req.user
    return await this.entitynoticeService.publish(+id,user.userId)
  }
}
