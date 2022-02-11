<template>
  <div>
      <v-simple-table v-if="data">
          <template v-slot:default>
              <tbody>
                   
                            <tr><th>Company name</th><td>{{data.account.name}}</td></tr>
                            <tr><th>Praz number</th><td>{{data.account.regnumber}}</td></tr>
                            <tr><th>Registration Date</th><td>{{data.created_at | formatDate}}</td></tr>
                            <tr><th>Expiry Date</th><td>{{data.expiry_date | formatDate}}</td></tr>
                            <tr><th>Settlement Option</th><td>{{data.option}}</td></tr>
                            <tr><th>Category</th>
                            <td>
                                <div>{{data.category.name}}</div>
                                <small>{{data.category.code}}</small>
                            </td>
                            </tr>
                            <tr><th>Status</th><td :class="check_expiry(data.expiry_date)">{{check_expiry(data.expiry_date)}}</td></tr>
                  

              </tbody>
          </template>
      </v-simple-table>
  </div>
</template>

<script>
import moment from 'moment'
export default {
name:'SupplierVerificationResult',
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