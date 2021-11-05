import { Module } from '@nestjs/common';
import { AdminpasswordrestService } from './adminpasswordrest.service';
import { AdminpasswordrestController } from './adminpasswordrest.controller';
import { administratorResetToken } from 'src/administrator/entities/administratorResetToken.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrator } from 'src/administrator/entities/administrator.entity';

@Module({
  imports:[TypeOrmModule.forFeature([administratorResetToken,Administrator])],
  controllers: [AdminpasswordrestController],
  providers: [AdminpasswordrestService]
})
export class AdminpasswordrestModule {}
