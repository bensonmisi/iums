import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { removeFile } from 'src/uploadhelpers/pops.storage';
import { isFileTransferedSafe, UploadProofOfPayment } from 'src/uploadhelpers/transfers.storage';
import { AuthorityinvoiceuploadService } from './authorityinvoiceupload.service';
import { CreateAuthorityinvoiceuploadDto } from './dto/create-authorityinvoiceupload.dto';
import { UpdateAuthorityinvoiceuploadDto } from './dto/update-authorityinvoiceupload.dto';

@Controller('entity-domain/authorityinvoiceupload')
@UseGuards(JwtAuthGuard,AccessLevelGuard)
@HasAccesslevel('ENTITY')
export class AuthorityinvoiceuploadController {
  constructor(private readonly authorityinvoiceuploadService: AuthorityinvoiceuploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file',UploadProofOfPayment))
  async create(@UploadedFile() file:Express.Multer.File,@Body() createAuthorityinvoiceuploadDto: CreateAuthorityinvoiceuploadDto,@Request() req) {

    const filename = file?.filename       
      
    if(filename){
     const folderPath = join(process.cwd()+'/public','transfers')
     const fullfilepath = join(folderPath+"/"+filename);  
     const isfilesafe = await isFileTransferedSafe(fullfilepath) 
     
     if(isfilesafe)
     { 
    const user = req.user
    createAuthorityinvoiceuploadDto.filename = 'transfers/'+filename
    return await this.authorityinvoiceuploadService.create(createAuthorityinvoiceuploadDto,user.userId);
     }else{
      await removeFile(fullfilepath)
      throw new HttpException("Invalid File type",HttpStatus.BAD_REQUEST)
    }

  }else{
    throw new HttpException("file required",HttpStatus.BAD_REQUEST)
  }
}

  @Get()
  findAll() {
    return this.authorityinvoiceuploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorityinvoiceuploadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorityinvoiceuploadDto: UpdateAuthorityinvoiceuploadDto) {
    return this.authorityinvoiceuploadService.update(+id, updateAuthorityinvoiceuploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorityinvoiceuploadService.remove(+id);
  }
}
