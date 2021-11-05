<template>
   <v-container>
       <v-row class="mt-5">
           <v-col md="8" offset-md="2">
             
               <v-card class="mt-4">
                   <v-card-text>
                       <v-form v-model="valid" ref="form" lazy-validation>
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
        name: '',
        surname:'',
        email:''
        },
        nameRule:[v=>!!v || 'Name is Required'],
        surnameRule:[v=>!!v || 'Surname is Required'],
        emailRule:[v=>!!v || 'Email is Required'],
        valid:false,
        loading:false,
        color:"",
        snackbar:false,
        text:""
     }
 },computed:{

     profile(){
         const user = this.$store.state.auth.user
         this.form.name = user.name
         this.form.surname = user.surname
         this.form.email = user.email
     }
 },methods:{
    async submit(){
         if(this.$refs.form.validate()){
          this.valid = true
           this.loading=true
            try {
               await this.$axios.post('api/admin/profile/personal', this.form)
                this.loading = false
                 this.color="success"
                this.snackbar=true
                this.text="Profile Successfully changed"
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