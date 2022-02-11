<template>
  <div>
         <v-btn
        color="primary"
        fab
       
        @click="addPermModel=true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
  <v-dialog v-model="addPermModel" width="300">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               Add User
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
    name:'addUser',
 data(){
     return{
         addPermModel:false,
         valid:false,
         form:{
              name:'',
              surname:'',
              email:'',
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
          await this.$store.dispatch('users/addData',this.form)
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