<template>
  <div>
      <v-btn x-small depressed color="primary" @click="submit" :loading="loading" :disabled="loading">View</v-btn>
   
      <v-dialog v-model="addPermModel" width="900">
       <v-card>
           <v-card-title>
            {{account ? account.name :" NULL" }}
               <v-spacer/>
               <v-btn icon @click="addPermModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
                <v-simple-table dense>
                         <template v-slot:default>
                             <thead>
                                 <tr>
                                     <th>
                                          Inv
                                     </th>
                                     <th>
                                         Tender Number
                                     </th>
                                     <th>
                                       Description
                                     </th>
                                     <th>
                                         Amount
                                     </th>
                                     <th></th>
                                 </tr>
                             </thead>
                             <tbody>
                                <tr v-for="invoice in invoices" :key="invoice.id">
                                  <td>{{invoice.invoicenumber}}</td>
                                  <td>{{invoice.tendernumber}}</td>
                                  <td>{{invoice.description}}</td>
                                  <td>{{invoice.currency.name}}{{invoice.amount}}</td>
                                  <td>
                                      <receipt :id="invoice.id"/>
                                  </td>
                                </tr>
                             </tbody>
                         </template>
                </v-simple-table>
                      
                          
           </v-card-text>
       </v-card>
      </v-dialog>
       <v-snackbar
     
      :color="color"
      right
      top
      v-model="snackbar"
    >{{text}}</v-snackbar>
  </div>
</template>

<script>
import receipt from './receipt.vue'

export default {
  components: { receipt },
    props:['account'],
  
        data(){
     return{
         addPermModel:false,
         valid:false,         
         snackbar:false,
         color:'',
         text:'',
         loading:false
     }
 },methods:{
     async submit(){
           this.loading=true
         await this.$store.dispatch('awaitingtenderinvoices/getByCompany',this.account.id) 
          this.loading = false
          this.addPermModel = true
             
     }
 },computed:{
    invoices(){
       return this.$store.state.awaitingtenderinvoices.accountinvoices
      
    }
}
}
</script>

<style>

</style>