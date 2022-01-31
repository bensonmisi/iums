import { Body, Controller, Delete, Get, Param, Post, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AddItemDto } from './dto/add-item.dto';
import { SupplierinvoicingService } from './supplierinvoicing.service';


@Controller('bidder/supplierinvoicing')
@UseGuards(JwtAuthGuard)
export class SupplierinvoicingController {
    constructor(private readonly supplierinvoiceService:SupplierinvoicingService){}
    @Get()
    async findAll(@Request() req){
    const user = req.user
    return await this.supplierinvoiceService.findAll(user.userId)
    }

    @Post()
    async addItem(@Body() addItemDto:AddItemDto,@Request() req){
    const user = req.user
    return await this.supplierinvoiceService.addItem(addItemDto,user.userId)
    }
    @Get('/pending')
    async getPending(@Request() req){
        const user = req.user
        return await this.supplierinvoiceService.getPending(user.userId)
    }

    @Delete(':id')
    async deleteItem(@Param('id') id:string ,@Request() req){
        const user = req.user
        return await this.supplierinvoiceService.removeItem(+id,user.userId)
    }

    @Get('/settings')
    async getSettings(@Request() req){
        const user = req.user
        return await this.supplierinvoiceService.getSettings(user.userId)
    }

    @Get('/invoice/print')
    async printinvoice(@Res() res:Response):Promise<void>{
        const buffer = await this.supplierinvoiceService.printInvoice()        
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline; filename=example.pdf',
            'Content-Length': buffer.length,
          })
      
          res.end(buffer)
    }
}
