import { Module } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { AdministratorController } from './administrator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrator } from './entities/administrator.entity';
import { administratorResetToken } from './entities/administratorResetToken.entity';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';
import { RoleModule } from 'src/role/role.module';
import { AdminmenusModule } from 'src/adminmenus/adminmenus.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports:[TypeOrmModule.forFeature([Administrator,administratorResetToken]),MailModule,RoleModule,AdminmenusModule,BullModule],
  controllers: [AdministratorController],
  providers: [AdministratorService],
  exports:[AdministratorService]
})
export class AdministratorModule {}
