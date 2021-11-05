<template>
  <div>
      <v-btn icon depressed color="primary" @click="addSubModel=true"><v-icon>mdi-pencil</v-icon></v-btn>
   
      <v-dialog v-model="addSubModel" width="300">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               Update Role
               <v-spacer/>
               <v-btn icon @click="addSubModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
                  <v-text-field
                            label="Name"
                            outlined
                            v-model="form.name"
                            :rules="nameRule"
                        />
                        
                          
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
    props:['role'],
 data(){
     return{
         addSubModel:false,
         valid:false,
         form:{
             name:this.role.name,
         },
         nameRule:[v=>!!v || 'Role name is required'],
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
                 await this.$axios.patch('api/admin/role/'+this.role.id,this.form).then((res)=>{
                        this.loading = false
                        this.color="success"
                        this.snackbar=true
                        this.text=res.data.message
                        this.$store.dispatch('roles/getRoles',this.role.id)
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