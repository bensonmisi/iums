import { Module } from '@nestjs/common';
import { ProcuremententityService } from './procuremententity.service';
import { ProcuremententityController } from './procuremententity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Procuremententity } from './entities/procuremententity.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Procuremententity])],
  controllers: [ProcuremententityController],
  providers: [ProcuremententityService]
})
export class ProcuremententityModule {}
