<template>
  <div>
       <v-alert
      prominent
      type="error"
      class="mt-2"
      v-if="monthlyreturn && monthlyreturn.status=='error'"
    >
      <v-row align="center">
        <v-col class="grow">
          {{monthlyreturn.message}}
        </v-col>
        <v-col class="shrink">
          <v-btn to="/returns/system">Take action</v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </div>
</template>

<script>
export default {

 computed:{

     monthlyreturn(){
         return this.$store.state.dashboard.data.monthlyreturn
     }
 }
}
</script>

<style>

</style>