import { Module } from '@nestjs/common';
import { IndividualplanService } from './individualplan.service';
import { IndividualplanController } from './individualplan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Individualplan } from './entities/individualplan.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Individualplan])],
  controllers: [IndividualplanController],
  providers: [IndividualplanService]
})
export class IndividualplanModule {}
