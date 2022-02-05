<template>
<div>
  <DashboardBalances :wallet="dashboard.wallet"/>
  <v-row>
    <v-col md="12">
      <template v-if="dashboard.awaiting && dashboard.awaiting.length>0">
      <DashboardAwaiting :invoices="dashboard.awaiting"/>
      </template>
    </v-col>
  </v-row>
  <v-row>
    <v-col md="12">
       <DashboardRegistrations :registrations="dashboard.registrations"/>
    </v-col>
  </v-row>
  <v-row>
    <v-col md="12">
      <DashboardBidbonds :bidbonds="dashboard.bidbonds"/>
    </v-col>
  </v-row>
  <v-row>
    <v-col md="12">
     <DashboardTenderfee :applications="dashboard.applications"/>
    </v-col>
  </v-row>

</div>
</template>

<script>
export default {
layout:"user",
async fetch(){
 await this.$store.dispatch('dashboard/getDashboard')
},computed:{
  dashboard(){
    return this.$store.state.dashboard.data
  }
}

}
</script>

<style>

</style>