<template>
  <div>
      <v-card class="mt-5">
         <v-toolbar color="blue" dark>
          <v-toolbar-title>Invoice Details</v-toolbar-title>
          <v-spacer/>
          <template v-if="invoice.status=='AWAITING'">
          <makepayment :invoice="invoice"/>
          </template>
       </v-toolbar>
        <v-card-text>
        
                  <v-simple-table dense>
                    <template v-slot:default>
                        <thead>
                          <tr>
                            <th>#ID</th>
                             <th>Invoice number</th>
                            <th>Tender Number</th>
                            <th>Description</th>                           
                            <th>Amount</th>
                            <th>Status</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                               {{invoice.id}}
                            </td>
                            <td>
                               {{invoice.invoicenumber}}
                            </td>
                            <td>
                               {{invoice.tendernumber}}
                            </td>
                            <td>
                               {{invoice.description}}
                            </td>
                            <td>
                                 {{invoice.currency.name}}{{invoice.amount}}
                            </td>
                            <td>
                              {{invoice.status}}
                            </td>
                            <td>
                              <template v-if="invoice.status=='AWAITING'">
                              <v-btn x-small depressed  color="error" :loading="loading" :disabled="loading" @click="deleteInvoice">cancel</v-btn>
                              </template>
                            </td>
                          </tr>
                        </tbody>
                    </template>
                  </v-simple-table>
        </v-card-text>
      </v-card>
  </div>
</template>

<script>
import makepayment from './makepayment.vue'
export default {
  components: { makepayment },
 props:['invoice','application'],
 data(){
   return{
     loading:false
   }
 },
 methods:{
   async deleteInvoice(){
        this.$swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.isConfirmed) {
    this.loading=true
         this.$store.dispatch('awaitingtenderinvoices/deleteInvoice',{invoice:this.invoice})
         this.loading=false 
    Swal.fire(
      'Deleted!',
      'Your invoice has been deleted.',
      'success'
    )
  }
})
         
     }
 }
}
</script>

<style>

</style>