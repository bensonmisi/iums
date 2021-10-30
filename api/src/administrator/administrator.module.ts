import { Module } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { AdministratorController } from './administrator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrator } from './entities/administrator.entity';
import { administratorResetToken } from './entities/administratorResetToken.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Administrator,administratorResetToken])],
  controllers: [AdministratorController],
  providers: [AdministratorService]
})
export class AdministratorModule {}
