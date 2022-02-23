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
import { ReceiptingModule as BidderReceiptingModule } from './portal-domain/receipting/receipting.module';
import { PaynowPaymentModule } from './portal-domain/paynow-payment/paynow-payment.module';
import { BankPaymentModule } from './portal-domain/bank-payment/bank-payment.module';
import { BidbondapplicationModule } from './portal-domain/bidbondapplication/bidbondapplication.module';
import { TendersModule } from './portal-domain/tenders/tenders.module';
import { NoticecategoryModule } from './noticecategory/noticecategory.module';
import { NoticeapplicationModule } from './portal-domain/noticeapplication/noticeapplication.module';
import * as connectionOptions from '../ormconfig'
import { NoticeinvoicingModule } from './portal-domain/noticeinvoicing/noticeinvoicing.module';
import { BankaccountModule } from './portal-domain/bankaccount/bankaccount.module';
import { TenderreceiptingModule } from './portal-domain/tenderreceipting/tenderreceipting.module';
import { ApplicationModule } from './portal-domain/application/application.module';
import { UsersModule as BidderUsers } from './portal-domain/users/users.module';
import { ContactsModule as BidderContactsModule } from './portal-domain/contacts/contacts.module';
import { DirectorsModule } from './portal-domain/directors/directors.module';
import { MailistModule } from './portal-domain/mailist/mailist.module';
import { RegisteredsuppliersModule } from './portal-domain/registeredsuppliers/registeredsuppliers.module';
import { VerificationModule } from './portal-domain/verification/verification.module';
import { EntityUserModule } from './entity-domain/entity-user/entity-user.module';
import { ProcuremententityUserModule } from './procuremententity-user/procuremententity-user.module';
import { LoginModule } from './entity-domain/login/login.module';
import { ProfileModule as EntityProfileModule } from './entity-domain/profile/profile.module';
import { ProcurementclassModule } from './procurementclass/procurementclass.module';
import { ProcurementclassificationModule } from './procurementclassification/procurementclassification.module';

import { EntitydashboardModule } from './entity-domain/entitydashboard/entitydashboard.module';
import { AnnualplanModule } from './entity-domain/annualplan/annualplan.module';
import { SettingsModule } from './entity-domain/settings/settings.module';
import { UomModule } from './uom/uom.module';
import { ProcurementcategoryModule } from './procurementcategory/procurementcategory.module';
import { IndividualplanModule } from './entity-domain/individualplan/individualplan.module';
import { UploadplanModule } from './entity-domain/uploadplan/uploadplan.module';
import { AuthorityapplicationModule } from './entity-domain/authorityapplication/authorityapplication.module';
import { ProcurementmanagementunitModule } from './entity-domain/procurementmanagementunit/procurementmanagementunit.module';
import { UploadSignatureModule } from './entity-domain/upload-signature/upload-signature.module';
import { UploadCvModule } from './entity-domain/upload-cv/upload-cv.module';
import { EvaluationcommitteModule } from './entity-domain/evaluationcommitte/evaluationcommitte.module';
import { OrganogramModule } from './entity-domain/organogram/organogram.module';
import { ProcurementapplicationModule } from './procurementapplication/procurementapplication.module';
import { AuthorityapplicationcommentsModule } from './authorityapplicationcomments/authorityapplicationcomments.module';
import { ProcurementClassValidtyModule } from './procurement-class-validty/procurement-class-validty.module';
import { ProcurementClassFeeModule } from './procurement-class-fee/procurement-class-fee.module';
import { AuthorityinvoiceModule } from './authorityinvoice/authorityinvoice.module';
import { AuthorityinvoiceuploadModule } from './entity-domain/authorityinvoiceupload/authorityinvoiceupload.module';
import { EntitynoticeModule } from './entity-domain/entitynotice/entitynotice.module';
import { ProcurementthresholdModule } from './procurementthreshold/procurementthreshold.module';

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
    MobilepaymentModule,
    BidderReceiptingModule,
    PaynowPaymentModule,
    BankPaymentModule,
    BidbondapplicationModule,
    TendersModule,
    NoticecategoryModule,
    NoticeapplicationModule,
    NoticeinvoicingModule,
    BankaccountModule,
    TenderreceiptingModule,
    ApplicationModule,
    BidderUsers,
    BidderContactsModule,
    DirectorsModule,
    MailistModule,
    RegisteredsuppliersModule,
    VerificationModule,
    EntityUserModule,
    ProcuremententityUserModule,
    LoginModule,
    EntityProfileModule,
    ProcurementclassModule,
    ProcurementclassificationModule,
    EntitydashboardModule,
    AnnualplanModule,
    SettingsModule,
    UomModule,
    ProcurementcategoryModule,
    IndividualplanModule,
    UploadplanModule,
    AuthorityapplicationModule,
    ProcurementmanagementunitModule,
    UploadSignatureModule,
    UploadCvModule,
    EvaluationcommitteModule,
    OrganogramModule,
    ProcurementapplicationModule,
    AuthorityapplicationcommentsModule,
    ProcurementClassValidtyModule,
    ProcurementClassFeeModule,
    AuthorityinvoiceModule,
    AuthorityinvoiceuploadModule,
    EntitynoticeModule,
    ProcurementthresholdModule,
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
