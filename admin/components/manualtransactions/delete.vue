<template>
  <div>
      <v-btn icon x-small depressed color="error" @click="addPermModel=true"><v-icon>mdi-trash-can</v-icon></v-btn>
   
      <v-dialog v-model="addPermModel" width="300">
       <v-card>
           <v-card-title>
               Delete Request
               <v-spacer/>
               <v-btn icon @click="addPermModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text class="text-center">
                <h4>You are about to delete </h4> 
                <p>{{transaction.source_reference}}</p>
           </v-card-text>
           <v-card-actions>
               <v-btn rounded class="error" @click="addPermModel=false">Cancel</v-btn>
               <v-spacer/>
               <v-btn rounded class="success" @click="submit" :loading="loading" :disabled="loading">Submit</v-btn>
           </v-card-actions>
       </v-card>
          
      </v-dialog>
       <v-snackbar
     
      :color="color"
      right
      top
      v-model="snackbar"
    >{{text}}</v-snackbar>
  </div>
</template>
<script>
export default {
    props:['transaction'],
 data(){
     return{
         addPermModel:false,  
         snackbar:false,
         color:'',
         text:'',
         loading:false,
     }
 },methods:{
     async submit(){
     
          this.loading=true
             try {
             
                 await this.$axios.delete('api/admin/manualtransactions/'+this.transaction.id).then((res)=>{
                        this.loading = false
                        this.color="success"
                        this.snackbar=true
                        this.text=res.data.message
                         this.$store.dispatch('manualtransactions/getTransactions')               
                        this.addPermModel= false

                 })
             }catch (err) {
                 this.loading = false
                 this.color="error"
                this.snackbar=true
                this.text=err.response.data.message
            }
      
     }
 }
}
</script>

<style>

</style>