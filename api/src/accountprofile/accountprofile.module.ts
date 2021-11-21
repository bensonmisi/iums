import { Module } from '@nestjs/common';
import { AccountprofileService } from './accountprofile.service';
import { AccountprofileController } from './accountprofile.controller';

@Module({
  controllers: [AccountprofileController],
  providers: [AccountprofileService]
})
export class AccountprofileModule {}
