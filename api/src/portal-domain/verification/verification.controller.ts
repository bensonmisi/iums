import { Body, Controller, Get, Post } from '@nestjs/common';
import { VerifyDto } from './dto/verify.dto';
import { VerificationService } from './verification.service';

@Controller('verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post()
  async verify(@Body() verifyDto:VerifyDto){
    return await this.verificationService.verify(verifyDto)
  }
}
