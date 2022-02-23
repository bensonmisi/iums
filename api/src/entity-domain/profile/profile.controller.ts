import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { changepasswordDto } from 'src/profile/changepassword.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@Controller('entity-domain/profile')
@UseGuards(JwtAuthGuard,AccessLevelGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getProfile(@Request() req){
    const user = req.user
    return await this.profileService.profile(user.userId)
  }

  @Post()
  async updateProfile(@Body() updateProfileDto:UpdateProfileDto,@Request() req){
    const user = req.user
     return await this.profileService.updateProfile(updateProfileDto,user.userId)
  }

  @Post('/changepassword')
  async changePassword(@Body() changepasswordDto:ChangePasswordDto,@Request() req){
    const user = req.user
    return await this.profileService.changePassword(changepasswordDto,user.userId)
  }

}
