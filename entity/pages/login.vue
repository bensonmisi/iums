<template>
  <v-container>
      <v-row class="mt-5">
          <v-col md="4" offset-md="4">
               <div class="d-flex justify-center">
               <img src="logo.png" width="200"/>
               </div>
               <v-form v-model="valid" ref="form" lazy-validation>
              <v-card class="mt-5">
                  <v-card-title>Procurement Entity Login</v-card-title>
                  <v-card-text>                      
                  
                       <v-row>
                          <v-col><v-text-field outlined label="Email" type="email" v-model="form.email" :rules="emailRule"/></v-col>
                     </v-row>
                           <v-row>
                                   <v-col>
                                       <v-text-field
                                           v-model="form.password"
                                           outlined
                                           :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"                                          
                                           :type="show1 ? 'text' : 'password'"
                                           label="Password"
                                           hint="At least 8 characters"
                                           counter
                                           :rules="passwordRule"
                                           @click:append="show1 = !show1"
                                       >
                                       </v-text-field>
                                   </v-col>
                                
                               </v-row>
                        

                      


                  </v-card-text>
                  <v-card-actions>
                      <v-btn rounded depressed class="error" to="/">Cancel</v-btn>
                      <v-spacer/>
                      <v-btn rounded depressed class="success" @click="submit">Submit</v-btn>
                  </v-card-actions>
              </v-card>
               </v-form>        
              <v-btn text block class="mt-2" to="forgot">Forgot Password?</v-btn>
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
               password:''
           },
           overlay:false,
            valid:true,
            show1: false,
           emailRule:[ v => !!v || 'E-mail is required',
                      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                     ],
         passwordRule:[v=>!!v || 'Password is required' ]
      
       }
   },methods:{
       async submit(){
         if(this.$refs.form.validate()){
          this.valid = true
           this.overlay=true
            try {
              const response =  await this.$auth.loginWith('local', { data:this.form} )              
                  this.overlay=false
                 this.$router.push('dashboard')
                 
            } catch (err) {
              this.overlay=false
                    this.$swal("error",err.response.data.message,"error") 

            }
         
         }
       }
   }

   
}
</script>

<style>

</style>