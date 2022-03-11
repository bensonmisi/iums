<template>
   <v-stepper>
    <v-stepper-header>
      <v-stepper-step
        :complete="progress> 1"
           color="success"
        step="1"
      >
       <div :class="progress==1 ?'blue--text':''">Notice Information</div>
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="progress> 2"
        color="success"
        step="2"
      >
       <div :class="progress==2 ?'blue--text':''">Product/Service</div>
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step    :complete="progress> 3" step="3"    color="success">
         <div :class="progress==3 ?'blue--text':''">Required Categories </div>
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step    :complete="progress== 4" step="4"    color="success">
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