import { Controller, Get, Post, Body, Patch, Param, Delete,Request, UseGuards, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { isFileSafe, removeFile, uploadNotice } from 'src/uploadhelpers/notice.storage';
import { join } from 'path';

@Controller('admin/notice')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Post() 
  @UseInterceptors(FileInterceptor('file',uploadNotice))
  @HasPermission('CREATE_NOTICE')
 async create(@UploadedFile() file:Express.Multer.File,@Body() createNoticeDto: CreateNoticeDto,@Request() req) {
  const filename = file?.filename 
  if(filename){
    const folderPath = join(process.cwd()+'/public','notices')
    const fullfilepath = join(folderPath+"/"+filename);  
    const isfilesafe = await isFileSafe(fullfilepath)
    
    if(isfilesafe)
    { 
      const path = "notices/"+filename
    const user = req.user
    createNoticeDto.creator = user.userId
    createNoticeDto.filename = path    
    createNoticeDto.level = 'ADMIN'
    return await this.noticeService.create(createNoticeDto);
  }else{
    await removeFile(fullfilepath)
    throw new HttpException("Invalid file type",HttpStatus.BAD_REQUEST) 
  }        
}
throw new HttpException("Filename not found",HttpStatus.BAD_REQUEST) 
  }

  @Get()
 @HasPermission('GET_NOTICES')
 async findAll() {
    return await this.noticeService.findAll();
  }

  @Get(':id')
  @HasPermission('GET_NOTICE')
  findOne(@Param('id') id: string) {
    return this.noticeService.findOne(+id);
  }

  @Patch(':uuid')
  @UseInterceptors(FileInterceptor('file',uploadNotice))
  @HasPermission('UPDATE_NOTICE')
  async update(@Param('uuid') uuid: string,@UploadedFile() file:Express.Multer.File, @Body() updateNoticeDto: UpdateNoticeDto,@Request() req) {
  
    const filename = file?.filename 
    if(filename){
      const folderPath = join(process.cwd()+'/public','notices')
      const fullfilepath = join(folderPath+"/"+filename);  
      const isfilesafe = await isFileSafe(fullfilepath)
      
      if(isfilesafe)
      { 
        const path = "notices/"+filename
      const user = req.user
      
    updateNoticeDto.filename = path   
      return await this.noticeService.update(uuid, updateNoticeDto,user.userId);
    }else{
      await removeFile(fullfilepath)
      throw new HttpException("Invalid file type",HttpStatus.BAD_REQUEST) 
    }        
  }
  throw new HttpException("Filename not found",HttpStatus.BAD_REQUEST) 
    }

  

  @Delete(':uuid')
  @HasPermission('DELETE_NOTICE')
  remove(@Param('uuid') uuid: string,@Request() req) {
    const user = req.user
    return this.noticeService.remove(uuid,user.userId);
  }
}
