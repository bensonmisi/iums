import { Module } from '@nestjs/common';
import { ProcuremententityUserService } from './procuremententity-user.service';
import { ProcuremententityUserController } from './procuremententity-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityUser } from 'src/entity-domain/entity-user/entities/entity-user.entity';
import { MailModule } from 'src/mail/mail.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports:[TypeOrmModule.forFeature([EntityUser]),MailModule,BullModule],
  controllers: [ProcuremententityUserController],
  providers: [ProcuremententityUserService]
})
export class ProcuremententityUserModule {}
