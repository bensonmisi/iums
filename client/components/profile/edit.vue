<template>
  <div>
      <v-btn depressed color="primary" @click="profileDialog=true">Edit Profile</v-btn>
      <v-dialog v-model="profileDialog" width="600">
           <v-form v-model="valid" ref="form" lazy-validation>
          <v-card>
              <v-card-title>
                  Edit Profile
                   <v-spacer/>
                   <v-btn icon @click="profileDialog=false"><v-icon>mdi-close</v-icon></v-btn>
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
                            type="email"
                            v-model="form.email"
                            :rules="emailRule"
                        />
                           <v-text-field
                            label="Phone"
                            outlined
                            v-model="form.phone"
                            :rules="phoneRule"
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
props:['profile'],
data(){
    return{
        titleList:['Mr','Mrs','Ms','Miss','Dr','Prof'],
        genderList:['F','M'],
        profileDialog:false,
        nameRule:[v=>!!v||"Name is required"],
        surnameRule:[v=>!!v || 'Surname is required'],
        emailRule:[
              v => !!v || 'E-mail is required',
               v => /.+@.+/.test(v) || 'E-mail must be valid'
               ],
        phoneRule:[v=>!!v || 'Phone is required' ],
        valid:false,
        loading:false,
        form:{
            name:this.profile.name,
            surname:this.profile.surname,
            email:this.profile.email,
            phone:this.profile.phone
        }
    }
},methods:{
    submit(){
    if(this.$refs.form.validate())
       {
          this.valid = true
          this.loading=true
          this.$axios.post('api/bidder/profile/Update',this.form).then(res=>{
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