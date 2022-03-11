<template>
  <div>
      <DashboardHeader :procurementclass="dashboard.procurementclass" :invoice="dashboard.invoice"/> 
      <DashboardReturn/>     
      <DashboardNotices :notices="dashboard.notices"/>
      <DashboardBidbondlist :bidbonds="dashboard.bidbonds"/>
  </div>
</template>

<script>
export default {
 layout:"user",
 async fetch(){
     await this.$store.dispatch('dashboard/getData')
 },computed:{
     dashboard(){
         const data = this.$store.state.dashboard.data
         return data
     }
 }


}
</script>

<style>

</style>