<template>
  <div>
      <v-btn x-small rounded class="ml-2" depressed color="primary" @click="submit" :loading="loading" :disabled="loading">View</v-btn>
   
      <v-dialog v-model="addPermModel" width="900">
       <v-card>
           <v-card-title>
               <v-spacer/>
               <v-btn icon @click="addPermModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
                <v-simple-table dense>
                         <template v-slot:default>
                             <thead>
                                 <tr>
                                     <th>
                                        Date
                                     </th>
                                     <th>
                                        Year
                                     </th>
                                     <th>
                                      Invoicenumber
                                     </th>
                                     <th>
                                     Amount Due
                                     </th>
                                     <th>

                                     </th>
                                 </tr>
                             </thead>
                             <tbody>
                                <tr v-for="(invoice,index) in invoices" :key="index">
                                 <td>{{invoice[0].created_at | formatDate}}</td>
                                 <td>{{invoice[0].year}}</td>
                                 <td>{{index}}</td>
                                  <td>{{computeTotal(invoice)}}</td>
                                  <td>
                                      <receipt :invoice="invoice" :total="computeTotal(invoice)"/>
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
    props:['id'],
  
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
         await this.$store.dispatch('awaitingsupplierinvoices/getByCompany',this.id) 
          this.loading = false
          this.addPermModel = true
             
     },
     computeTotal(invoice){
             let total = 0
             invoice.forEach(element => {
                 total = total + Number(element.cost)
             });

             return total
     }
 },computed:{
    invoices(){
        const transaction= this.$store.state.awaitingsupplierinvoices.accountinvoices
         const transactions = transaction.reduce((acc,obj)=>{
         const key = obj['invoicenumber']
         if(!acc[key]){
             acc[key]=[]
         }
         acc[key].push(obj)
         return acc
       },{})

       return transactions
      
    }
}
}
</script>

<style>

</style>