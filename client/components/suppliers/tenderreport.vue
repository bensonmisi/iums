<template>
  <div>
      <v-simple-table v-if="data">
          <template v-slot:default>
              <tbody>
                            <tr><th>Company name</th><td>{{data.account.name}}</td></tr>
                            <tr><th>Company regnumber</th><td>{{data.account.regnumber}}</td></tr>
                            <tr><th>Tender Number</th><td>{{data.tendernumber}}</td></tr>
                            <tr><th>Type</th><td>{{data.type}}</td></tr>
                            <tr><th>Entity</th><td>{{data.procuremententity.name}}</td></tr>
                            <tr><th>Amount</th><td>{{data.currency.name}}{{data.amount}}</td></tr>
                            <tr><th>Payment Date</th><td>{{data.created_at | formatDate}}</td></tr>
                            <tr v-if="data.validityperiod"><th>Validity Period</th><td>{{data.validityperiod}}</td></tr>
                            <tr v-if="data.maturitydate"><th>Maturity Date</th><td>{{data.maturitydate}}</td></tr>
              </tbody>
          </template>
      </v-simple-table>
  </div>
</template>

<script>
import moment from 'moment'
export default {
name:'TenderVerificationResult',
 props:['data'],
 methods:{
      check_expiry(date){
         return moment(date).isAfter(moment()) ? 'ACTIVE' :'EXPIRED'
     }
 }
}
</script>

<style scoped>
 .ACTIVE{
     color: green;
 }
 .EXPIRED{
     color: red;
 }
</style>