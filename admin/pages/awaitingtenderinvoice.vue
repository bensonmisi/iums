<template>
    <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Awaiting Tender Invoices </v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
     
      <v-row class="mt-5">
          <v-col>
                <v-card>
                <v-card-title>
                   Awaiting Tender Invoices 
                </v-card-title>
                <v-card-text>
                  
                    <template v-if="transactions">
                      <v-simple-table dense>
                         <template v-slot:default>
                             <thead>
                                 <tr>
                                     <th>
                                         Date
                                     </th>
                                     <th>
                                         Account Name
                                     </th>
                                     <th>

                                     </th>
                                 </tr>
                             </thead>
                             <tbody>
                               <tr v-for="(account,index) in transactions" :key="index">
                                <td>
                                  {{account[0].created_at | formatDate}}
                                </td>
                                <td>
                                    {{account[0].account ? account[0].account.name :" NULL" }}
                                </td>

                               <td>
                                  <TenderinvoiceAwaiting :account="account[0].account"/>
                               </td>
                               </tr>

                             </tbody>

                         </template>
                      </v-simple-table>
                    </template>
                    <template v-else>
                         <v-alert
                            color="red lighten-2"
                            dark
                            >
                            No Tender Invoices awaiting verification found as yet
                            </v-alert>
                    </template>
                </v-card-text>
            </v-card>
          </v-col>
      </v-row>
           <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    </v-container>
</template>

<script>
export default {
layout:'user',
data(){
    return{
        overlay:false,
        tabs:null
    }
},
async fetch(){
    this.overlay=true
   await this.$store.dispatch('awaitingtenderinvoices/getInvoices') 
   this.overlay = false
},computed:{
    transactions(){
       const transaction =  this.$store.state.awaitingtenderinvoices.invoices
       const transactions = transaction.reduce((acc,obj)=>{
         const key = obj['accountId']
         if(!acc[key]){
             acc[key]=[]
         }
         acc[key].push(obj)
         return acc
       },{})

      return transactions
    }
}
}
</script>

<style>

</style>