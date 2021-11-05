<template>
  <div>
      <v-btn color="error" icon dark @click="addModel=true"><v-icon>mdi-trash-can</v-icon></v-btn>
      <v-dialog v-model="addModel" width="300">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
            <v-card-text class="text-center">
                <h4>You are about to delete </h4> 
                <p>{{module.name}}</p>
           </v-card-text>
           <v-card-actions>
               <v-btn rounded class="error" @click="addModel=false">Cancel</v-btn>
               <v-spacer/>
               <v-btn rounded class="success" @click="submit" :loading="loading" :disabled="loading">Proceed</v-btn>
           </v-card-actions>
       </v-card>
           </v-form>
      </v-dialog>
       <v-snackbar
      absolute
      :color="color"
      right
      top
      v-model="snackbar"
    >{{text}}</v-snackbar>
  </div>
</template>

<script>
export default {
props:['module'],
 data(){
     return{
         addModel:false,
         valid:false,       
         snackbar:false,
         color:'',
         text:'',
         loading:false
     }
 },methods:{
     async submit(){
      
          this.valid = true
          this.loading=true
             try {
                 await this.$axios.delete('api/admin/system-modules/'+this.module.id).then((res)=>{
                        this.loading = false
                        this.color="success"
                        this.snackbar=true
                        this.text=res.data.message
                        this.$store.dispatch('systemmodules/getModules')
                        this.$refs.form.reset()
                        this.addModel = false

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