import { Controller, Get, Request, UseGuards } from '@nestjs/common';
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
}
