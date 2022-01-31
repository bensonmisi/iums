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
import { RegistrationfeeModule } from './registrationfee/registrationfee.module';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
import { ContactsModule } from './contacts/contacts.module';
import { DirectorateModule } from './directorate/directorate.module';
import { AccountprofileModule } from './accountprofile/accountprofile.module';
import { AccountdocumentsModule } from './accountdocuments/accountdocuments.module';
import { AccountsModule } from './accounts/accounts.module';
import { HelperModule } from './helper/helper.module';
import { BanktransactionModule } from './banktransaction/banktransaction.module';
import { BankModule } from './bank/bank.module';
import { BankApiModule } from './bank-api/bank-api.module';
import { SuspenseModule } from './suspense/suspense.module';
import { AccountnumberModule } from './accountnumber/accountnumber.module';
import { ManualtransactionModule } from './manualtransaction/manualtransaction.module';
import { SuspensetransfersModule } from './suspensetransfers/suspensetransfers.module';
import { SuspensereceiptModule } from './suspensereceipt/suspensereceipt.module';
import { OnlinepaymentModule } from './onlinepayment/onlinepayment.module';
import { TenderinvoiceModule } from './tenderinvoice/tenderinvoice.module';
import { TenderapplicationModule } from './tenderapplication/tenderapplication.module';
import { ProcuremententityModule } from './procuremententity/procuremententity.module';
import { TenderfeetypeModule } from './tenderfeetype/tenderfeetype.module';
import { ReceiptModule } from './receipt/receipt.module';
import { BidbondthresholdModule } from './bidbondthreshold/bidbondthreshold.module';
import { DbrefactorModule } from './dbrefactor/dbrefactor.module';
import { TendereditrequestModule } from './tendereditrequest/tendereditrequest.module';
import { ReceiptingModule } from './receipting/receipting.module';
import { RtgsModule } from './rtgs/rtgs.module';
import { ImporttransactionModule } from './importtransaction/importtransaction.module';
import { SupplierModule } from './supplier/supplier.module';
import { SupplierinvoiceModule } from './supplierinvoice/supplierinvoice.module';
import { SupplierreceiptingModule } from './supplierreceipting/supplierreceipting.module';
import { BidbondperiodModule } from './bidbondperiod/bidbondperiod.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bull';
import { MailinglistModule } from './mailinglist/mailinglist.module';
import { DocumentcommentsModule } from './documentcomments/documentcomments.module';
import { BidbondmanagementModule } from './bidbondmanagement/bidbondmanagement.module';
import { NoticeModule } from './notice/notice.module';
import { NoticefeeModule } from './noticefee/noticefee.module';
import { NoticetypeModule } from './noticetype/noticetype.module';
import { BankdetailsModule } from './bankdetails/bankdetails.module';
import { BidbondrefundModule } from './bidbondrefund/bidbondrefund.module';
import { NoticeproductModule } from './noticeproduct/noticeproduct.module';
import { ContactfeethresholdModule } from './contactfeethreshold/contactfeethreshold.module';
import { TaskmanagerModule } from './taskmanager/taskmanager.module';
import { SupplierreportModule } from './supplierreport/supplierreport.module';
import { SupplierrevenuereportModule } from './supplierrevenuereport/supplierrevenuereport.module';
import { TenderrevenuereportModule } from './tenderrevenuereport/tenderrevenuereport.module';
import { AuthModule } from './portal-domain/auth/auth.module';
import { ProfileModule as BidderProfileModule } from './portal-domain/profile/profile.module';
import { DashboardModule } from './portal-domain/dashboard/dashboard.module';
import { RegistrationsModule } from './portal-domain/registrations/registrations.module';
import { DocumentsModule as BidderDocuments} from './portal-domain/documents/documents.module';
import { SupplierinvoicingModule } from './portal-domain/supplierinvoicing/supplierinvoicing.module';
import { RegistrationoptionModule } from './registrationoption/registrationoption.module';
import { MobilepaymentModule } from './portal-domain/mobilepayment/mobilepayment.module';
import { ReceiptingModule } from './portal-domain/receipting/receipting.module';
import * as connectionOptions from '../ormconfig'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),    
   
    TypeOrmModule.forRoot(connectionOptions),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 5003,
      },
    }),
    BullModule.registerQueue({
      name:'emailnotification'   
       
    }),
    
    EventEmitterModule.forRoot(),
 
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
    RegistrationfeeModule,
    CompanyModule,
    UserModule,
    ContactsModule,
    DirectorateModule,
    AccountprofileModule,
    AccountdocumentsModule,
    AccountsModule,
    HelperModule,
    BanktransactionModule,
    BankModule,
    BankApiModule,
    SuspenseModule,
    AccountnumberModule,
    ManualtransactionModule,
    SuspensetransfersModule,
    SuspensereceiptModule,
    OnlinepaymentModule,
    TenderinvoiceModule,
    TenderapplicationModule,
    ProcuremententityModule,
    TenderfeetypeModule,
    ReceiptModule,
    BidbondthresholdModule,
    DbrefactorModule,
    TendereditrequestModule,
    ReceiptingModule,
    RtgsModule,
    ImporttransactionModule,
    SupplierModule,
    SupplierinvoiceModule,
    SupplierreceiptingModule,
    BidbondperiodModule,
    MailinglistModule,
    DocumentcommentsModule,
    BidbondmanagementModule,
    NoticeModule,
    NoticefeeModule,
    NoticetypeModule,
    BankdetailsModule,
    BidbondrefundModule,
    NoticeproductModule,
    ContactfeethresholdModule,
    TaskmanagerModule,
    SupplierreportModule,
    SupplierrevenuereportModule,
    TenderrevenuereportModule,
    AuthModule,
    BidderProfileModule,
    DashboardModule,
    RegistrationsModule,
    BidderDocuments,
    SupplierinvoicingModule,
    RegistrationoptionModule,
    MobilepaymentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
