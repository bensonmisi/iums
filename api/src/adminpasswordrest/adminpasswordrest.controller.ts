import { Body, Controller, Post } from '@nestjs/common';
import { AdminpasswordrestService } from './adminpasswordrest.service';
import { adminpasswordResetDto } from './dto/adminpasswordreset.dto';

@Controller('api/admin/adminpasswordrest')
export class AdminpasswordrestController {
  constructor(private readonly adminpasswordrestService: AdminpasswordrestService) {}
  @Post()
  async resetPassword(@Body() resetPasswordDto:adminpasswordResetDto):Promise<any>{
    return await this.adminpasswordrestService.resetPassword(resetPasswordDto)
  }
}
