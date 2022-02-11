<template>
  <div>
         <v-btn
        class="text--primary"
       icon
        small
        @click="addPermModel=true"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
  <v-dialog v-model="addPermModel" width="300">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               Update User
               <v-spacer/>
               <v-btn icon @click="addPermModel=false"><v-icon>mdi-close</v-icon></v-btn>
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
                            v-model="form.email"
                            :rules="emailRule"
                        />
                          <v-checkbox
                            v-model="form.resetpassword"
                             label="Reset Password"
                            ></v-checkbox>
                          
           </v-card-text>
           <v-card-actions>
               <v-btn rounded class="error" @click="addPermModel=false">Cancel</v-btn>
               <v-spacer/>
               <v-btn rounded class="success" @click="submit" :loading="loading" :disabled="loading">Submit</v-btn>
           </v-card-actions>
       </v-card>
           </v-form>
      </v-dialog>
  </div>
</template>

<script>
export default {
    name:'updateUser',
    props:['user'],
 data(){
     return{
         addPermModel:false,
         valid:false,
         form:{
              name:this.user.name,
              surname:this.user.surname,
              email:this.user.email,
              resetpassword:false
         },
         nameRule:[v=>!!v || 'Name is required'],
         surnameRule:[v=>!!v || 'Surname is required'],
         emailRule:[v=>!!v || 'Email is required'],
         loading:false
     }
 },methods:{
     async submit(){
       if(this.$refs.form.validate())
       {
          this.valid = true
          this.loading=true
          const payload = {data:this.form,id:this.user.id}
          await this.$store.dispatch('users/updateData',payload)
          this.loading = false
           this.$refs.form.reset()
          this.addPermModel=false
       }
     }
 }
}
</script>

<style>

</style>