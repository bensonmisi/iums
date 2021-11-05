<template>
  <div>
      <v-btn fab depressed color="primary" @click="addModel=true"><v-icon>mdi-plus</v-icon></v-btn>
   
      <v-dialog v-model="addModel" width="300">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               Add Administrator
               <v-spacer/>
               <v-btn icon @click="addModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
                  <v-text-field
                            label="Name"
                            outlined
                            v-model="form.name"
                            :rules="nameRule"
                        />
                    <v-text-field
                            label="Surname"
                            outlined
                            v-model="form.surname"
                            :rules="surnameRule"
                        />
                    <v-text-field
                            label="Email"
                            outlined
                            type="email"
                            v-model="form.email"
                            :rules="emailRule"
                        />
                        <v-text-field
                            label="Username"
                            outlined
                            v-model="form.username"
                            :rules="usernameRule"
                        />
                          <v-select
                            label="Role"
                            outlined
                            :items="roles"
                            item-text="name"
                            item-value="id"
                            v-model="form.roleId"
                            :rules="roleRule"
                        />
                      
                          
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
 data(){
     return{
         addModel:false,
         valid:false,
         form:{
              name:'',
              surname:'',
              email:'',
              username:'',
              roleId:''              
         },
         nameRule:[v=>!!v || 'Name is required'],
         surnameRule:[v=>!!v || 'Surname is required'],
         emailRule:[v=>!!v || 'Email is required'],
         usernameRule:[v=>!!v || 'Username is required'],
         roleRule:[v=>!!v || 'Role is required'],        
         snackbar:false,
         color:'',
         text:'',
         loading:false
     }
 },
 async fetch(){
   await this.$store.dispatch('roles/getRoles') 
},computed:{
    roles(){
        return this.$store.state.roles.roles
    }
}
 ,methods:{
     async submit(){
       if(this.$refs.form.validate())
       {
          this.valid = true
          this.loading=true
             try {
                 await this.$axios.post('api/admin/users',this.form).then((res)=>{
                        this.loading = false
                        this.color="success"
                        this.snackbar=true
                        this.text=res.data.message
                         this.$store.dispatch('administrators/getAdministrators')
                        this.$refs.form.reset()
                        this.addModel= false

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