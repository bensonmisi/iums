import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleModule } from './role/role.module';
import { AdministratorModule } from './administrator/administrator.module';
import { SubmoduleModule } from './submodule/submodule.module';
import { PermissionModule } from './permission/permission.module';
import { SystemModulesModule } from './system-modules/system-modules.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { AdminmenusModule } from './adminmenus/adminmenus.module';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { ProfileModule } from './profile/profile.module';
import { AdminpasswordrestModule } from './adminpasswordrest/adminpasswordrest.module';
import { SuppliertypeModule } from './suppliertype/suppliertype.module';
import { AuditModule } from './audit/audit.module';
import { CategoriesModule } from './categories/categories.module';
import { SectionsModule } from './sections/sections.module';
import { DocumentsModule } from './documents/documents.module';
import { RegistrationperiodModule } from './registrationperiod/registrationperiod.module';
import { CurrencyModule } from './currency/currency.module';
import { ExchangerateModule } from './exchangerate/exchangerate.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({ 
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize:true,
    }),
    RoleModule,
    AdministratorModule,
    SubmoduleModule,
    PermissionModule,
    SystemModulesModule,
    MailModule,
    AdminmenusModule,
    AdminAuthModule,
    ProfileModule,
    AdminpasswordrestModule,
    SuppliertypeModule,
    AuditModule,
    CategoriesModule,
    SectionsModule,
    DocumentsModule,
    RegistrationperiodModule,
    CurrencyModule,
    ExchangerateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
