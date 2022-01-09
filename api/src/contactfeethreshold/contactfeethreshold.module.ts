import { Module } from '@nestjs/common';
import { ContactfeethresholdService } from './contactfeethreshold.service';
import { ContactfeethresholdController } from './contactfeethreshold.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contactfeethreshold } from './entities/contactfeethreshold.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Contactfeethreshold])],
  controllers: [ContactfeethresholdController],
  providers: [ContactfeethresholdService]
})
export class ContactfeethresholdModule {}
