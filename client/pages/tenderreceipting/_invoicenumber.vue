<template>
   <div>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="/dashboard">Dashboard</v-btn>
                      <v-btn text to="/tenderinvoicing">Tender Invoicing</v-btn>
                       <v-btn text disabled>Tender Receipting</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>

       <v-row>
        <v-col md="6" offset-md="3">
         <TenderReceipting :invoicenumber="invoicenumber"/>
        </v-col>
       </v-row>
    </div>
</template>

<script>
import TenderReceipting from '~/components/tenderreceipting/view.vue'
export default {
 layout:"user",
 components:{TenderReceipting},
 data(){
     return{
         invoicenumber:this.$route.params.invoicenumber
     }
 }
}
</script>

<style>

</style>