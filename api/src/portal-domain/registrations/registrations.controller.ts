import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { RegistrationsService } from './registrations.service';

@Controller('bidder/registrations')
@UseGuards(JwtAuthGuard)
export class RegistrationsController {
    constructor(private readonly registrationService:RegistrationsService){}
    @Get()
    async getAll(@Request() req){
       const user = req.user
       return await this.registrationService.getAll(user.userId)
    } 

    @Post()
    async change(@Body() formdata:any,@Request() req){
        const user = req.user
        return await this.registrationService.change(formdata,user.userId)
    }
}
