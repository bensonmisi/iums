import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { Tenderinvoice } from 'src/tenderinvoice/entities/tenderinvoice.entity';
import { FilterDto } from './dto/filter.dto';
import { TenderrevenuereportService } from './tenderrevenuereport.service';

@Controller('admin/tenderrevenuereport')
@UseGuards(JwtAuthGuard)
@HasAccesslevel('ADMIN')
export class TenderrevenuereportController {
    constructor(private readonly tenderrevenuereportService:TenderrevenuereportService){}
    @Get()
    async latest():Promise<Tenderinvoice[]>{
      return  await this.tenderrevenuereportService.latest()
    }

    @Post()
    async filter(@Body() filterDto:FilterDto):Promise<Tenderinvoice[]>{
        return await this.tenderrevenuereportService.filter(filterDto)
    }
}
