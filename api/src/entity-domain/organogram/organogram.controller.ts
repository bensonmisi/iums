import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';
import { OrganogramService } from './organogram.service';
import { CreateOrganogramDto } from './dto/create-organogram.dto';
import { UpdateOrganogramDto } from './dto/update-organogram.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { uploadOrganograms } from 'src/uploadhelpers/organogram.storage';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';

@Controller('entity-domain/organogram')
@UseGuards(JwtAuthGuard)
@HasAccesslevel('ENTITY')
export class OrganogramController {
  constructor(private readonly organogramService: OrganogramService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    {
      name:'fullorganogram'
    },
    {
      name:'pmuorganogram'
    }
  ],
  uploadOrganograms
  ))
  async create(@UploadedFiles() files:{ fullorganogram?: Express.Multer.File[], pmuorganogram?: Express.Multer.File[] },@Body() createOrganogramDto: CreateOrganogramDto,@Request() req) {
    const fullorganogram = files.fullorganogram[0]?.filename
    const pmuorganogram = files.pmuorganogram[0]?.filename
    const fullorganogrampath = 'organograms/'+fullorganogram
    const pmuorganogrampath = 'organograms/'+pmuorganogram
    createOrganogramDto.full = fullorganogrampath
    createOrganogramDto.pmu = pmuorganogrampath
    const user =req.user
    return await this.organogramService.create(createOrganogramDto,user.userId);
  }

  @Get()
  async findAll(@Request() req) {
    const user = req.user
    return await this.organogramService.findAll(user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organogramService.findOne(+id);
  }

  @Patch(':id')
 async update(@Param('id') id: string, @Body() updateOrganogramDto: UpdateOrganogramDto,@Request() req) {
   const user = req.user
    return await this.organogramService.update(+id, updateOrganogramDto,user.userId);
  }

  @Delete(':id')
 async  remove(@Param('id') id: string,@Request() req) {
   const user = req.user
    return this.organogramService.remove(+id,user.userId);
  }
}
