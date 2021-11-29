import { Injectable } from '@nestjs/common';
import { Account } from 'src/accounts/entities/account.entity';
import { Suspense } from 'src/suspense/entities/suspense.entity';

@Injectable()
export class HelperService {

    async generateRegistrationNumber(id:number) {
        const random= await Math.floor(Math.random() * Math.floor(10000));
        const reg = "PR"+random+""+id
        return reg
      }

      async checkCompanyName(account:Account[], name:string){
          let found = true
           const needle = this.sanitizename(name)
            account.forEach(account=>{
                 const val = this.sanitizename(account.name)
                console.log("db_record-  ("+val+")     needle- {"+needle+"}")
                 if(val===needle){ 
                  found = false              
                 }
            })
          return found
          
      }

      sanitizename(name:string){
        name = name.replace(/\s/g, "")
        name =  name.toUpperCase()
        name = name.replace("(PVT)LTD","")
        name = name.replace("(PRIVATE)LIMITED","")
        name =  name.replace("(PRIVATE)LIMITE","")
        name = name.replace("PVT","")
        name = name.replace("P/L","")       
        name =  name.replace("PVTLTD","")
        name =  name.replace("PRIVATELIMITED","")
      
        return name
      }

      manual_transaction_request_notification(message:string){
        const Pusher =  require('pusher')
        const pusher = new Pusher({
          appId: "1186731",
          key: "4f2ecae30d5d8824089a",
          secret: "ad11b4869947b0feea7d",
          cluster: "ap2",
          useTLS: true
        });

        pusher.trigger("manualbanktranactions", "DECISION_MANUAL_TRANSACTION_REQUEST", {
          message: message
        });
      }

      manual_transaction_response_notification(event:string,message:string){
        const Pusher =  require('pusher')
        const pusher = new Pusher({
          appId: "1186731",
          key: "4f2ecae30d5d8824089a",
          secret: "ad11b4869947b0feea7d",
          cluster: "ap2",
          useTLS: true
        });

        pusher.trigger("manualbanktranactions", event, {
          message: message
        });
      }

    async   get_suspense_balance_by_id(id:number){
        const suspense = await Suspense.findOne({where:{id:id},relations:['receipts','transfers']})
        if(suspense){         
        
               let totalreceipts = 0   
               let total_approved_transfers=0    
               /**
                * calculating total  suspense receipts */        
                 suspense.receipts.forEach(receipt=>{
                    totalreceipts = totalreceipts+Number(receipt.amount)
                 })

                 /**
                  * calculating  total suspense  transfers
                  */
               
                 suspense.transfers.forEach(transfer => {
                   if(transfer.status =='APPROVED')
                     {
                       total_approved_transfers = total_approved_transfers+Number(transfer.amount)
                     }     
                 });

                /**
                 * return actual suspense balance
                 */
                 const balance = Number(suspense.amount)-totalreceipts-total_approved_transfers
                 if(balance==0 && suspense.status=="PENDING"){
                   suspense.status ="UTILIZED"
                   await suspense.save()
                 }
                   
            return balance
        }else{
          return 0
        }
      }

      compute_suspense_balance(suspense:Suspense){
        if(suspense){         
        
          let totalreceipts = 0   
          let total_approved_transfers=0    
          /**
           * calculating total  suspense receipts */        
            suspense.receipts.forEach(receipt=>{
               totalreceipts = totalreceipts+Number(receipt.amount)
            })

            /**
             * calculating  total suspense  transfers
             */
          
            suspense.transfers.forEach(transfer => {
              if(transfer.status =='APPROVED')
                {
                  total_approved_transfers = total_approved_transfers+Number(transfer.amount)
                }     
            });

           /**
            * return actual suspense balance
            */
            const balance = Number(suspense.amount)-totalreceipts-total_approved_transfers
              
       return balance
   }else{
     return 0
   }
      }
}
