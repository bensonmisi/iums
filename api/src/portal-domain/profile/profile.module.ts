import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Account } from 'src/accounts/entities/account.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Account])],
  providers: [ProfileService],
  controllers: [ProfileController]
})
export class ProfileModule {}
