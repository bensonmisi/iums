<template>
  <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Supplier  Management</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-5">
         <v-col>
             <v-card>
                  <v-card-text>
                      <v-row>
                      <SuppliersSummary label="LATEST REGISTRATION" :data="suppliers.pending"/>
                      <SuppliersSummary label="AWAITING CORRECTIONS" :data="suppliers.awaiting"/>
                      </v-row>                     
                  </v-card-text>
             </v-card>
         </v-col>
      </v-row>
       <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>

export default {
 layout:"user",
 data(){
    return{
        overlay:false
    }
},
async fetch(){
    this.overlay=true
   await this.$store.dispatch('suppliers/getSuppliers') 
   this.overlay = false
},computed:{
    suppliers(){
        return this.$store.state.suppliers.suppliers
    }
}
}
</script>

<style>

</style>