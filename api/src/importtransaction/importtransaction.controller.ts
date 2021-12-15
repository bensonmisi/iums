import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors,Request, UploadedFile, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { ImporttransactionService } from './importtransaction.service';
import { CreateImporttransactionDto } from './dto/create-importtransaction.dto';
import { UpdateImporttransactionDto } from './dto/update-importtransaction.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { importBankTransactions, isFileSafe, removeFile } from 'src/uploadhelpers/bankapi.storage';
import { join } from 'path';

@Controller('admin/importtransaction')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class ImporttransactionController {
  constructor(private readonly importtransactionService: ImporttransactionService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file',importBankTransactions))
  async create(@UploadedFile() file:Express.Multer.File,@Request() req) {
    const filename = file?.filename
    if(filename)
     {
       const folderPath = join(process.cwd(),'transactions')
       const fullfilepath = join(folderPath+"/"+filename);  
       const isfilesafe = await isFileSafe(fullfilepath)
       if(isfilesafe)
       {
     const user = req.user
       const path = "../transactions/"+filename
     return this.importtransactionService.create(path,user.userId);
       }else{
         await removeFile(fullfilepath)
         throw new HttpException("Invalid file type",HttpStatus.BAD_REQUEST)
       }
     }else{
       throw new HttpException("a .csv file is required",HttpStatus.BAD_REQUEST)
     }
  } 

  @Get()
  findAll() {
    return this.importtransactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.importtransactionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImporttransactionDto: UpdateImporttransactionDto) {
    return this.importtransactionService.update(+id, updateImporttransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.importtransactionService.remove(+id);
  }
}
