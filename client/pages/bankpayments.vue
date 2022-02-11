<template>
    <div>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Bank Payments</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row>
          <v-col>
           <v-card>
               <v-card-title>Bank Payments</v-card-title>
               <v-card-text>
                   <v-simple-table>
                       <template v-slot:default>
                           <thead>
                               <tr>
                                   <th>Date</th>
                                   <th>Description</th>
                                   <th>Reference</th>
                                   <th>Account</th>
                                   <th>Amount</th>
                                   <th></th>
                               </tr>
                           </thead>
                           <tbody>
                               <template v-if="transactions.length>0">
                                   <tr v-for="trans in transactions" :key="trans.id">
                                       <td>{{trans.transactionDate}}</td>
                                       <td>{{trans.description}}</td>
                                       <td>
                                         {{trans.sourcereference}}
                                        </td>
                                        <td>
                                            {{trans.accountnumber}}
                                        </td>
                                        <td>
                                           {{trans.currency}} {{trans.amount}}
                                        </td>
                                        
                                   </tr>
                               </template>
                               <template v-else>
                                   <tr>
                                       <td colspan="5" class="text-center red--text">No bank transactions found</td>
                                   </tr>
                               </template>
                           </tbody>
                       </template>
                   </v-simple-table>
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

      </div>
</template>
<script>
export default {
layout:'user',
data(){
    return{
      overlay:false
    }
},
async fetch(){
    this.overlay=true
await this.$store.dispatch('bankpayments/getData')
this.overlay = false
},
  computed:{
   transactions(){
       return this.$store.state.bankpayments.data
   }
   }

}
</script>