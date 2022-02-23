import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AuthorityapplicationcommentsService } from './authorityapplicationcomments.service';
import { CreateAuthorityapplicationcommentDto } from './dto/create-authorityapplicationcomment.dto';
import { UpdateAuthorityapplicationcommentDto } from './dto/update-authorityapplicationcomment.dto';

@Controller('admin/authorityapplicationcomments')
@UseGuards(JwtAuthGuard)
@HasAccesslevel('ADMIN')
export class AuthorityapplicationcommentsController {
  constructor(private readonly authorityapplicationcommentsService: AuthorityapplicationcommentsService) {}

  @Post()
  async create(@Body() createAuthorityapplicationcommentDto: CreateAuthorityapplicationcommentDto,@Request() req) {
    const user = req.user
    return await this.authorityapplicationcommentsService.create(createAuthorityapplicationcommentDto,user.userId);
  }

  @Get()
  findAll() {
    return this.authorityapplicationcommentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorityapplicationcommentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorityapplicationcommentDto: UpdateAuthorityapplicationcommentDto) {
    return this.authorityapplicationcommentsService.update(+id, updateAuthorityapplicationcommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorityapplicationcommentsService.remove(+id);
  }
}
