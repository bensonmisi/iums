import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AccountdocumentsService } from './accountdocuments.service';
import { CreateAccountdocumentDto } from './dto/create-accountdocument.dto';
import { UpdateAccountdocumentDto } from './dto/update-accountdocument.dto';

@Controller('admin/accountdocuments')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class AccountdocumentsController {
  constructor(private readonly accountdocumentsService: AccountdocumentsService) {}

  @Post()
  create(@Body() createAccountdocumentDto: CreateAccountdocumentDto) {
    return this.accountdocumentsService.create(createAccountdocumentDto);
  }

  @Get()
  findAll() { 
    return this.accountdocumentsService.findAll(); 
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountdocumentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountdocumentDto: UpdateAccountdocumentDto) {
    return this.accountdocumentsService.update(+id, updateAccountdocumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountdocumentsService.remove(+id);
  }

  @Patch('approve/:id')
  @HasPermission('DOCUMENT_APPROVAL')
  async approve(@Param('id') id:string,@Request() req){
    const user = req.user
    return await this.accountdocumentsService.approve(+id,user.userId)

  }
}
