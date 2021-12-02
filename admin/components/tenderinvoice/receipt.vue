<template>
  <div>
      <v-btn x-small depressed color="success" @click="showReceipt" :loading="loading" :disabled="loading">receipt</v-btn>
       <v-dialog v-model="addPermModel" width="600">
       <v-card>
           <v-card-title>
              Receipting
               <v-spacer/>
               <v-btn icon @click="addPermModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>

           </v-card-text>
       </v-card>
       </v-dialog>
  
  </div>
</template>

<script>
export default {
   props:["id"],
   data(){
       return{
       addPermModel:false,
       loading:false
       }
   },methods:{
       showReceipt(){
           this.addPermModel=true
       }
   }
}
</script>

<style>

</style>