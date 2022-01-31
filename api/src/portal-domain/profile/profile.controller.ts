import { Body, Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { BidderChangePasswordDto } from './dto/change-password.dto';
import { UpdateBidderAccountDto } from './dto/update-bidderaccount.dto';
import { BidderUpdatePersonalDto } from './dto/update-personal.dto';
import { ProfileService } from './profile.service';


@Controller('bidder/profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
    constructor(private readonly profileService:ProfileService){}
    @Get()
    async getProfile(@Request() req){
        const user = req.user
        return await this.profileService.getProfile(user.userId)
    }

    @Post('/update')

    async updateProfile(@Body() updatePersonalDto:BidderUpdatePersonalDto,@Request() req){
     const user = req.user
     return await this.profileService.update(updatePersonalDto,user.userId)
    }

    @Patch('/changepassword')
    async changePassword(@Body() changepasswordDto:BidderChangePasswordDto,@Request() req){
     const user = req.user
     return await this.profileService.changepassword(changepasswordDto,user.userId)
    }

    @Patch('/account/update')
    async updateaccount(@Body() updateBidderAccountDto:UpdateBidderAccountDto,@Request() req){
        const user = req.user
        return await this.profileService.updateAccount(updateBidderAccountDto,user.userId)
    }
}
