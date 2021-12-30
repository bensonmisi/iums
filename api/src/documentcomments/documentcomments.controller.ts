import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocumentcommentsService } from './documentcomments.service';
import { CreateDocumentcommentDto } from './dto/create-documentcomment.dto';
import { UpdateDocumentcommentDto } from './dto/update-documentcomment.dto';

@Controller('documentcomments')
export class DocumentcommentsController {
  constructor(private readonly documentcommentsService: DocumentcommentsService) {}

  @Post()
  create(@Body() createDocumentcommentDto: CreateDocumentcommentDto) {
    return this.documentcommentsService.create(createDocumentcommentDto);
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
