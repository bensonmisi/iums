<template>
  <div>
      <v-btn rounded depressed color="primary" small @click="openDialog()">utilization</v-btn>
      <v-dialog v-model="receiptsDialog" width="1000px">
          <v-card>
              <v-card-title>Details<v-spacer/> <v-btn icon @click="receiptsDialog=false"><v-icon>mdi-close</v-icon></v-btn></v-card-title>
              <v-card-text>                
                  <div class="mt-3 subtitle-1">Receipts</div>
                     <v-simple-table>
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Receipt number</th>
                                        <th>Amount</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-if="reports.suspense.receipts.length>0">
                                        <tr v-for=" receipt in reports.suspense.receipts" :key="receipt.id">
                                            <td>{{receipt.created_at}}</td>
                                            <td>{{receipt.receiptnumber}}</td>
                                            <td>{{receipt.currency}}{{receipt.amount}}</td>
                                            <td></td>
                                        </tr>
                                    </template>
                                    <template v-else>
                                        <tr><td colspan="4" class="text-center red--text">No receipts found</td></tr>
                                    </template>
                                 <tr></tr>
                                </tbody>
                            </template>                       
                     </v-simple-table>
                          <div class="mt-3 subtitle-1">Source of Funds</div>
                            <template v-if="reports.banktransaction">
                                 <v-simple-table>
                                  <template v-slot:default>
                                      <thead>
                                          <tr>
                                              <th>Transaction Date</th>
                                              <th>Description</th>
                                              <th>Source Reference</th>
                                               <th>Statement Reference</th>
                                               <th>Accountnumber</th>
                                               <th>Amount</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          <tr>
                                              <td>{{reports.banktransaction.transactionDate}}</td>
                                              <td>{{reports.banktransaction.description}}</td>
                                                <td>{{reports.banktransaction.sourcereference}}</td>
                                                 <td>{{reports.banktransaction.statementreference}}</td>
                                                  <td>{{reports.banktransaction.accountnumber}}</td>
                                                   <td>{{reports.banktransaction.currency}}{{reports.banktransaction.amount}}</td>
                                          </tr>
                                      </tbody>
                                  </template>
                                 </v-simple-table>
                            </template>
                             <template v-if="reports.onlinepayment">
                                 <v-simple-table>
                                  <template v-slot:default>
                                      <thead>
                                          <tr>
                                              <th>Transaction Date</th>
                                              <th>Invoicenumber</th>
                                              <th>Mode</th>
                                               <th>Amount</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          <tr>
                                              <td>{{reports.onlinepayment.updated_at}}</td>
                                              <td>{{reports.onlinepayment.invoicenumber}}</td>
                                                <td>{{reports.onlinepayment.mode}}</td>
                                                 <td>{{reports.onlinepayment.amount}}</td>
                                                 <td><v-btn rounded depressed x-small color="success" @click="verify(reports.onlinepayment.pollurl)">verify</v-btn></td>  
                                            </tr>
                                      </tbody>
                                  </template>
                                 </v-simple-table>
                            </template>
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
        receiptsDialog:false
    }
},methods:{
    async openDialog(){
      await this.$store.dispatch('suspense/getReceipts',this.id)
      this.receiptsDialog = true
    },
    verify(pollurl){
        window.open(pollurl)
    }
},
computed:{
      reports(){
          return  this.$store.state.suspense.receipts
      }
}
}
</script>

<style>

</style>