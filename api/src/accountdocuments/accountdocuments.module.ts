import { Module } from '@nestjs/common';
import { AccountdocumentsService } from './accountdocuments.service';
import { AccountdocumentsController } from './accountdocuments.controller';

@Module({
  controllers: [AccountdocumentsController],
  providers: [AccountdocumentsService]
})
export class AccountdocumentsModule {}
