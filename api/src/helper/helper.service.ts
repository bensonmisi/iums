import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Accountdocument } from 'src/accountdocuments/entities/accountdocument.entity';
import { Accountnumber } from 'src/accountnumber/entities/accountnumber.entity';
import { Account } from 'src/accounts/entities/account.entity';
import { Bidbondthreshold } from 'src/bidbondthreshold/entities/bidbondthreshold.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Document } from 'src/documents/entities/document.entity';
import { Exchangerate } from 'src/exchangerate/entities/exchangerate.entity';
import { Procuremententity } from 'src/procuremententity/entities/procuremententity.entity';
import { Receipt } from 'src/receipt/entities/receipt.entity';
import { Registrationfee } from 'src/registrationfee/entities/registrationfee.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { Supplierinvoice } from 'src/supplierinvoice/entities/supplierinvoice.entity';
import { Suppliertype } from 'src/suppliertype/entities/suppliertype.entity';
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
  
      async accountdocuments(account:Account){
     
    const documents = await Document.find({where:{suppliertypeId:account.suppliertypeId,locality:account.locality}})
    
    let array = []
     if(documents.length>0){
       let id=[]
      documents.forEach(document => { id.push(document.id) })
      const uploaded = await Accountdocument.find({where:{accountId:account.id,documentId:In(id)}})
       
  

     documents.forEach(document => { 
      let element = {
        id: document.id,
        name: document.name,
        filename: '',
        docstatus: 'NOTFOUND',
        status: 'NOTFOUND'

      }
          uploaded.forEach(upload=>{
         
            if(upload.documentId==document.id){
             element.filename = upload ? upload.path : ''
             element.docstatus = upload ? 'UPLOADED' : 'NOTFOUND'
             element.status = upload ? upload.status : 'NULL' 

            }
          })

          array.push(element)
      })

    
   }
   return array
   
      }
      async generate_tender_invoice_number(accountId){
        const date = new  Date()
        const year = date.getFullYear()
        const random= await Math.floor(Math.random() * Math.floor(10000)); 
        return "invT"+year+""+random+""+accountId
      }

      async generate_registration_invoice_number(accountId:number,regyear:number){
      const invoice = await Supplierinvoice.findOne({where:{accountId:accountId,year:regyear,status:'PENDING0'}})
      if(invoice){
        return invoice.invoicenumber
      }
      else{
        const date = new  Date()
        const year = date.getFullYear()
        const random= await Math.floor(Math.random() * Math.floor(10000)); 
        return "inv"+year+""+random+""+accountId
      }
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
      
      
 async get_suspense_balances(accountId:number){

  // get account numbers
  const non_refundable_usd_accounts = await Accountnumber.find({where:{type:'NONREFUNDABLE',currency:'USD'}})
  const non_refundable_zwl_accounts = await Accountnumber.find({where:{type:'NONREFUNDABLE',currency:'ZWL'}})
  const refundable_usd_accounts = await Accountnumber.find({where:{type:'REFUNDABLE',currency:'USD'}})
  const refundable_zwl_accounts = await Accountnumber.find({where:{type:'REFUNDABLE',currency:'ZWL'}})

  /// get suspense data 
  const non_refundable_usd_suspense_data = await this.get_suspense_data(non_refundable_usd_accounts,accountId)
  const non_refundable_zwl_suspense_data = await this.get_suspense_data(non_refundable_zwl_accounts,accountId)
  const refundable_usd_suspense_data = await this.get_suspense_data(refundable_usd_accounts,accountId)
  const refundable_zwl_suspense_data = await this.get_suspense_data(refundable_zwl_accounts,accountId)

  /// computing  balances
  let array=[]
  array.push({type:'NONREFUNDABLE',currency:'USD',balance:this.compute_suspenses_balance(non_refundable_usd_suspense_data)})
  array.push({type:'NONREFUNDABLE',currency:'ZWL',balance:this.compute_suspenses_balance(non_refundable_zwl_suspense_data)})
  array.push({type:'REFUNDABLE',currency:'USD',balance:this.compute_suspenses_balance(refundable_usd_suspense_data)})
  array.push({type:'REFUNDABLE',currency:'ZWL',balance:this.compute_suspenses_balance(refundable_zwl_suspense_data)})

  return array
}

async check_registration_permission(suppliertypeId:number,registrations:Supplier[]){
  const type = await Suppliertype.findOne({where:{id:suppliertypeId}})

  let message =[];
   if(type.allowed_categories !="ALL"){
   const array = type.allowed_categories.split(',')
     registrations.forEach(registration=>{
         if(!array.includes(registration.category.code)){
          message.push({message:'Client supplier type can only register in the following categories:  '+ type.allowed_categories})
         }
     })
   }
   return message
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

      
      compute_suspenses_balance(suspenses:Suspense[]){
        if(suspenses.length>0){         
        
          let totalreceipts = 0   
          let total_approved_transfers=0  
          let total_amount = 0  
       
          suspenses.forEach(suspense=>{

            /** computing total suspense amount  */

            total_amount = total_amount+ Number(suspense.amount)
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
          })      
            

           /**
            * return actual suspense balance
            */
            const balance = total_amount-totalreceipts-total_approved_transfers
              
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

  async calculate_maturity_date(date:string,days:number){
    var result = new Date(date)
    result.setDate(result.getDate()+days)
    return result
  }


  async getReceipts(invoicenumbers){
    return await Receipt.find({where:{invoicenumber:In(invoicenumbers)}})
  }

  async get_registration_price(account:Account,currenyId:number){
    let locality ='LOCAL'
    if(account.country.toUpperCase()!=='ZIMBABWE'){
      locality='FOREIGN'
    }
    const rate = await Exchangerate.findOne({order:{id:'DESC'}})
    const price = await Registrationfee.findOne({where:{locality:locality},order:{id:'DESC'}})

    if(price){
      if(price.currencyId ==currenyId){
        return {exchangrerate:rate.id,cost:price.price}
      }else{
     

        if(!rate){
          throw new HttpException("Exchange rate not found please contact System Administrator",HttpStatus.BAD_REQUEST)  
        }

        return {exchangrerate:rate.id,cost:Number(rate.value) * Number(price.price)}
      }
    }
    throw new HttpException("Price not found please contact System Administrator",HttpStatus.BAD_REQUEST)
  }
}
