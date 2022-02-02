<template>
    <div>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="/dashboard">Dashboard</v-btn>
                      <v-btn text to="/supplier/invoice">Invoicing</v-btn>
                       <v-btn text disabled>Receipting</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row>
        <v-col>
          <Stepper :progress="3"/>
        </v-col>
      </v-row>

       <v-row>
        <v-col md="6" offset-md="3">
         <SupplierReceipting/>
        </v-col>
       </v-row>
    </div>
</template>

<script>
import SupplierReceipting from '../../components/receipting/view.vue'
export default {
layout:'user',
components:{SupplierReceipting},


   
}
</script>

<style>

</style>