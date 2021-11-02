import { Module } from '@nestjs/common';
import { AdminmenusService } from './adminmenus.service';
import { AdminmenusController } from './adminmenus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/role/entities/role.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Role])],
  controllers: [AdminmenusController],
  providers: [AdminmenusService],
  exports:[AdminmenusService]
})
export class AdminmenusModule {
  
}
