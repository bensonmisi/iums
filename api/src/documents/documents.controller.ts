import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Controller('api/admin/documents')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @HasPermission('CREATE_DOCUMENT')
  async create(@Body() createDocumentDto: CreateDocumentDto) {
    return await this.documentsService.create(createDocumentDto);
  }

  @Get(':id')
  @HasPermission('GET_DOCUMENTS') 
 async findAll(@Param() id:number) {
    return await this.documentsService.findAll(id);
  }

  @Get(':id')
  @HasPermission('GET_DOCUMENT')
  async findOne(@Param('id') id: string) {
    return await this.documentsService.findOne(+id);
  }

  @Patch(':id')
  @HasPermission('UPDATE_DOCUMENT')
  async update(@Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDto) {
    return await this.documentsService.update(+id, updateDocumentDto);
  }

  @Delete(':id')
  @HasPermission('DELETE_DOCUMENT')
  async remove(@Param('id') id: string) {
    return await this.documentsService.remove(+id);
  }
}
