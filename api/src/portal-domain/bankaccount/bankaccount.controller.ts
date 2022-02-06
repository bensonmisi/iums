import { Body, Controller, Post, UseGuards,Request, Patch, Param, Get, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { importAuthorizationletter, isFileSafe, removeFile } from 'src/uploadhelpers/authorization.storage';
import { BankaccountService } from './bankaccount.service';
import { CreateBankAccountDto } from './dto/create-bankaccount.dto';
import { UpdateBankAccountDto } from './dto/update-bankaccount.dto';

@Controller('bidder/bankaccount')
@UseGuards(JwtAuthGuard)
export class BankaccountController {
  constructor(private readonly bankaccountService: BankaccountService) {}

  @Get()
  async getAccount(@Request() req){
  const user = req.user
  return await this.bankaccountService.getAccount(user.userId)
  }

  @Post()
  @UseInterceptors(FileInterceptor('file',importAuthorizationletter))
  async addItem(@UploadedFile() file:Express.Multer.File,@Body() createBankAccountDto:CreateBankAccountDto,@Request() req){
     const filename = file?.filename
    if(filename){
     const folderPath = join(__dirname+'/public','authorization')
     const fullfilepath = join(folderPath+"/"+filename);  
     const isfilesafe = await isFileSafe(fullfilepath)
     if(isfilesafe)
     { 
      const path = "authorization/"+filename
      const user = req.user
      createBankAccountDto.letter = path
      createBankAccountDto.userId =req.user.userId
    return await this.bankaccountService.addAccount(createBankAccountDto,req.user.userId)
    }else{
      await removeFile(fullfilepath)
      throw new HttpException("Invalid file type",HttpStatus.BAD_REQUEST) 
    }
   }else{
    throw new HttpException("a pdf file is required",HttpStatus.BAD_REQUEST) 
   }
  }

  @Patch(":id")
  async updateItem(@Param('id') id:string,@Body() updateBankAccountDto:UpdateBankAccountDto,@Request() req){
    return await this.bankaccountService.updateAccount(+id,updateBankAccountDto)
  }
}
