import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { FilterMonitoringDto } from './dto/filter-monitoring-dto';
import { ReportMonitoringDto } from './dto/report-monitoring-dto';
import { MonitoringreportService } from './monitoringreport.service';

@Controller('admin/monitoringreport')
@UseGuards(JwtAuthGuard,AccessLevelGuard)
@HasAccesslevel('ADMIN')
export class MonitoringreportController {
  constructor(private readonly monitoringreportService: MonitoringreportService) {}
  @Get()
  @HasPermission('GET_MONITORING_REPORT')
  async getData(){
    return await this.monitoringreportService.getData()
  }



  @Post()
  async getReport(@Body() filterMonitoringDto:ReportMonitoringDto){
   return await this.monitoringreportService.getReport(filterMonitoringDto)
  }

  
  @Post('filter')
  async filterData(@Body() filterDto:FilterMonitoringDto){
   return await this.monitoringreportService.filterData(filterDto)
  }

}
