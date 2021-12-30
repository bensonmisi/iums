import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MailModule } from 'src/mail/mail.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports:[TypeOrmModule.forFeature([User]),MailModule,BullModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
