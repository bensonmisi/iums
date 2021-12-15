<template>
  <div>
      <v-btn x-small depressed color="success" @click="getInvoiceData" :loading="loading" :disabled="loading">Open</v-btn>
       <v-dialog v-model="addPermModel" fullscreen
      hide-overlay
      transition="dialog-bottom-transition">
       <v-card>
           <v-card-title>
             Invoice Details
               <v-spacer/>
               <v-btn icon @click="addPermModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
             <template v-if="invoicedata">
               
           
                  <applications :id="id" :invoice="invoicedata.invoice" :tenderapplication="invoicedata.tenderapplication"/>               
                  <required :fee="invoicedata.requiredfee" :application="invoicedata.requiredapplication"/>
                  <invoices :application="invoicedata.tenderapplication" :invoice="invoicedata.invoice"/>
                  
                  <payments :receipts="invoicedata.receipts"/>
               
             </template>
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
import applications from './applications.vue'
import Invoices from './invoices.vue'
import Payments from './payments.vue'
import Required from './required.vue'
export default {
  components: { applications, Invoices, Payments, Required },
   props:["id"],
   data(){
       return{
       addPermModel:false,
          loading:false,
         snackbar:false,
         color:'',
         text:'',
       }
   },methods:{
       async getInvoiceData(){ 
              try {
            this.loading=true
         await this.$store.dispatch('awaitingtenderinvoices/getInvoiceData',this.id) 
          this.loading = false
          this.addPermModel = true
              }catch (err) {
                 this.loading = false
              this.$swal("error",this.text=err.response.data.message,'error')
            }
       }
   },computed:{
    invoicedata(){
       let data = []
        data = this.$store.state.awaitingtenderinvoices.invoicedata 
        return data
       }
}
}
</script>

<style>

</style>