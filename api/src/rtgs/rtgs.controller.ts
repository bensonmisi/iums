import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Request, HttpException, HttpStatus, StreamableFile } from '@nestjs/common';
import { RtgsService } from './rtgs.service';
import { UpdateRtgDto } from './dto/update-rtg.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { importPOP, isFileSafe, removeFile } from 'src/uploadhelpers/pops.storage';
import { join } from 'path';
import { createReadStream } from 'fs';
import process from 'process';

@Controller('admin/rtgs')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class RtgsController {
  constructor(private readonly rtgsService: RtgsService) {} 

  @Post()
  @UseInterceptors(FileInterceptor('file',importPOP))
  async create(@UploadedFile() file:Express.Multer.File,@Body() uploaddata: any,@Request() req) {
   
    const filename = file?.filename
   if(filename){
    const folderPath = join(__dirname+'/public','transfers')
    const fullfilepath = join(folderPath+"/"+filename);  
    const isfilesafe = await isFileSafe(fullfilepath)
    if(isfilesafe)
    {
      const user = req.user
      const path = "transfers/"+filename
      const formdata={accountId:uploaddata.accountId,name:uploaddata.name,userId:user.userId,filename:path}
      return this.rtgsService.create(formdata);
    }else{
      await removeFile(fullfilepath)
      throw new HttpException("Invalid file type",HttpStatus.BAD_REQUEST) 
    }
   }else{
    throw new HttpException("a pdf file is required",HttpStatus.BAD_REQUEST) 
   }
   
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rtgsService.find(+id);
  }
  @Get('streaming/:id')
   async streamfile(@Param('id') id:string):Promise<StreamableFile>{
    const record =await this.rtgsService.findOne(+id)
    const folderPath = __dirname+'/public'
    const fullfilepath = join(folderPath+"/"+record.filename)
    console.log(fullfilepath)
    const file = createReadStream(fullfilepath)
    return new StreamableFile(file)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRtgDto: UpdateRtgDto) {
    return this.rtgsService.update(+id, updateRtgDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rtgsService.remove(+id);
  }
}

