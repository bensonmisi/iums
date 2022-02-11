import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenderapplication } from 'src/tenderapplication/entities/tenderapplication.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Tenderapplication])],
  controllers: [ApplicationController],
  providers: [ApplicationService]
})
export class ApplicationModule {}
