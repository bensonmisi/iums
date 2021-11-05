import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { AdministratorModule } from 'src/administrator/administrator.module';
import { RoleModule } from 'src/role/role.module';
import { AdminmenusModule } from 'src/adminmenus/adminmenus.module';

@Module({
  imports:[AdministratorModule,RoleModule,AdminmenusModule],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
