import { Module } from '@nestjs/common';
import { SystemModulesService } from './system-modules.service';
import { SystemModulesController } from './system-modules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemModule } from './entities/system-module.entity';
import { RoleService } from 'src/role/role.service';
import { RoleModule } from 'src/role/role.module';
import { AdminmenusModule } from 'src/adminmenus/adminmenus.module';

@Module({
  imports:[TypeOrmModule.forFeature([SystemModule]),RoleModule,AdminmenusModule],
  controllers: [SystemModulesController],
  providers: [SystemModulesService]
})
export class SystemModulesModule {}
