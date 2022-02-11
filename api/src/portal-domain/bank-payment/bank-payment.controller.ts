import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Request, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { importPOP, isFileSafe, removeFile } from 'src/uploadhelpers/pops.storage';
import { BankPaymentService } from './bank-payment.service';
import { CreateBankPaymentDto } from './dto/create-bank-payment.dto';

@Controller('bidder/bank-payment')
@UseGuards(JwtAuthGuard)
export class BankPaymentController {
  constructor(private readonly bankPaymentService: BankPaymentService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file',importPOP)) 
  async create(@UploadedFile() file:Express.Multer.File,@Body() createBankPaymentDto: CreateBankPaymentDto,@Request() req) {
    const filename = file?.filename       
      
        if(filename){
         const folderPath = join(process.cwd()+'/public','transfers')
         const fullfilepath = join(folderPath+"/"+filename);  
         const isfilesafe = await isFileSafe(fullfilepath)
         
         if(isfilesafe)
         { 
         const user = req.user
         const path = "transfers/"+filename
         createBankPaymentDto.filename = path
        return this.bankPaymentService.create(createBankPaymentDto,user.userId);
      }else{
        await removeFile(fullfilepath)
        throw new HttpException("Invalid file type 1",HttpStatus.BAD_REQUEST) 
      }        
  }
  throw new HttpException("Filename not found",HttpStatus.BAD_REQUEST) 

  }

  @Patch()
  async update(@Body() formdata:any,@Request() req){
    const user = req.user
    return await this.bankPaymentService.checkReferene(formdata,user.userId)
  }

  @Get()
  async findAll(@Request() req){
    const user = req.user
    return await this.bankPaymentService.findAll(user.userId)
  }

 
}
