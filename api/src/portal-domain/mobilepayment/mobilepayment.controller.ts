import { Body, Controller, Post, UseGuards,Request, Get, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { InitiatePaymentDto } from './dto/initiate-payment.dto';
import { MobilepaymentService } from './mobilepayment.service';

@Controller('bidder/mobilepayment')
@UseGuards(JwtAuthGuard)
export class MobilepaymentController {
    constructor(private readonly mobilepaymentService:MobilepaymentService){}
    @Post()
    async initiatePayment(@Body() initiatePaymentDto:InitiatePaymentDto,@Request() req):Promise<any>{
    const user = req.user
     return await this.mobilepaymentService.initiatePayment(initiatePaymentDto,user.userId)
    }

    @Get(':id')
    async checkPayment(@Param('id') id:string){
        return await this.mobilepaymentService.checkPayment(+id)
    }

}
