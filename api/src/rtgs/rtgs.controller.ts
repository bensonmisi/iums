import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Request, HttpException, HttpStatus } from '@nestjs/common';
import { RtgsService } from './rtgs.service';
import { CreateRtgDto } from './dto/create-rtg.dto';
import { UpdateRtgDto } from './dto/update-rtg.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { importPOP, isFileSafe, removeFile } from 'src/uploadhelpers/pops.storage';
import { reduce } from 'rxjs';
import { join } from 'path';

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
    const folderPath = join(process.cwd(),'transfers')
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

  @Get()
  findAll() {
    return this.rtgsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rtgsService.find(+id);
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
