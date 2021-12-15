<template>
  <div>
      <v-btn color="primary" x-small depressed @click="show">receipt</v-btn>
      <v-dialog v-model="addPermModel" width="700">
       <v-card>
             <v-toolbar color="blue" dark>
          <v-toolbar-title>Supplier Receipting</v-toolbar-title>
          <v-spacer/>
         <v-btn icon @click="addPermModel=false"><v-icon>mdi-close</v-icon></v-btn>
       </v-toolbar>
          <v-card-text>
             <v-simple-table dense>
                         <template v-slot:default>
                             <thead>
                                 <tr> 
                                     <th></th>                                    
                                     <th>
                                      Invoicenumber
                                     </th>
                                     <th>
                                         Category
                                     </th>
                                     <th>
                                     Amount
                                     </th>
                                     <th></th>
                                 </tr>
                             </thead>
                             <tbody>
                                 <tr v-for="inv in invoices" :key="inv.id">
                                     <td>
                                            <v-checkbox
                                            v-model="selected"
                                            :value="inv.id"
                                            ></v-checkbox>
                                     </td>
                                       <td>
                                           {{inv.invoicenumber}}
                                       </td>
                                       <td>
                                          <div> {{inv.category.code}}</div>
                                       </td>
                                       <td>
                                           <div class="d-flex">{{inv.currency.name}} {{inv.cost}}</div>
                                       </td>
                                       <td>
                                           <template v-if="invoice.length>1 || receiptData.receipts.length==0">
                                               <v-btn color="error" x-small depressed rounded @click="deleteRecord(inv.id)">delete</v-btn>
                                           </template>
                                             <v-btn x-small rounded depressed @click="check(inv.invoicenumber)">Check</v-btn>
                                       </td>
                                     
                                 </tr>
                                <tr class="blue--text">
                                     <td colspan="3">Total Due</td>
                                     <td>{{ invoices.length>0 ? invoices[0].currency.name :""}}{{total}}</td>
                                 </tr>

                                 <tr class="green--text">
                                    <td colspan="3">Total Paid</td>  
                                    <td>{{invoices.length>0 ? invoices[0].currency.name :""}}{{totalreceipted}}</td>
                                 </tr>

                                 <tr class="red--text">
                                    <td colspan="3">Balance</td>  
                                    <td>{{invoices.length>0 ? invoices[0].currency.name :""}}{{balance}}</td>
                                 </tr>
                             </tbody>
                         </template>
             </v-simple-table>
           
             
 <v-toolbar color="green" dark class="mt-5">
          <v-toolbar-title>Receipts</v-toolbar-title>
          <v-spacer/>
         
       </v-toolbar>
            
              <v-simple-table dense>
                         <template v-slot:default>
                             <thead>
                                 <tr>  
                                     <th>
                                     Date
                                     </th>                                   
                                     <th>
                                      Receiptnumber
                                     </th>
                                     <th>
                                      Method
                                     </th>
                                     <th class="text-right">
                                     Amount
                                     </th>
                                 </tr>
                             </thead>
                             <tbody>
                                 <template v-if="receiptData.receipts.length > 0">
                                 <tr v-for="receipt in receiptData.receipts" :key="receipt.id">
                                      <td>{{receipt.created_at |formatDate}}</td>
                                   <td>{{receipt.receiptnumber}}</td>
                                   <td>{{receipt.method}}</td>
                                   <td class="text-right">{{receipt.currency.name}}{{receipt.amount}}</td>
                                 </tr>
                                 </template>
                                 <template v-else>
                                     <tr>
                                         <td colspan="2" class="red--text text-center">No Receipts Found</td>
                                     </tr>
                                 </template>
                             </tbody>
                         </template>
              </v-simple-table>
             <v-toolbar color="primary" dark class="mt-5">
                <v-toolbar-title>Suspense Wallets</v-toolbar-title>
                <v-spacer/>
                <claim :accountId="invoice[0].accountId" :invoicenumber="invoice[0].invoicenumber"/>
            </v-toolbar>
            <v-simple-table dense>
                         <template v-slot:default>
                             <thead>
                                 <tr>   
                                     <th>
                                      Wallet ID
                                     </th>                                  
                                     <th>
                                      Account number
                                     </th>
                                     <th>
                                     Amount
                                     </th>
                                     <th>

                                     </th>
                                 </tr>
                             </thead>
                             <tbody>
                                 <template v-if="receiptData.suspenses.length>0">
                                   <tr v-for="suspense in receiptData.suspenses" :key="suspense.id">
                                        <td>{{suspense.id}}</td>
                                    <td>{{suspense.accountnumber}}</td>
                                    <td>{{suspense.currency}}{{suspense.amount}}</td>
                                    <td class="text-right">
                                       <v-btn x-small color="success" @click="settle(suspense.id)">settle</v-btn> 
                                    </td>
                                   </tr>
                                 </template>
                                 <template v-else>
                                     <tr>
                                         <td colspan="3" class="text-center red--text">No Suspense Balance</td>
                                     </tr>
                                 </template>
                             </tbody>
                         </template>
            </v-simple-table>
             <v-toolbar color="indigo" dense flat dark class="mt-5">
                <v-toolbar-title>Upload pops</v-toolbar-title>
                <v-spacer/>
                <Uploadpop :id="invoice[0].accountId" mode="supplier" :invoicenumber="invoice[0].invoicenumber"/>
            </v-toolbar>
            <v-simple-table dense>
                         <template v-slot:default>
                             <thead>
                                 <tr>                                     
                                     <th>
                                      Bank
                                     </th>
                                     <th>

                                     </th>
                                 </tr>
                             </thead>
                             <tbody>
                                 <template v-if="receiptData.rtgs.length>0">
                                   <tr v-for="rtg in receiptData.rtgs" :key="rtg.id">
                                    <td>{{rtg.name}}</td>                                    
                                    <td>
                                        <v-btn color="success" depressed rounded x-small  @click="viewfile(rtg.filename)">view</v-btn>
                                    </td>
                                   </tr>
                                 </template>
                                 <template v-else>
                                     <tr>
                                         <td colspan="2" class="text-center red--text">No Uploads found</td>
                                     </tr>
                                 </template>
                             </tbody>
                         </template>
            </v-simple-table>
             
           </v-card-text>
       </v-card>
      </v-dialog>
  </div>
</template>

<script>
import Uploadpop from '../uploadpop.vue'
import claim from './claim.vue'

export default {
  components: { claim, Uploadpop },
    props:['invoice','total'],
 data(){
     return{
         addPermModel:false,
         selected:[]
     }
 },methods:{
     async show(){
         await this.$store.dispatch('supplierreceipting/getReceiptData',this.invoice[0].invoicenumber) 
         this.addPermModel = true
     },
     async check(invoicenumber){
      await this.$axios.get('api/admin/supplierinvoice/checksettlement/'+invoicenumber).then(async res=>{
              this.$swal("success",res.data.message,"success")
            await this.$store.dispatch('supplierreceipting/getReceiptData',invoicenumber) 
            await  this.$store.dispatch('awaitingsupplierinvoices/getByCompany',this.invoice[0].accountId) 
         }).catch(err=>{
            this.$swal("error",err.response.data.message,"error")
         })
  
     },
     async viewfile(filename){
      let path = 'http://localhost:4000/'+filename
      window.open(path)
     },
     async deleteRecord(id){
          
this.$swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then(async (result) => {
  if (result.isConfirmed) {
     await this.$axios.delete('api/admin/supplierinvoice/'+id).then(async res=>{
              this.$swal("success",res.data.message,"success")
               await this.$store.dispatch('supplierreceipting/getReceiptData',this.invoice[0].invoicenumber) 
               await  this.$store.dispatch('awaitingsupplierinvoices/getByCompany',this.invoice[0].accountId) 
         }).catch(err=>{
            this.$swal("error",err.response.data.message,"error")
         })
  }
})
       
     },
     async settle(id){
         if(this.selected.length==0){
             this.$swal("error","Please select invoice items you wish to settle","error")
         }else{

         let formData = {suspenseId:id,invoiceItems:this.selected}       
         await this.$axios.post('api/admin/supplierreceipting',formData).then(async (res)=>{
              this.$swal("success",res.data.message,"success")
               await this.$store.dispatch('supplierreceipting/getReceiptData',this.invoice[0].invoicenumber) 
               await  this.$store.dispatch('awaitingsupplierinvoices/getByCompany',this.invoice[0].accountId) 
    
         }).catch(err=>{
            this.$swal("error",err.response.data.message,"error")
         })
         }

     }
      
 },computed:{
    receiptData(){
        return  this.$store.state.supplierreceipting.receiptData


    },
    invoices(){
        return this.$store.state.awaitingsupplierinvoices.selectedinvoices
    },
    totalreceipted(){
        const data = this.$store.state.supplierreceipting.receiptData

        let total = 0

        if(data.receipts.length>0){
            data.receipts.forEach(element => {
                 total = total+ Number(element.amount)
            });
        }
        return total
    },balance()
      {
        const data = this.$store.state.supplierreceipting.receiptData

        let receipted = 0

        if(data.receipts.length>0){
            data.receipts.forEach(element => {
                receipted = receipted+ Number(element.amount)
            });
        }
        return this.total - receipted    
      }
 }
}
</script>

<style>

</style>