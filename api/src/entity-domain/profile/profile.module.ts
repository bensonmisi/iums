import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityUser } from '../entity-user/entities/entity-user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([EntityUser])],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
