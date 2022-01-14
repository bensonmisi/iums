import { Module } from '@nestjs/common';
import { TaskmanagerService } from './taskmanager.service';
import { TaskmanagerController } from './taskmanager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taskmanager } from './entities/taskmanager.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Taskmanager])],
  controllers: [TaskmanagerController],
  providers: [TaskmanagerService]
})
export class TaskmanagerModule {}
