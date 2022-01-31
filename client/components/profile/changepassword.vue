<template>
  <div>
   
           <v-form v-model="valid" ref="form" lazy-validation>
          <v-card class="mt-5">
              <v-card-title>
                 Change Password
                   <v-spacer/>
               
              </v-card-title>
              <v-card-text>
                     <v-text-field
                                           v-model="form.password"
                                           outlined
                                           :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"                                       
                                           :type="show1 ? 'text' : 'password'"
                                           :rules="passwordRule"
                                           label="Password"
                                           hint="At least 10 characters"
                                           counter
                                           @click:append="show1 = !show1"
                                       >
                                       </v-text-field>
                           <v-text-field
                                           v-model="form.confirmpassword"
                                           outlined
                                           :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                           :type="show2 ? 'text' : 'password'"
                                           label="ConfirmPassword"
                                           hint="At least 10 characters"
                                           counter
                                           @click:append="show2 = !show2"
                                           :rules="confirmPasswordRule"
                                       >
                                       </v-text-field>
              </v-card-text>
              <v-card-actions>
                
               <v-spacer/>
               <v-btn  depressed class="success" @click="submit" :loading="loading" :disabled="loading">Change Password</v-btn>
              </v-card-actions>
          </v-card>
           </v-form>
    
  </div>
</template>

<script>
export default {
data(){
    return{
        show1:false,
        show2:false,
        passwordRule:[
            v=>!!v||"Password is required",
            v => v.length >= 10|| 'Password must not be less than 10 characters',
            ],
       confirmPasswordRule:[
         v => !!v || 'Confirm Password is required',
        v => v.length == this.form.password.length || 'Password must match',
       ],
        valid:false,
        loading:false,
        form:{
          password:"",
          confirmpassword:""
        }
    }
},methods:{
    submit(){
    if(this.$refs.form.validate())
       {
          this.valid = true
          this.loading=true
          this.$axios.patch('api/bidder/profile/changepassword',this.form).then(res=>{
           this.$swal("success",res.data.message,"success")
           this.loading= false
          }).catch(err=>{
            this.$swal("error",err.response.data.message,"error")
            this.loading = false
          })

       }
    }
}
}
</script>

<style>

</style>