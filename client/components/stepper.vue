<template>
   <v-stepper>
    <v-stepper-header>
      <v-stepper-step
        :complete="progress> 1"
        step="1"
      >
        Documents Upload
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="progress> 2"
        step="2"
      >
       Invoicing
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step    :complete="progress> 3" step="3">
        Receipting
      </v-stepper-step>
    </v-stepper-header>
   </v-stepper>
</template>

<script>
export default {
props:['progress'],
data(){
    return{
        e1:1
    }
}
}
</script>

<style>

</style>