<template>
<div>
    <v-card>
         <v-toolbar color="indigo" dark>
          <v-toolbar-title>Application Details</v-toolbar-title>
       </v-toolbar>
        <v-card-text>
                   <template v-if="tenderapplication.length>1">
                    <v-alert
                        prominent
                        type="error"
                      
                      >
                           The system has detected multiple Tender fee requests please select the entry you wish to use for invoicing 
                                
                      </v-alert>
                   </template>
                  <template  v-if="tenderapplication.length">
       <v-simple-table dense>
                    <template v-slot:default>
                        <thead>
                          <tr>
                            <th>#ID</th>
                            <th>Tender Number</th>
                            <th>Type</th>
                            <th>Validity Period</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Code</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                        
                          <tr v-for="application in tenderapplication" :key="application.id">
                             <td>
                               {{application.id}}
                             </td>
                              <td>
                               {{application.tendernumber}}
                             </td>
                              <td>
                               {{application.type}}
                             </td>
                              <td>
                               {{application.validityperiod}}
                             </td>
                              <td>
                               {{application.currency.name}}{{application.amount}}
                             </td>
                              <td>
                               {{application.status}}
                             </td>
                              <td>
                               {{application.code}}
                             </td>
                             <td>
                                 <template v-if="tenderapplication.length>1">
                                 <v-btn x-small depressed color="primary" rounded :loading="loading" :disabled="loading" @click="deleteInvoice(application)">select</v-btn>
                                 </template>
                                 <template v-else>
                                   <template v-if="!invoice.tenderapplicationId">
                                     <p class="red--text">Application not linked to invoice</p>
                                      <v-btn x-small depressed color="info" rounded :loading="loading" :disabled="loading" @click="link(application)">Iink application</v-btn>
                                   </template>
                                 </template>
                             </td>
                          </tr>
                        
                        
                        </tbody>
                    </template>
                </v-simple-table>
                  </template>
                     <template v-else>
                      <v-alert
                        prominent
                        type="error"
                      >
                        <v-row align="center">
                          <v-col class="grow">
                            We could not find tender application data for this invoice, hence invoice cannot be proceed we recommend you delete record and reverse any receipts linked to  invoice
                          </v-col>
                          <v-col class="shrink">
                            <v-btn>Take action</v-btn>
                          </v-col>
                        </v-row>
                      </v-alert>          
                  </template>
        </v-card-text>
    </v-card>
</div>
</template>

<script>
import Duplicates from './duplicates.vue'
import payments from './payments.vue'
export default {
  components: { payments, Duplicates },
 props:['tenderapplication','id','invoice'],
 data(){
return{
    loading:false
}
 },
 methods:{
     async deleteInvoice(application){
         this.loading=true
         await this.$store.dispatch('awaitingtenderinvoices/deleteApplication',{applicationId:application.id,invoiceId:this.id})
         this.loading=false 
     },
     async link(application){
         this.loading=true
         await this.$store.dispatch('awaitingtenderinvoices/linkApplication',{applicationId:application.id,invoiceId:this.id})
         this.loading=false 
     }
 }
}
</script>

<style>

</style>