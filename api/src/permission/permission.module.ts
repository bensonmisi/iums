import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { RoleModule } from 'src/role/role.module';
import { AdminmenusModule } from 'src/adminmenus/adminmenus.module';

@Module({
  imports:[TypeOrmModule.forFeature([Permission]),RoleModule,AdminmenusModule],
  controllers: [PermissionController],
  providers: [PermissionService]
})
export class PermissionModule {}
