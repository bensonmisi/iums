import { Module } from '@nestjs/common';
import { MailistService } from './mailist.service';
import { MailistController } from './mailist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mailinglist } from 'src/mailinglist/entities/mailinglist.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Mailinglist])],
  controllers: [MailistController],
  providers: [MailistService]
})
export class MailistModule {}
