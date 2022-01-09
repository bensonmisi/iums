import { Module } from '@nestjs/common';
import { AccountdocumentsService } from './accountdocuments.service';
import { AccountdocumentsController } from './accountdocuments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accountdocument } from './entities/accountdocument.entity';
import { MailModule } from 'src/mail/mail.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports:[TypeOrmModule.forFeature([Accountdocument]),MailModule,BullModule],
  controllers: [AccountdocumentsController],
  providers: [AccountdocumentsService]
})
export class AccountdocumentsModule {}
