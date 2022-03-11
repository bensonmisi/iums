import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { NoticeawardsService } from './noticeawards.service';
import { CreateNoticeawardDto } from './dto/create-noticeaward.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';

@Controller('entity-domain/noticeawards')
@UseGuards(JwtAuthGuard,AccessLevelGuard)
@HasAccesslevel('ENTITY')
export class NoticeawardsController {
  constructor(private readonly noticeawardsService: NoticeawardsService) {}

  @Post()
  async create(@Body() createNoticeawardDto: CreateNoticeawardDto,@Request() req) {
    const user = req.user
    createNoticeawardDto.entityuserId = user.userId
    return this.noticeawardsService.create(createNoticeawardDto,user.userId);
  }

 @Get(":id")
 async getAwards(@Param("id") id:string,@Request() req){
 const user = req.user
 return await this.noticeawardsService.findAll(+id)
 }



}
