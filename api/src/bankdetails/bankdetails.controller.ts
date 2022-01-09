import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, HttpException, HttpStatus, Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { importAuthorizationletter, isFileSafe, removeFile } from 'src/uploadhelpers/authorization.storage';
import { BankdetailsService } from './bankdetails.service';
import { CreateBankdetailDto } from './dto/create-bankdetail.dto';
import { UpdateBankdetailDto } from './dto/update-bankdetail.dto';

@Controller('admin/bankdetails')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class BankdetailsController {
  constructor(private readonly bankdetailsService: BankdetailsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file',importAuthorizationletter))
  @HasPermission('ADD_ACCOUNT')
 async create(@UploadedFile() file:Express.Multer.File,@Body() createBankdetailDto: CreateBankdetailDto,@Request() req) {
  const filename = file?.filename
  if(filename){
   const folderPath = join(__dirname+'/public','authorization')
   const fullfilepath = join(folderPath+"/"+filename);  
   const isfilesafe = await isFileSafe(fullfilepath)
   if(isfilesafe)
   {
    const path = "authorization/"+filename
    const user = req.user
    createBankdetailDto.letter = path
    createBankdetailDto.requestedBy = user.userId
    return await this.bankdetailsService.create(createBankdetailDto);
  }else{
    await removeFile(fullfilepath)
    throw new HttpException("Invalid file type",HttpStatus.BAD_REQUEST) 
  }
 }else{
  throw new HttpException("a pdf file is required",HttpStatus.BAD_REQUEST) 
 }
  }

  @Get()
 async findAll() {
    return await this.bankdetailsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.bankdetailsService.findByAccount(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file',importAuthorizationletter))
  @HasPermission('UPDATE_ACCOUNT')
 async update(@Param('id') id: string,@UploadedFile() file:Express.Multer.File, @Body() updateBankdetailDto: UpdateBankdetailDto,@Request() req) {
    const filename = file?.filename
  if(filename){
   const folderPath = join(__dirname+'/public','authorization')
   const fullfilepath = join(folderPath+"/"+filename);  
   const isfilesafe = await isFileSafe(fullfilepath)
   if(isfilesafe)
   {
    const path = "authorization/"+filename
    const user = req.user
    updateBankdetailDto.letter = path
    updateBankdetailDto.requestedBy = user.userId
    return await this.bankdetailsService.update(+id,updateBankdetailDto);
  }else{
    await removeFile(fullfilepath)
    throw new HttpException("Invalid file type",HttpStatus.BAD_REQUEST) 
  }
}else{
throw new HttpException("a pdf file is required",HttpStatus.BAD_REQUEST) 
}
  
}
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankdetailsService.remove(+id);
  }
  @HasPermission('APPROVE_BANKDETAILS')
  @Get('approve/:id')
  async approve(@Param("id") id:string,@Request() req){
    const user = req.user
    return await this.bankdetailsService.approve(+id,user.userId) 
  }
}
