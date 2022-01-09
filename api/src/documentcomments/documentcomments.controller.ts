import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { DocumentcommentsService } from './documentcomments.service';
import { CreateDocumentcommentDto } from './dto/create-documentcomment.dto';
import { UpdateDocumentcommentDto } from './dto/update-documentcomment.dto';

@Controller('admin/documentcomments')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class DocumentcommentsController {
  constructor(private readonly documentcommentsService: DocumentcommentsService) {}

  @Post()
  @HasPermission('CREATE_COMMENT')
  async create(@Body() createDocumentcommentDto: CreateDocumentcommentDto,@Request() req) {
    const user = req.user
    return await this.documentcommentsService.create(createDocumentcommentDto,user.userId);
  }

  @Get()
  findAll() {
    return this.documentcommentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentcommentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocumentcommentDto: UpdateDocumentcommentDto) {
    return this.documentcommentsService.update(+id, updateDocumentcommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentcommentsService.remove(+id);
  }
}
