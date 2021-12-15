import { Injectable } from '@nestjs/common';
import { Accountdocument } from 'src/accountdocuments/entities/accountdocument.entity';
import { Accountnumber } from 'src/accountnumber/entities/accountnumber.entity';
import { Account } from 'src/accounts/entities/account.entity';
import { Bidbondthreshold } from 'src/bidbondthreshold/entities/bidbondthreshold.entity';
import { Document } from 'src/documents/entities/document.entity';
import { Procuremententity } from 'src/procuremententity/entities/procuremententity.entity';
import { Receipt } from 'src/receipt/entities/receipt.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { Supplierinvoice } from 'src/supplierinvoice/entities/supplierinvoice.entity';
import { Suspense } from 'src/suspense/entities/suspense.entity';
import { In } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class HelperService {

    async generateRegistrationNumber(id:number) {
        const random= await Math.floor(Math.random() * Math.floor(10000));
        const reg = "PR"+random+""+id
        return reg
      }

    async generateEntityNumber(id:number) {
        const random= await Math.floor(Math.random() * Math.floor(10000));
        const reg = "PE"+random+""+id
        return reg
      }


       generateUUId(){
        return  uuidv4()
      }

      async generate_tender_invoice_number(accountId){
        const date = new  Date()
        const year = date.getFullYear()
        const random= await Math.floor(Math.random() * Math.floor(10000)); 
        return "invT"+year+""+random+""+accountId
      }

      async generate_receipt_number(invoiceId){
        const date = new  Date()
        const year = date.getFullYear()
        const random= await Math.floor(Math.random() * Math.floor(10000)); 
        return "rpt"+year+""+random+""+invoiceId
      }

      async generate_tender_code(type:string,accountId:number){

        const date = new  Date()
        const year = date.getFullYear()
        const random= await Math.floor(Math.random() * Math.floor(10000));
        type = type.replace(/\s/g, "")

        return "PRAZ-ADMIN-"+year+"-"+accountId+"-"+random
      }



      async generate_supplier_code(accountId:number,year:number){

            const random= await Math.floor(Math.random() * Math.floor(10000));
        

        return "PRAZ-"+year+"-"+accountId+"-"+random
      }

      async checkCompanyName(account:Account[], name:string){
          let found = true
           const needle = this.sanitizename(name)
            account.forEach(account=>{
                 const val = this.sanitizename(account.name)
                 if(val===needle){ 
                  found = false              
                 }
            })
          return found
          
      }

      async checkEntityName(account:Procuremententity[], name:string){
        let found = true
         const needle = this.sanitizename(name)
          account.forEach(account=>{
               const val = this.sanitizename(account.name)
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

      async suspense_balance_by_type(currency:string,type:string,accountId:number){
      return  await Accountnumber.find({where:{type:type,currency:currency}})
              
      }

      async get_suspense_data(accounts:Accountnumber[],accountId:number){
        let array = []
         accounts.forEach(account=>{
           array.push(account.accountnumber)
         })
        return await Suspense.find({where:{accountnumber:In(array),accountId:accountId,status:'PENDING'},relations:['receipts','transfers']})
         
      }

      compute_suspense_accounts(suspenses:Suspense[]){
        let totalreceipts =0 
        let total_approved_transfers  = 0
        let array=[];
      if(suspenses.length>0){
        suspenses.forEach(suspense=>{
            suspense.receipts.forEach(receipt=>{
              totalreceipts = totalreceipts+Number(receipt.amount)
           })
           suspense.transfers.forEach(transfer => {
            if(transfer.status =='APPROVED')
              {
                total_approved_transfers = total_approved_transfers+Number(transfer.amount)
              }     
          });
          const balance = Number(suspense.amount)-totalreceipts-total_approved_transfers
          const el = {id:suspense.id,accountnumber:suspense.accountnumber,currency:suspense.currency,amount:balance}
             array.push(el)
            
             })
       
        }

        return array
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

  

      calculate_establishment_fee(bidbondthreshold:Bidbondthreshold[],amount:string){
        const record =  bidbondthreshold.forEach(value=>{
           if(parseInt(value.lowerlimit) < parseInt(amount) &&  parseInt(amount)< parseInt(value.upperlimit)){
            console.log(value.amount)
            return value.amount
           }
         })
         return record
      }

  async check_supplier_invoice(invoice:Supplierinvoice[],receipts:Receipt[])
  {

     let totalInvoiced = 0
     let totalreceipted=0
     const documentCheck = await Promise.resolve(this.check_account_documents(invoice[0].accountId))
     let status = "PENDING"

     if(documentCheck.status){
       status="APPROVED"
     }
     invoice.forEach(inv=>{
       totalInvoiced = totalInvoiced + Number(inv.cost)
     })

     receipts.forEach(receipt=>{
       totalreceipted = totalreceipted + Number(receipt.amount)
     })

     const balance =  totalInvoiced - totalreceipted
  
     if(balance<=0){
       invoice.forEach(async inv=>{
         console.log("invoice paid")
          await this.capture_supplier(inv,status) 
          inv.status ='PAID'
          await inv.save()
       })
       
       return true
     }
     else{
       return false
     }

  }

  async capture_supplier(invoice:Supplierinvoice,status:string){
     const code =  await this.generate_supplier_code(invoice.accountId,Number(invoice.year))
     const supplier:Supplier = new Supplier
     supplier.accountId = invoice.accountId
     supplier.categoryId = invoice.categoryId
     supplier.supplierinvoiceId = invoice.id
     supplier.code = code
     supplier.status=status
     supplier.expire_year = Number(invoice.year)
      await Supplier.save(supplier)
  }

  async check_account_documents(accountId:number){

    const account = await Account.findOne({where:{id:accountId}})
    if(account){
          if(account.suppliertypeId>0){
                if(account.locality){
                    const documents = await Document.find({where:{suppliertypeId:account.suppliertypeId,locality:account.locality.toUpperCase(),status:"ACTIVE"}})
                    if(documents.length>0){
                      
                       const totalrequired = documents.length
                       let  approved = 0
                       documents.forEach(async document=>{
                           const uploaded = await Accountdocument.findOne({where:{accountId:accountId,documentId:document.id}})
                           if(uploaded){
                             if(uploaded.status=='APPROVED'){
                               approved++
                             }
                           }
                        })
                        
                       if(totalrequired == approved){
                        return {status:true,message:"Required Documents uploaded and approved"} 
                       }else{
                        return {status:false,message:"Required Documents not yet approved"}
                       }
                      

                    }else{
                      return {status:false,message:"Supplier Documents not Set"} 
                    }
                }else{
                  return {status:false,message:"Supplier locality not Set"}
                }
          }else{
            return {status:false,message:"Supplier Type not Set"}
          }
    }else{
      return {status:false,message:"Account not found"}
    }
  }
}
