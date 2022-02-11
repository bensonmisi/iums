import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { ReceiptingService } from './receipting.service';

@Controller('bidder/receipting')
@UseGuards(JwtAuthGuard)
export class ReceiptingController {
    constructor(private readonly receiptingService:ReceiptingService){}

    @Get()
    async getData(@Request() req):Promise<any>
    {
       const user = req.user
       return await this.receiptingService.getData(user.userId)
    }

    @Get('/:invoicenumber')
    async findAll(@Param('invoicenumber') invoicenumber:string, @Request() req):Promise<any>{
        const user = req.user
        return await this.receiptingService.findByInvoice(user.userId,invoicenumber)
    }

    @Post('/settle')
    async settleInvoice(@Body() formdata:any,@Request() req):Promise<any>{
        const user = req.user
        return await this.receiptingService.settle(formdata,user.userId)
    }

    
}
