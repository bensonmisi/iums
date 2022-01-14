import { Global, Injectable } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { MailService } from "./mail/mail.service";

@Injectable()
@Global()
export class Events{
 constructor(private eventEmitter:EventEmitter2,private mailService:MailService){}

 emitTendeerInvoiceSettlementEvent(email:string,tendernumber:string,type:string){
     this.eventEmitter.emit('tenderinvoice.settled',{email,tendernumber,type})
 }

 @OnEvent('tenderinvoice.settled')
 listenToTenderInvoceSettlement(email:string,tendernumber:string,type:string){
    this.mailService.tenderinvoiceSettled(email,tendernumber,type)
 }

 emitSupplierInvoiceSettlementEvent(email:string){
    this.eventEmitter.emit('supplierinvoice.settled',{email})
}

@OnEvent('supplierinvoice.settled')
listenToSupplierInvoceSettlement(email:string){
    this.mailService.supplierinvoiceSettled(email)
 }

emitBidbondRefundEvent(email:string,comment:string){
    this.eventEmitter.emit('bidbond.refunded',{email,comment})
}

@OnEvent('bidbond.refunded')
listenToBidbondRefund(email:string,comment:string){
    this.mailService.generalNotification(email,comment)
}




}