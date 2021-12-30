import { Module } from '@nestjs/common';
import { MailinglistService } from './mailinglist.service';
import { MailinglistController } from './mailinglist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mailinglist } from './entities/mailinglist.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Mailinglist])],
  controllers: [MailinglistController],
  providers: [MailinglistService]
})
export class MailinglistModule {}
