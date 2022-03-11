<template>
<div>
  <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="/dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Tender Invoicing</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
  <v-row>
     <v-col>
       <v-card>
         <v-card-title><div class="subtitle">Tender Invoicing</div><v-spacer/>
         <template v-if="invoices.length>0">
         
         </template></v-card-title>
         <v-card-text>
           <template v-if="invoices.length>0">
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th>Date</th>
                <th>Invoice number</th>
                <th>Description</th>
                <th>Tendernumber</th>
                <th>Type</th>
                <th>Amount</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
               <tr v-for="inv in invoices" :key="inv.id">
                 <td>{{inv.created_at | formatDate}}</td>
                   <td>{{inv.invoicenumber}}</td>
                 <td>{{inv.description}}</td>
                 <td>{{inv.tendernumber}}</td>
                 <td>{{inv.type}}</td>
                 <td class="text-right">{{inv.currency.name}}{{inv.amount}}</td>
                 <td class="d-flex pt-2">
                   <template v-if="inv.status=='PENDING'">
                     <TenderInvoiceDelete :id="inv.id"/>
                   <v-btn x-small depressed rounded color="primary" :to="`/tenderreceipting/`+inv.invoicenumber">make payment</v-btn>
                   </template>
                   <template v-else>
                     {{inv.status}}
                   </template>
                </td>
               </tr> 
               <tr><td colspan="5" class="headline text-right">Total Due</td><td class="headline text-right">{{invoices[0].currency.name}}{{totalDue}}</td></tr>
              </tbody>
            </template>
          </v-simple-table>
           </template>
           <template v-else>
             <v-alert
              prominent
              text
              type="error"
            >
              <v-row align="center">
                <v-col class="grow">
                  Not Pending Invoices awaiting settlement
                </v-col>
                <v-col class="shrink">
                  <v-btn to="/user/tenders">Browse Tenders</v-btn>
                </v-col>
              </v-row>
            </v-alert>
           </template>
         </v-card-text>
       </v-card>
     </v-col>
  </v-row>
</div>
</template>

<script>
import TenderInvoiceDelete from '~/components/tenders/invoice/delete.vue'
export default {
layout:'user',
components:{TenderInvoiceDelete},
async fetch(){
  await this.$store.dispatch('tenderinvoicing/getData')
},computed:{
  invoices(){
    return this.$store.state.tenderinvoicing.data
  },
  totalDue(){
    let invoices = []
    invoices = this.$store.state.tenderinvoicing.data

    let total = 0

    invoices.forEach(element => {
       total = Number(total)+Number(element.amount)
    });

    return total
  }


}
}
</script>

<style>

</style>