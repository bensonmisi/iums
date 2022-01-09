import { Module } from '@nestjs/common';
import { BidbondrefundService } from './bidbondrefund.service';
import { BidbondrefundController } from './bidbondrefund.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bankdetail } from 'src/bankdetails/entities/bankdetail.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { MailModule } from 'src/mail/mail.module';
import { Bidbondrefund } from './entities/bidbondrefund.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Bidbondrefund]),MailModule,BullModule],
  providers: [BidbondrefundService],
  controllers: [BidbondrefundController]
})
export class BidbondrefundModule {}
