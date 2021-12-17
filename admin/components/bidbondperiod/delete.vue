<template>
  <div>
      <v-btn icon depressed color="error" @click="showModel"><v-icon>mdi-trash-can</v-icon></v-btn>
   
      <v-dialog v-model="addPermModel" width="300">
           
       <v-card>
           <v-card-title>
               Delete Currency
               <v-spacer/>
               <v-btn icon @click="addPermModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text class="text-center">
                <h4>You are about to delete </h4> 
                <p>{{period.days}}</p>
           </v-card-text>
           <v-card-actions>
               <v-btn rounded class="error" @click="addPermModel=false">Cancel</v-btn>
               <v-spacer/>
               <v-btn rounded class="success" @click="submit" :loading="loading" :disabled="loading">Submit</v-btn>
           </v-card-actions>
       </v-card>
          
      </v-dialog>
  </div>
</template>

<script>
export default {
    props:['period'],
 data(){
     return{
         addPermModel:false,
         loading:false
     }
 },methods:{
     showModel(){
        this.addPermModel=true
     },
     async submit(){
       this.valid = true
          this.loading=true          
          this.$store.dispatch('bidbondperiods/deletePeriod',this.period.id)
          this.loading=false
     }
 }
}
</script>

<style>

</style>