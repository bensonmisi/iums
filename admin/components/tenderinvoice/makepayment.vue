<template>
  <div>
      <v-btn rounded color="success" @click="openPOS" :loading="loading" :disabled="loading">Make Payment</v-btn>
          <v-dialog v-model="openModel" width="800">
         
       <v-card>
           <v-card-title>
              Receipting
               <v-spacer/>
               <v-btn icon @click="openModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
              
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                      <tr>
                        <th>Invoice number</th>
                        <th class="white--text blue">Amount Due</th>
                        <th class="white--text green">Amount Paid</th>
                        <th class="white--text red">Balance</th>
                       </tr> 
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {{receiptdata.invoice.invoicenumber}}
                          </td>
                          <td class="white--text blue">
                            {{receiptdata.invoice.currency.name}}{{receiptdata.invoice.amount}}
                          </td>
                          <td class="white--text green">
                           {{receiptdata.invoice.currency.name}}
                           {{computeReceipts}} 
                          </td>
                          <td class="white--text red">
                           {{receiptdata.invoice.currency.name}}
                           {{calculateBalance(receiptdata.invoice.amount,computeReceipts)}} 
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table> 


                  <v-card class="mt-5">
                    <v-toolbar color="indigo" dark>
     

      <v-toolbar-title>Suspense Wallets</v-toolbar-title>

      <v-spacer></v-spacer>
     <topup :invoiceId="receiptdata.invoice? receiptdata.invoice.id :''" :accountId="receiptdata.invoice? receiptdata.invoice.accountId :''"/>
    </v-toolbar>
    <v-card-text>
               <v-simple-table>
                    <template v-slot:default>
                      <thead>
                      <tr>
                        <th>Account number</th>                      
                        <th>Amount</th>
                        <th>Action</th>
                       </tr> 
                      </thead>
                      <tbody>
                        <template v-if="receiptdata.suspense.length">
                          <tr v-for="suspense in receiptdata.suspense" :key="suspense.id">
                            <td>{{suspense.accountnumber}}</td>
                            <td>{{suspense.currency}}{{suspense.amount}}</td>
                            <td><v-btn depressed x-small color="success" @click="settle(suspense.id)">settle</v-btn></td>
                          </tr>
                        </template>
                        <template v-else>
                          <tr>
                            <td colspan="4" class="red--text text-center">No suspense balance found</td>
                          </tr>
                        </template>
                      </tbody>
                    </template>
               </v-simple-table>
    </v-card-text>
                  </v-card>  
                    <v-card class="mt-5">
          <v-toolbar color="blue" dark>    
             <v-toolbar-title>Proof Of Payments</v-toolbar-title>
         </v-toolbar>
            <v-card-text>
               <v-simple-table>
                    <template v-slot:default>
                      <thead>
                      <tr>
                        <th>Payment Date</th>
                        <th>Bank</th>
                        <th></th>
                       </tr> 
                      </thead>
                      <tbody>
                         <template v-if="receiptdata.rtgs.length>0">
                           <tr v-for="rtg in receiptdata.rtgs" :key="rtg.id">
                             <td>{{rtg.paymentdate}}</td>
                             <td>{{rtg.bank}}</td>
                             <td></td>
                           </tr>
                         </template>
                         <template v-else>
                            <tr>
                            <td colspan="3" class="red--text text-center">No Proof of payments found</td>
                          </tr>
                         </template>
                      </tbody>
                    </template>
               </v-simple-table>
            </v-card-text>
         </v-card>
             
                          
           </v-card-text>
       </v-card>

       
      </v-dialog>
       <v-snackbar
     
      :color="color"
      right
      top
      v-model="snackbar"
    >{{text}}</v-snackbar>
  </div>
</template>

<script>
import topup from '../topup.vue'
export default {
  components: { topup },
 props:['invoice'],
 data(){
   return{
     color:"",
     snackbar:false,
     text:"",
     openModel:false,
     loading:false

   }
 },methods:{
   async openPOS(){   
       try {
         this.loading=true
         await this.$store.dispatch('awaitingtenderinvoices/getReceiptData',this.invoice.id)
         this.loading=false   
         this.openModel=true
       } catch (err) {
         this.loading = false
            this.$swal("error",this.text=err.response.data.message,'error')
       }
            
   },async settle(id){
       const formdata ={invoiceId:this.invoice.id,suspenseId:id}
        this.loading = true
        try {          
        
          await this.$axios.post('api/admin/receipting',formdata).then((res)=>{
              this.color="success"
                        this.snackbar=true
                        this.text=res.data.message
                         this.loading = false
                          this.$store.dispatch('awaitingtenderinvoices/getReceiptData',this.invoice.id)
          })
          } catch (err) {
            this.loading = false
                this.$swal("error",this.text=err.response.data.message,'error')
                
        }
          
         
   },
   calculateBalance(amount,paid){
     return Number(amount)-paid
   }
 },computed:{
    receiptdata(){
       let data = []
        data = this.$store.state.awaitingtenderinvoices.receiptData 
        return data
       },
    computeReceipts(){
      let paid = 0
       const data =  this.$store.state.awaitingtenderinvoices.receiptData 
      if(data.receipts.length>0){
         data.receipts.forEach(element => {
              paid = paid+Number(element.amount)
         });
      }

      return paid
    }
    
}

}
</script>

<style>

</style>