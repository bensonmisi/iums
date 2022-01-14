import { Body, Controller, Get, Post } from '@nestjs/common';
import { SupplierrevenuereportService } from './supplierrevenuereport.service';

@Controller('admin/supplierrevenuereport')
export class SupplierrevenuereportController {
    constructor(private readonly supplierreportService:SupplierrevenuereportService){}

    @Get()
    async getLatest(){
        return await this.supplierreportService.getReports()
    }

    @Post()
    async getfilter(@Body() formdata:any){
        return await this.supplierreportService.filterReport(formdata) 
    }
}
