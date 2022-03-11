<template>
   <v-container>
       <v-row class="mt-5">
           <v-col md="4" offset-md="4">
                 <v-alert
      prominent
      v-model="alert"
      type="success"
    > 
      <v-row align="center">
        <v-col class="grow">
            {{text}}
         </v-col>
        <v-col class="shrink">
          <v-btn href="/login">Goto Login</v-btn>
        </v-col>
      </v-row>
    </v-alert>
               <v-card class="mt-4">
                   <v-card-title>Reset Password</v-card-title>
                   <v-card-text>
                       <v-form v-model="valid" ref="form" lazy-validation>
                      <v-text-field
                            label="Username"
                            outlined
                            v-model="form.username"
                            :rules="usernameRule"
                        />
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
                        <v-btn class="indigo darken-4 white--text"  large depressed block @click="submit" :loading="loading" :disabled="loading">Reset Password</v-btn>
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
    >{{text}}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="green"
          text
          v-bind="attrs"
          to="login"
        >
         Goto Login
        </v-btn>
      </template>
    </v-snackbar>
   </v-container>
</template>

<script>
export default {
 auth:false,
 async asyncData({ params }) {
      const token = params.token // When calling /abc the slug will be "abc"
      return { token }
    },
 data(){
     return{
        show1: false,
        show2:false,
        alert:false,
        form:{
        password: '',
        username:'',
        confirmpassword:'',
        token:""
        },
        passwordrules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          confirm: v => v === this.form.password || 'Password Mismatch'
        },
        usernameRule:[v=>!!v || 'Required'],
        valid:false,
        loading:false,
        color:"",
        snackbar:false,
        text:""
     }
 },methods:{
    async submit({ params }){
         if(this.$refs.form.validate()){
          this.valid = true
           this.loading=true
         
                this.form.token=this.token
               await this.$axios.post('api/admin/adminpasswordrest',this.form).then((response)=>{
                 this.loading = false
                 this.color="success"
                this.alert=true
                this.text=response.data.message
               }).catch((error)=>{
               this.loading = false
                 this.color="error"
                this.snackbar=true
                this.text=error.response.data.message
               })
                          
               
           
         }
     }
 }
}
</script>

<style>

</style>