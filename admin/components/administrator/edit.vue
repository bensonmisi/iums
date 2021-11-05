<template>
  <div>
      <v-btn icon depressed color="primary" @click="addModel=true"><v-icon>mdi-pencil</v-icon></v-btn>
   
      <v-dialog v-model="addModel" width="800">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               Update Administrator
               <v-spacer/>
               <v-btn icon @click="addModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
               <v-row>
                   <v-col>
                  <v-text-field
                            label="Name"
                            outlined
                            v-model="form.name"
                            :rules="nameRule"
                        />
                   </v-col>
                   <v-col>
                      <v-text-field
                            label="Surname"
                            outlined
                            v-model="form.surname"
                            :rules="surnameRule"
                        />
                   </v-col>
               </v-row>
                    
                    <v-row>
                        <v-col>
                    <v-text-field
                            label="Email"
                            outlined
                            type="email"
                            v-model="form.email"
                            :rules="emailRule"
                        />
                        </v-col>
                        <v-col>
                        <v-text-field
                            label="Username"
                            outlined
                            v-model="form.username"
                            :rules="usernameRule"
                        />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                          <v-select
                            label="Role"
                            outlined
                            :items="roles"
                            item-text="name"
                            item-value="id"
                            v-model="form.roleId"
                            :rules="roleRule"
                        />
                        </v-col>
                        <v-col>
                         <v-select
                            label="Status"
                            outlined
                            :items="status"
                            v-model="form.status"
                            :rules="statusRule"
                        />
                        </v-col>
                    </v-row>
                      
                          
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
    props:['administrator'],
 data(){
     return{
         addModel:false,
         valid:false,
         status:['ACTIVE','BLOCKED'],
         form:{
              name:this.administrator.name,
              surname:this.administrator.surname,
              email:this.administrator.email,
              username:this.administrator.username,
              roleId:this.administrator.roleId,
              status:this.administrator.status            
         },
         nameRule:[v=>!!v || 'Name is required'],
         surnameRule:[v=>!!v || 'Surname is required'],
         emailRule:[v=>!!v || 'Email is required'],
         usernameRule:[v=>!!v || 'Username is required'],
         roleRule:[v=>!!v || 'Role is required'],  
         statusRule:[v=>!!v || 'Status is required'],      
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
                 await this.$axios.patch('api/admin/users/'+this.administrator.id,this.form).then((res)=>{
                        this.loading = false
                        this.color="success"
                        this.snackbar=true
                        this.text=res.data.message
                         this.$store.dispatch('administrators/getAdministrators')
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