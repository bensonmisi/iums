<template>
  <div>
      <v-btn icon depressed color="primary" @click="getRoles"><v-icon>mdi-pencil</v-icon></v-btn>
   
      <v-dialog v-model="addPermModel" width="500">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               Edit User
               <v-spacer/>
               <v-btn icon @click="addPermModel=false"><v-icon>mdi-close</v-icon></v-btn>
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
                            label="Job Title"
                            outlined
                            v-model="form.jobtitle"
                            :rules="jobtitleRule"
                        />
                   </v-col>
                   <v-col>
                    <v-select 
                         label="Title"
                         outlined
                         v-model="form.title"
                         :rules="titleRule"
                         :items="titlelist"
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
                        label="Phonenumber"
                        outlined
                        v-model="form.phonenumber"
                        :rules="phonenumberRule"
                        />
                   </v-col>
               </v-row>
               <v-row>
                   <v-col>
                          <v-select 
                         label="Role"
                         outlined
                         v-model="form.roleId"
                         :rules="roleRule"
                         :items="roles"
                         item-value="id"
                         item-text="name"
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
     
      :color="color"
      right
      top
      v-model="snackbar"
    >{{text}}</v-snackbar>
  </div>
</template>

<script>
export default {
    props:['user'],
 data(){
     return{
         addPermModel:false,
         valid:false,
         form:{
              name:this.user.name,
              surname:this.user.surname,
              email:this.user.email,
              phonenumber:this.user.phonenumber,
              jobtitle:this.user.jobtitle,
              title:this.user.title,
              roleId:this.user.roleId,
              procuremententityId:this.user.procuremententityId

         },
         nameRule:[v=>!!v || 'Name is required'],
         surnameRule:[v=>!!v || 'Surname is required'],
         emailRule:[ v => !!v || 'E-mail is required',
                      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                     ],
         phonenumberRule:[v=>!!v || 'Phone number is required'],
         jobtitleRule:[v=>!!v || 'Jobtitle is required'],
         titleRule:[v=>!!v || 'title is required'],
         roleRule:[v=>!!v || 'Role is required'],
         titlelist:['Mr','Mrs','Miss','Ms','Dr','Prof'],
          snackbar:false,
         color:'',
         text:'',
         loading:false
     }
 },methods:{
     async getRoles(){
    await this.$store.dispatch('roles/getRoles')
    this.addPermModel=true
     },
     async submit(){
       if(this.$refs.form.validate())
       {
          this.valid = true
          this.loading=true
          const payload ={id:this.user.id,data:this.form}
          await this.$store.dispatch('procuremententity/editUser',payload)
          this.loading=false
       }
     }
 },computed:{
     roles(){
        let data =  this.$store.state.roles.roles
        return  data.filter(dt=>{return dt.level =='ENTITY'})
     }
 }
}
</script>

<style>

</style>