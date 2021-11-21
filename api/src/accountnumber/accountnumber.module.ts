import { Module } from '@nestjs/common';
import { AccountnumberService } from './accountnumber.service';
import { AccountnumberController } from './accountnumber.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accountnumber } from './entities/accountnumber.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Accountnumber])],
  controllers: [AccountnumberController],
  providers: [AccountnumberService] 
})
export class AccountnumberModule {}
