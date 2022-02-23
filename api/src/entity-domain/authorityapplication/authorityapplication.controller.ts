import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AuthorityapplicationService } from './authorityapplication.service';;

@Controller('entity-domain/authorityapplication')
@UseGuards(JwtAuthGuard)
@HasAccesslevel('ENTITY')
export class AuthorityapplicationController {
  constructor(private readonly authorityapplicationService: AuthorityapplicationService) {}

  @Get('/confirm')
   async confirmapplication(@Request() req){
     const user = req.user
     await this.authorityapplicationService.confirm(user.userId)
   }

}
