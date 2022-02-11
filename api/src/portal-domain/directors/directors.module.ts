import { Module } from '@nestjs/common';
import { DirectorsService } from './directors.service';
import { DirectorsController } from './directors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Directorate } from 'src/directorate/entities/directorate.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Directorate])],
  controllers: [DirectorsController],
  providers: [DirectorsService]
})
export class DirectorsModule {}
