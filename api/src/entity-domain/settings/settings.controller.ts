import { Controller, Get } from '@nestjs/common';
import { SettingsService } from './settings.service';

@Controller('entity-domain/settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async getNoticetypes(){
    return await this.settingsService.getNoticetypes()
  }

  @Get('/currency')
  async getCurrency(){
    return await this.settingsService.getCurrency()
  }
  @Get('/uom')
  async getUom(){
    return await this.settingsService.getUOM()
  }
  @Get('/procurementcategory')
  async getProcurementcategory(){
    return await this.settingsService.getProcurementcategory()
  }

  @Get('/procurementclassification')
  async getProcurementclassification(){
    return await this.settingsService.getProcuremmentclassification()
  }

  @Get('/noticesettings')
  async getNoticeSetting(){
    return await this.settingsService.getNoticeSettings()
  }
}
