import { Module } from '@nestjs/common';
import { ProcurementapplicationService } from './procurementapplication.service';
import { ProcurementapplicationController } from './procurementapplication.controller';
import { MailModule } from 'src/mail/mail.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports:[MailModule,BullModule],
  controllers: [ProcurementapplicationController],
  providers: [ProcurementapplicationService]
})
export class ProcurementapplicationModule {}
