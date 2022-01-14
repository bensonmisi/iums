import { Body, Controller, Get, Post } from '@nestjs/common';
import { SupplierreportService } from './supplierreport.service';

@Controller('admin/supplierreport')
export class SupplierreportController {
    constructor(private readonly supplierreportService:SupplierreportService){}

    @Get()
    async getList(){
    return await this.supplierreportService.getReports()
    }

    @Post()
    async filter(@Body() filterdata:any){
        return await this.supplierreportService.filterReport(filterdata)
    }
}
