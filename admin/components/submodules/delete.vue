<template>
  <div>
      <v-btn icon depressed color="error" @click="addSubModel=true"><v-icon>mdi-trash-can</v-icon></v-btn>
   
      <v-dialog v-model="addSubModel" width="300">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               Delete Submodule
               <v-spacer/>
               <v-btn icon @click="addSubModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text class="text-center">
                <h4>You are about to delete </h4> 
                <p>{{submodule.name}}</p>
           </v-card-text>
           <v-card-actions>
               <v-btn rounded class="error" @click="addSubModel=false">Cancel</v-btn>
               <v-spacer/>
               <v-btn rounded class="success" @click="submit" :loading="loading" :disabled="loading">Submit</v-btn>
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
    props:['submodule'],
 data(){
     return{
         addSubModel:false,
         valid:false,
        snackbar:false,
         color:'',
         text:'',
         loading:false
     }
 },methods:{
     async submit(){
       if(this.$refs.form.validate())
       {
          this.valid = true
          this.loading=true
             try {
                 await this.$axios.delete('api/admin/submodules/'+this.submodule.id).then((res)=>{
                        this.loading = false
                        this.color="success"
                        this.snackbar=true
                        this.text=res.data.message
                        this.$store.dispatch('submodules/getSubmodules',this.submodule.systemmoduleId)
                        this.$refs.form.reset()
                        this.addSubModel = false

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
}
</script>

<style>

</style>