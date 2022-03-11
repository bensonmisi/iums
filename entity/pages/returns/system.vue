<template>
   <div>
    <v-row>
        <v-col>
            <v-card>
                <v-card-text>
                    <v-btn text to="/dashboard">Dashboard</v-btn>
                    <v-btn text disabled>Procurement Returns</v-btn>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <Returnsteps :progress="1"/>
        </v-col>
    </v-row>
    <v-row class="mt-3">     
         <v-col>
            <v-card flat>
                <v-toolbar flat dense color="success">
                  <v-toolbar-title>Monthly Return</v-toolbar-title>
                  <v-spacer/>
                  <ProcurementsSystem/>
                </v-toolbar>
                <v-card-text>
                    <template v-if="monthlyreturns">
                    {{monthlyreturns.monthlyreturndata}}
                    </template>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
   </div>
</template>

<script>
export default {
  layout:"user",
  async fetch(){
    await this.$store.dispatch('monthlyreturn/addData',{})
  },computed:{
      monthlyreturns(){
          return this.$store.state.monthlyreturn.data.returns
      }
  }
}
</script>

<style>

</style>