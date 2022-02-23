<template>
  <div>
      <v-btn rounded depressed @click="getReceipts">Receipting</v-btn>
      <v-dialog v-model="showDialog" width="800">
          <v-card>
              <v-card-title>Receipts<v-spacer/><v-btn icon @click="showDialog=false"><v-icon>mdi-close</v-icon></v-btn></v-card-title>
             <v-card-text>
               <v-card>
                 <v-toolbar color="primary">
                   <v-toolbar-title>
                     Receipts
                   </v-toolbar-title>
                   <v-spacer/>                   
                 </v-toolbar>
                 <v-card-text>
                   <v-simple-table>
                     <template v-slot:default>
                       <thead>
                         <tr>
                           <th>Date</th>
                           <th>Receipt number</th>
                           <th>Description</th>
                           <th>Amount</th>
                         </tr>
                       </thead>
                       <tbody>
                         <template v-if="receipts.length>0">
                             <tr v-for="receipt in receipts" :key="receipt.id">
                               <td>{{receipt.created_at | formatDate}}</td>
                               <td>{{receipt.receiptnumber}}</td>
                               <td>{{receipt.description}}</td>
                               <td>{{receipt.amount}}</td>
                             </tr>
                         </template>
                         <template v-else>
                           <tr>
                             <td colspan="4" class="text-center red--text">
                               No receipts found
                             </td>
                           </tr>
                         </template>
                       </tbody>
                     </template>
                   </v-simple-table>
                 </v-card-text>
               </v-card>

               <v-card class="mt-2">
                  <v-toolbar color="success" dark>
                   <v-toolbar-title>
                    Suspense Balance
                   </v-toolbar-title>
                   <v-spacer/>                   
                 </v-toolbar>
                 <v-card-text>
                       <v-alert
                         v-if="balance==0"
                          dense
                          outlined
                          type="error"
                        >
                         Insufficient Funds in wallet
                        </v-alert>
                        <v-simple-table v-else>
                          <template v-slot:default>
                            <tbody>
                              <tr>
                                <td>${{balance}}</td>
                                <td class="text-right"><v-btn depressed rounded small color="success" @click="settle">Settle</v-btn></td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                 </v-card-text>
               </v-card>

                 <v-card class="mt-2">
                 <v-toolbar color="indigo" dark>
                   <v-toolbar-title>
                     Proof of Payments
                   </v-toolbar-title>
                   <v-spacer/>                   
                 </v-toolbar>
                 <v-card-text>
                   <v-simple-table>
                     <template v-slot:default>
                       <thead>
                         <tr>
                           <th>Transfer date</th>
                           <th>Bank</th>
                           <th>Amount</th>
                           <th></th>
                         </tr>
                       </thead>
                       <tbody>
                         <template v-if="transfers.length>0">
                             <tr v-for="transfer in transfers" :key="transfer.id">
                               <td>{{transfer.transdate}}</td>
                               <td>{{transfer.bank}}</td>
                               <td>{{transfer.amount}}</td>
                               <td class="d-flex pt-2 justify-end">
                                <v-btn small depressed rounded color="primary" @click="download(transfer.id)">download</v-btn>
                                <EntityinvoiceCapture :id="id"/>
                               </td>
                             </tr>
                         </template>
                         <template v-else>
                           <tr>
                             <td colspan="4" class="text-center red--text">
                               No transfers found
                             </td>
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
  </div>
</template>

<script>
export default {
props:['id'],
data(){
    return{
      showDialog:false
    }
},
methods:{
   async getReceipts(){
       await this.$store.dispatch('entityinvoice/getReceipts',this.id)
       this.showDialog=true
    },
    async download(id)
    {
        let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=800,height=800,left=100,top=100`;
        open('http://localhost:4000/api/admin/authorityinvoice/download/'+id,'test',params)
    },
    async settle(){
      await this.$store.dispatch('entityinvoice/settle',this.id)
      this.showDialog = false
    }
},computed:{
  receipts(){
    return this.$store.state.entityinvoice.receipts.receipts
  },
  transfers(){
    return this.$store.state.entityinvoice.receipts.uploads
  },balance(){
        return this.$store.state.entityinvoice.receipts.balance
  }
}
}
</script>

<style>

</style>