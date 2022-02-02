import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request } from '@nestjs/common';
import { PaynowPaymentService } from './paynow-payment.service';
import { CreatePaynowPaymentDto } from './dto/create-paynow-payment.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';

@Controller('bidder/paynow-payment')
@UseGuards(JwtAuthGuard)
export class PaynowPaymentController {
  constructor(private readonly paynowPaymentService: PaynowPaymentService) {}

  @Post()
  async initiatePayment(@Body() initiateDto:CreatePaynowPaymentDto,@Request() req){
    const user = req.user
    return this.paynowPaymentService.initiate(initiateDto,user.userId)
  }

  @Get(':uuid')
    async checkPayment(@Param('uuid') uuid:string){
        return await this.paynowPaymentService.checkPayment(uuid)
    }

}
