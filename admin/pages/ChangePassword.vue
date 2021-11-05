<template>
   <v-container>
       <v-row class="mt-5">
           <v-col md="8" offset-md="2">
             
               <v-card class="mt-4">
                   <v-card-title>Change Password</v-card-title>
                   <v-card-text>
                       <v-form v-model="valid" ref="form" lazy-validation>
                       <v-text-field
                            v-model="form.password"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[passwordrules.required, passwordrules.min]"
                            :type="show1 ? 'text' : 'password'"
                            name="input-10-1"
                            label="New Password"
                            hint="At least 8 characters"
                            counter
                            outlined
                            @click:append="show1 = !show1"
                        />
                          <v-text-field
                            v-model="form.confirmpassword"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[passwordrules.required, passwordrules.min,passwordrules.confirm]"
                            :type="show2 ? 'text' : 'password'"
                            name="input-10-1"
                            label="Confirm Password"
                            hint="At least 8 characters"
                            counter
                            outlined
                            @click:append="show2 = !show2"
                        />
                       
                      
                        <v-btn class="indigo darken-4 white--text"  large depressed block @click="submit" :loading="loading" :disabled="loading">Submit</v-btn>
                       </v-form>
                   </v-card-text>
               </v-card>
           </v-col>
       </v-row>
        <v-snackbar
      absolute
      :color="color"
      right
      top
      v-model="snackbar"
    >{{text}}</v-snackbar>
   </v-container>
</template>

<script>

export default {
 auth:false,
 layout:'user',
 data(){
     return{
        form:{
        password: '',
        confirmpassword:'',
        },
        passwordrules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          confirm: v => v === this.form.password || 'Password Mismatch'
        },
         show1: false,
        show2:false,
        valid:false,
        loading:false,
        color:"",
        snackbar:false,
        text:""
     }
 },methods:{
    async submit(){
         if(this.$refs.form.validate()){
          this.valid = true
           this.loading=true
            try {
               await this.$axios.post('api/admin/profile/changepassword', this.form)
                this.loading = false
                 this.color="success"
                this.snackbar=true
                this.text="Password Successfully changed"
                await this.$auth.fetchUser()
                this.$router.push('dashboard')
               
                 
            } catch (err) {
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