import { Module } from '@nestjs/common';
import { AuthorityapplicationService } from './authorityapplication.service';
import { AuthorityapplicationController } from './authorityapplication.controller';

@Module({
  controllers: [AuthorityapplicationController],
  providers: [AuthorityapplicationService]
})
export class AuthorityapplicationModule {}
