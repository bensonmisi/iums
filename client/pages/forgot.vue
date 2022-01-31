<template>
  <v-container>
      <v-row>
          <v-col md="4" offset-md="4">
               <v-form v-model="valid" ref="form" lazy-validation>
              <v-card>
                  <v-card-title>Password Reset</v-card-title>
                  <v-card-text>                      
                  
                       <v-row>
                          <v-col><v-text-field outlined label="Email" type="email" v-model="form.email" :rules="emailRule"/></v-col>
                     </v-row>   </v-card-text>
                  <v-card-actions>
                      <v-btn rounded block depressed class="success" @click="submit">Request Reset Link</v-btn>
                  </v-card-actions>
              </v-card>
               </v-form>
              <v-btn text block class="mt-4" to="register">Do not have an account</v-btn>
            
          </v-col>
      </v-row>
         <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
export default {
  auth:false,
   data(){
       return{
           form:{
               email:'',
           },
           overlay:false,
            valid:true,
            show1: false,
           emailRule:[ v => !!v || 'E-mail is required',
                      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                     ],
      
       }
   },methods:{
       async submit(){
         if(this.$refs.form.validate()){
          this.valid = true
           this.overlay=true
            try {
                  this.$axios.post('/api/auth/register',this.form).then((res)=>{
                       this.$swal("success",res.data.message,"success") 
                  }).catch(err=>{
                      this.overlay = false
                      this.$swal("error",err.response.data.message,"error")  
                  })  
               
                 this.$router.push('dashboard')
                 
            } catch (err) {
            this.overlay = false
                    this.$swal("error",err.response.data.message,"error") 

            }
         }
       }
   }

   
}
</script>

<style>

</style>