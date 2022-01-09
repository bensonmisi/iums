import { Module } from '@nestjs/common';
import { BidbondmanagementService } from './bidbondmanagement.service';
import { BidbondmanagementController } from './bidbondmanagement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenderapplication } from 'src/tenderapplication/entities/tenderapplication.entity';
import { Noticefee } from 'src/noticefee/entities/noticefee.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Tenderapplication,Noticefee])],
  providers: [BidbondmanagementService],
  controllers: [BidbondmanagementController]
})
export class BidbondmanagementModule {}
