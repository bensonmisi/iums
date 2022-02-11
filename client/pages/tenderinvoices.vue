<template>
    <div>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Tender Invoices</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row>
          <v-col>
            <v-card>
              <v-card-title>Tender Invoices</v-card-title>
              <v-card-text>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th>Created at</th>
                        <th>Invoice number</th>
                        <th>Tender number</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-if="invoices.length>0">
                      <tr v-for="inv in invoices" :key="inv.id">
                        <td>{{inv.created_at|formatDate}}</td> 
                        <td>{{inv.invoicenumber}}</td> 
                        <td>{{inv.tendernumber}}</td>
                        <td>{{inv.description}}</td> 
                        <td>{{inv.type}}</td>
                        <td>{{inv.currency.name}}{{inv.amount}}</td>
                        <td>{{inv.status}}</td>
                        <td><Vieweceipts :invoicenumber="inv.invoicenumber"/></td>
                      </tr>
                      </template>
                      <template v-else>
                        <tr><td colspan="8" class="text-center red--text">No Tender invoices found</td></tr>
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
await this.$store.dispatch('tenderinvoicing/getAll')
this.overlay = false
},
  computed:{
   invoices(){
       return this.$store.state.tenderinvoicing.data
   }
   }

}
</script>