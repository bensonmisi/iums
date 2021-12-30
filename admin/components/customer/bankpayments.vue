<template>
  <v-col md="3">
       <v-card>
           <v-card-text class="text-center">
               <div>
                   <v-badge
                    color="red"
                    :content="payments ? payments.length : 0"
                     overlap
                  >
                 <v-icon x-large color="green" class="icon-size">mdi-bank-transfer</v-icon>
                   </v-badge>
                 </div>
               <div class="subtitle-1">Bank Transaction</div>
               <v-btn block depressed color="primary" @click="infoDialog=true">Open</v-btn>

           </v-card-text>
       </v-card>
             <v-dialog v-model="infoDialog" width="900">
      <v-card>
    <v-card-title class="white--text blue darken-4">
      Bank Transactions
   </v-card-title>
 <v-card-text>
      <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
           <th class="text-left">
          Date
          </th>
             <th class="text-left">
          Description
          </th>
          <th class="text-left">
          Reference number
          </th>
          <th class="text-left">
          Source reference
          </th>
          <th class="text-left">
            Account number
          </th>
          <th class="text-left">
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
          <template v-if="payments">
           <template v-if="payments.length>0"> 
        <tr
          v-for="item in payments"
          :key="item.id"
        >
         <td>{{ item.transactionDate }}</td>
          <td>{{ item.description }}</td>
           <td>{{item.referencenumber}}</td>
              <td>{{ item.sourcereference }}</td>
          <td>{{ item.accountnumber }}</td>
           <td>{{ item.currency }}{{ item.amount }}</td>
      
      
        </tr>
           </template>
          <template v-else>
              <tr><td colspan="5" class="text-center red--text">No bank payments Found</td></tr>
          </template>
          </template>
        
      </tbody>
    </template>
  </v-simple-table>
 </v-card-text>
   
  </v-card>
       </v-dialog>
  </v-col>
</template>

<script>
export default {
name:'bankpayments',
props:['payments'],
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