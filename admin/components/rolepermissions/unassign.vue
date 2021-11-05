<template>
  <div>
      <v-btn x-small depressed color="error" @click="addPermModel=true">unassign</v-btn>
   
     
      <v-dialog v-model="addPermModel" width="300">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
              Unassign Permission
               <v-spacer/>
               <v-btn icon @click="addPermModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text class="text-center">
                <h4>You are about to Unassign </h4> 
                <p>{{permission.name}} from {{ role.name}}</p>
           </v-card-text>
           <v-card-actions>
               <v-btn rounded class="error" @click="addPermModel=false">Cancel</v-btn>
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
    props:['permission','role','submodule'],
 data(){
     return{
         addPermModel:false,
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
                 const data ={roleId:this.role.id,permissionId:this.permission.id}
                 await this.$axios.post('api/admin/role/unassignpermission',data).then((res)=>{
                        this.loading = false
                        this.color="success"
                        this.snackbar=true
                        this.text=res.data.message
                        this.$store.dispatch('roles/getAssignedPermissions',{id:this.submodule.id,roleId:this.role.id})
                        this.$refs.form.reset()
                        this.addPermModel = false

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