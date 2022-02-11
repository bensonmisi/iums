<template>
    <div>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Supplier Invoices</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row>
          <v-col>
           <v-card>
               <v-card-title>Supplier Invoices</v-card-title>
               <v-card-text>
                   <v-simple-table>
                       <template v-slot:default>
                           <thead>
                               <tr>
                                   <th>Date</th>
                                   <th>Invoice number</th>
                                   <th>Category</th>
                                   <th>Year</th>
                                   <th>Settlement Option</th>
                                   <th>Status</th>
                                   <th>Cost</th>
                                   <th></th>
                               </tr>
                           </thead>
                           <tbody>
                               <template v-if="invoices.length>0">
                                   <tr v-for="inv in invoices" :key="inv.id">
                                       <td>{{inv.created_at|formatDate}}</td>
                                       <td>{{inv.invoicenumber}}</td>
                                       <td>
                                           <small>{{inv.category.name}}</small>
                                           <div>{{inv.category.code}}</div>
                                        </td>
                                        <td>
                                            {{inv.year}}
                                        </td>
                                        <td>
                                            {{inv.settlement}}
                                        </td>
                                        <td>
                                            {{inv.status}}
                                        </td>
                                        <td>
                                            {{inv.currency.name}}
                                            {{inv.cost}}
                                        </td>
                                        <td class="d-flex pt-2 pb-2">
                                            <template v-if="inv.status !=='PAID'">
                                                <v-btn rounded depressed x-small color="success" @click="checkSettlement(inv.invoicenumber)">Check</v-btn>
                                            </template>
                                            <Vieweceipts :invoicenumber="inv.invoicenumber"/>
                                        </td>
                                   </tr>
                               </template>
                               <template v-else>
                                   <tr>
                                       <td colspan="8" class="text-center red--text">No Supplier Invoices Found</td>
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
await this.$store.dispatch('invoicing/getData')
this.overlay = false
},methods:{
   async checkSettlement(invoicenumber){
        this.overlay=true
         await this.$axios.get('api/bidder/supplierinvoicing/checksettlement/'+invoicenumber).then(async(res)=>{
            this.$swal(res.data.status,res.data.message,res.data.status)
            await this.$store.dispatch('invoicing/getData')
           this.overlay=false
         }).catch(error=>{
             this.$swal(error.response.data.status,error.response.data.message,error.response.data.status)
            this.overlay=false
         })
      
   }
},
  computed:{
   invoices(){
       return this.$store.state.invoicing.data
   }
   }

}
</script>