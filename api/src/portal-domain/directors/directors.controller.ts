import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { identificationStorage, isFileSafe } from 'src/uploadhelpers/identification.storage';
import { removeFile } from 'src/uploadhelpers/pops.storage';
import { DirectorsService } from './directors.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';

@Controller('bidder/directors')
@UseGuards(JwtAuthGuard)
export class DirectorsController {
  constructor(private readonly directorsService: DirectorsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file',identificationStorage))
  async create(@UploadedFile() file:Express.Multer.File,@Body() createDirectorDto: CreateDirectorDto,@Request() req) {
    const filename = file?.filename   
    if(filename){
      const folderPath = join(process.cwd()+'/public','identification')
      const fullfilepath = join(folderPath+"/"+filename);  
      const isfilesafe = await isFileSafe(fullfilepath)
      
      if(isfilesafe)
      { 
      const user = req.user
      const path = "identification/"+filename
      createDirectorDto.filename = path
    return await this.directorsService.create(createDirectorDto,user.userId);
      }else{
        await removeFile(fullfilepath)
        throw new HttpException("Please convert your document to pdf",HttpStatus.BAD_REQUEST) 
      } 
  }else{    
    throw new HttpException("Please convert your document to pdf",HttpStatus.BAD_REQUEST) 
  }
}

 
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file',identificationStorage))
  async update(@UploadedFile() file:Express.Multer.File,@Param('id') id: string, @Body() updateDirectorDto: UpdateDirectorDto,@Request() req) {
   
    const filename = file?.filename   
    if(filename){
      const folderPath = join(process.cwd()+'/public','identification')
      const fullfilepath = join(folderPath+"/"+filename);  
      const isfilesafe = await isFileSafe(fullfilepath)
      
      if(isfilesafe)
      { 
      const user = req.user
      const path = "identification/"+filename
      updateDirectorDto.filename = path    
      return await this.directorsService.update(+id,updateDirectorDto,user.userId);
      }else{
        await removeFile(fullfilepath)
        throw new HttpException("Please convert your document to pdf",HttpStatus.BAD_REQUEST) 
      } 
  }else{    
    throw new HttpException("Please convert your document to pdf",HttpStatus.BAD_REQUEST) 
  }
    
  }

  @Delete(':id')
  async remove(@Param('id') id: string,@Request() req) {
    const user = req.user
    return await this.directorsService.remove(+id,user.userId);
  }
}
