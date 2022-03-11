<template>
  <div>
    <v-row>
        <v-col>
            <v-card>
                <v-card-text>
                    <v-btn text to="/dashboard">Dashboard</v-btn>
                    <v-btn text disabled>Bid Bonds</v-btn>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-row class="mt-5">
        <v-col>
              <DashboardBidbond :bidbonds="bidbonds"/>
        </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
 layout:"user",
 async fetch(){
     await this.$store.dispatch('bidbonds/getData')
 },computed:{
     bidbonds(){
        return this.$store.state.bidbonds.data       
     }
 }


}
</script>

<style>

</style>