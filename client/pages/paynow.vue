<template>
    <div>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Paynow Payments</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row>
          <v-col>
           <v-card>
               <v-card-title>Paynow Payments</v-card-title>
               <v-card-text>
                   <v-simple-table>
                       <template v-slot:default>
                           <thead>
                               <tr>
                                   <th>Date</th>
                                   <th>Mode</th>
                                   <th>Type</th>
                                   <th>Status</th>
                                   <th>Amount</th>
                                   <th></th>
                               </tr>
                           </thead>
                           <tbody>
                               <template v-if="transactions.length>0">
                                   <tr v-for="trans in transactions" :key="trans.id">
                                       <td>{{trans.created_at|formatDate}}</td>
                                       <td>{{trans.mode}}</td>
                                       <td>
                                         {{trans.type}}
                                        </td>
                                        <td>
                                            {{trans.status}}
                                        </td>
                                        <td>
                                           {{trans.mode=='PAYNOW' ?'USD':'ZWL'}} {{trans.amount}}
                                        </td>
                                        <td>
                                         <v-btn v-if="trans.status==='PENDING'" rounded depressed color="primary" @click="checkPayment(trans.invoicenumber)">check</v-btn>
                                        </td>
                                   </tr>
                               </template>
                               <template v-else>
                                   <tr>
                                       <td colspan="6" class="text-center red--text">No paynow payment</td>
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
import Vieweceipts from '~/components/receipts.vue'
export default {
layout:'user',
components:{Vieweceipts},
data(){
    return{
      overlay:false
    }
},
async fetch(){
    this.overlay=true
await this.$store.dispatch('paynow/getData')
this.overlay = false
},methods:{
    async checkPayment(uuid){
         this.overlay=true
        await this.$store.dispatch('paynow/checkPayment',uuid)
        this.overlay = false
    }
},
  computed:{
   transactions(){
       return this.$store.state.paynow.data
   }
   }

}
</script>