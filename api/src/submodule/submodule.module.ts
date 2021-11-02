import { Module } from '@nestjs/common';
import { SubmoduleService } from './submodule.service';
import { SubmoduleController } from './submodule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submodule } from './entities/submodule.entity';
import { RoleModule } from 'src/role/role.module';
import { AdminmenusModule } from 'src/adminmenus/adminmenus.module';

@Module({
  imports:[TypeOrmModule.forFeature([Submodule]),RoleModule,AdminmenusModule],
  controllers: [SubmoduleController],
  providers: [SubmoduleService]
})
export class SubmoduleModule {}
