import { Body, Controller, Post,Request, UseGuards } from '@nestjs/common';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { changepasswordDto } from './changepassword.dto';
import { personalDto } from './personal.dto';
import { ProfileService } from './profile.service';

@Controller('admin/profile')
@UseGuards(JwtAuthGuard,AccessLevelGuard)
@HasAccesslevel('ADMIN')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @Post('personal')
  async updatePersonal(@Body() personalDto:personalDto ,@Request() req){
    const user = req.user
    return await this.profileService.updatePersonalData(personalDto,user.userId)
  }

  @Post('changepassword')
  async changePassword(@Body() changepasswordDto:changepasswordDto,@Request() req){
    const user = req.user
    return await this.profileService.changePassword(changepasswordDto,user.userId)
  }
}
