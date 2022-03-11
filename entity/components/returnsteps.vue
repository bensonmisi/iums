<template>
   <v-stepper>
    <v-stepper-header>
      <v-stepper-step
        :complete="progress> 1"
           color="success"
        step="1"
      >
       <div :class="progress==1 ?'blue--text':''"> Monthly Return Items</div>
      </v-stepper-step>      

      <v-divider></v-divider>
      <v-stepper-step    :complete="progress==2" step="2"    color="success">
        Confirmation
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