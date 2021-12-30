<template>
  <v-col md="3">
       <v-card>
           <v-card-text class="text-center">
               <div>
                   <v-badge
                    color="red"
                    :content="applications ? applications.length : 0"
                     overlap
                  >
                 <v-icon x-large color="green" class="icon-size">mdi-marker-check</v-icon>
                   </v-badge>
                 </div>
               <div class="subtitle-1">Tender Applications</div>
               <v-btn block depressed color="primary" @click="infoDialog=true">Open</v-btn>

           </v-card-text>
       </v-card>
             <v-dialog v-model="infoDialog" width="1400">
      <v-card>
    <v-card-title class="white--text blue darken-4">
      Tender Invoices
   </v-card-title>
 <v-card-text>
                     <template  v-if="applications">
       <v-simple-table dense>
                    <template v-slot:default>
                        <thead>
                          <tr>
                            <th>#ID</th>
                            <th>Tender Number</th>
                            <th>Type</th>
                            <th>Closing Date</th>
                            <th>Validity Period</th>
                            <th>Maturity Date</th> 
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Code</th>
                          </tr>
                        </thead>
                        <tbody>
                          <template  v-if="applications.length>0">
                          <tr v-for="application in applications" :key="application.id">
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
                               {{application.closingDate}}
                             </td>
                              <td>
                               {{application.validityperiod}}
                             </td>
                             <td>
                               {{application.maturitydate}}
                             </td>
                              <td>
                               {{application.currency ? application.currency.name :''}}{{application.amount}}
                             </td>
                              <td>
                               {{application.status}}
                             </td>
                              <td>
                               {{application.code}}
                             </td>
                          
                          </tr>
                          </template>
                          <template v-else>
                            <tr>
                              <td colspan="9" class="text-center red--text"> No Tender applications found</td>
                            </tr>
                          </template>
                        
                        </tbody>
                    </template>
                </v-simple-table>
                     </template>
 </v-card-text>
   
  </v-card>
       </v-dialog>
  </v-col>
</template>

<script>
export default {
name:'tenderapplications',
props:['applications'],
data(){
  return{
  infoDialog:false
  }
}
}
</script>
<style scoped>

.icon-size{
    font-size: 60px !important;
}
 
</style>