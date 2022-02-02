<template>
<div>
   <v-alert
      prominent
        text
      type="error"
      v-if="invoices"
    >
      <v-row align="center">
        <v-col class="grow">
          You have {{invoices.length}} invoics awaiting  manual Payment verification. Please obtained reference number from your bank  and click on view invoices
        </v-col>
        <v-col class="shrink">
          <v-btn depressed rounded @click="invoiceDialog=true">View invoices</v-btn>
        </v-col>
      </v-row>
    </v-alert>
    <v-dialog v-model="invoiceDialog" width="800">
      <v-card>
         <v-toolbar dense dark color="indigo">

      <v-toolbar-title>Invoicing Awaiting Verification</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="invoiceDialog=false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
        <v-card-text>
            <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>
                                  Date
                                </th>
                                <th>
                                  Invoice number
                                </th>
                                <th>
                                  Total Due
                                </th>
                                <th>
                                  Status
                                </th>
                                <th>

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(inv,index) in  computedInvoices" :key="index">
                            <td>{{inv[0].created_at | formatDate}}</td>
                            <td>
                              {{index}}
                            </td>
                            <td>
                              {{inv[0].currency.name}}{{computedTotal(inv)}}
                            </td>
                            <td>
                              {{inv[0].status}}
                            </td>
                            <td>
                            <invDetails :invoicedata="inv"/>
                            </td>
                          </tr>
                        </tbody>

                    </template>
            </v-simple-table>
              
        </v-card-text>
      </v-card>
    </v-dialog>

</div>
</template>

<script>
import invDetails from './invoice/details.vue'
export default {
 props:['invoices'],
 components:{invDetails},
 data(){
   return{
     invoiceDialog:false,
     viewDialog:false,
     invoicedata:[]
   }
 },methods:{
   computedTotal(inv){
     let total =0

     inv.forEach(element => {
       total = total + Number(element.cost)
     });

     return total
   },
   view(inv){
     this.viewDialog = true
     this.invoicedata = inv
   },
  
 },computed:{
   computedInvoices(){
    const invoices= this.invoices.reduce((acc,obj)=>{
         const key = obj['invoicenumber']
         if(!acc[key]){
             acc[key]=[]
         }
         acc[key].push(obj)
         return acc
       },{})
       return invoices
   }
   
 }
}
</script>

<style>

</style>