<template>
  <div>
      <v-btn rounded x-small depressed class="primary" @click="getReceipts">receipts</v-btn>
      <v-dialog width="800" v-model="receiptDialog">
          <v-card>
              <v-card-title>
                  Receipts
                  <v-spacer/>
                  <v-btn icon @click="receiptDialog=false">
                      <v-icon>mdi-close</v-icon>
                  </v-btn>
              </v-card-title>
              <v-card-text>
                 <v-simple-table>
                     <template v-slot:default>
                         <thead>
                             <tr>
                                 <th>Date</th>
                                 <th>Invoice number</th>
                                 <th>Receipt number</th>
                                 <th>Type</th>
                                 <th>Description</th>
                                 <th>Method</th>
                                 <th>Amount</th>
                                 <th></th>
                             </tr>
                         </thead>
                         <tbody>
                           <template v-if="receipts.length>0">
                               <tr v-for="receipt in receipts" :key="receipt.id">
                                   <td>
                                    {{receipt.created_at|formatDate}}
                                   </td>
                                   <td>
                                       {{receipt.invoicenumber}}
                                   </td>
                                   <td>
                                       {{receipt.receiptnumber}}
                                   </td>
                                   <td>
                                       {{receipt.type}}
                                   </td>
                                   <td>
                                       {{receipt.description}}
                                   </td>
                                   <td>
                                       {{receipt.method}}
                                   </td>
                                   <td>
                                       {{receipt.amount}}
                                   </td>
                                   <td>

                                   </td>
                               </tr>
                           </template>
                           <template v-else>
                               <tr>
                                   <td colspan="8" class="text-center red--text">No receipts found</td>
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
export default {
name:'Vieweceipts',
props:['invoicenumber'],
data(){
    return{
       receiptDialog:false 
    }
},methods:{
    async getReceipts(){
        await this.$store.dispatch('receipting/getByInvoice',this.invoicenumber)
        this.receiptDialog=true
    }
},computed:{
    receipts(){
        return  this.$store.state.receipting.data
    }
}
}
</script>

<style>

</style>