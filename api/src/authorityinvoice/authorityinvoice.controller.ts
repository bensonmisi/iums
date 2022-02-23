import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, StreamableFile, Res, Request } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AuthorityinvoiceService } from './authorityinvoice.service';
import { ClaimAuthorityInvoiceDto } from './dto/claim-authorityinvoice.dto';

@Controller('admin/authorityinvoice')

export class AuthorityinvoiceController {
  constructor(private readonly authorityinvoiceService: AuthorityinvoiceService) {}

  @Get(':status')
  @UseGuards(JwtAuthGuard,AccessLevelGuard)
  @HasAccesslevel('ADMIN')
  async findAll(@Param('status') status:string) {
    return await this.authorityinvoiceService.findAll(status);
  }

  @Get('/invoice/:id')
  @UseGuards(JwtAuthGuard,AccessLevelGuard)
 @HasAccesslevel('ADMIN')
  async findOne(@Param('id') id:string){
    return await this.authorityinvoiceService.findOne(id)
  }

  @Get('/download/:id')
  async download (@Param('id') id:string,@Res() res){
    const record = await this.authorityinvoiceService.getpop(id)
    return res.sendFile(record.filename,{root:'public'})
  }

  @Post('/claim')
  @UseGuards(JwtAuthGuard,AccessLevelGuard)
  @HasAccesslevel('ADMIN')
  async claim(@Body() claimAuthorityInvoiceDto:ClaimAuthorityInvoiceDto,@Request() req){
    const user = req.user
    return await this.authorityinvoiceService.claim(claimAuthorityInvoiceDto,user.userId)
  }

  @Get('/settle/:id')
  @UseGuards(JwtAuthGuard,AccessLevelGuard)
  @HasAccesslevel('ADMIN')
   async settle(@Param("id") id:string,@Request() req){
     const user = req.user
     return await this.authorityinvoiceService.process(+id,user.userId)
   }


}
