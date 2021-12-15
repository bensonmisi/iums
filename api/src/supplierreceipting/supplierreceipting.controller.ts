import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { SupplierreceiptingService } from './supplierreceipting.service';

@Controller('admin/supplierreceipting')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class SupplierreceiptingController {
    constructor(private readonly supplierreceiptingService:SupplierreceiptingService){}

    @Get(':invoicenumber')
    async getInvoiceData(@Param("invoicenumber") invoicenumber:string){
        return await this.supplierreceiptingService.getInvoiceData(invoicenumber)
    }

    @Post()
    async settleInvoice(@Body() fdata:any,@Request() req){
      const user = req.user
      return await this.supplierreceiptingService.settleInvoice(fdata,user.userId)
    }


}
