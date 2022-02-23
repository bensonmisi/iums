import { Module } from '@nestjs/common';
import { UploadplanService } from './uploadplan.service';
import { UploadplanController } from './uploadplan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Uploadplan } from './entities/uploadplan.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Uploadplan])],
  controllers: [UploadplanController],
  providers: [UploadplanService]
})
export class UploadplanModule {} 
