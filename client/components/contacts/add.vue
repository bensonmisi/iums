<template>
  <div>
      <v-btn depressed color="primary" fab @click="profileDialog=true"><v-icon>mdi-plus</v-icon></v-btn>
      <v-dialog v-model="profileDialog" width="600">
           <v-form v-model="valid" ref="form" lazy-validation>
          <v-card>
              <v-card-title>
                  Add Contact Information
                   <v-spacer/>
                   <v-btn icon @click="profileDialog=false"><v-icon>mdi-close</v-icon></v-btn>
              </v-card-title>
              <v-card-text>
                    <v-textarea
                            label="Address"
                            outlined
                            v-model="form.address"
                            :rules="addressRule"
                        />
                         <v-textarea
                            label="Phones"
                            outlined
                            v-model="form.phones"
                            :rules="phoneRule"
                        />
                          <v-textarea
                            label="Email"
                            outlined
                            type="email"
                            v-model="form.emails"
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
name:'AddContactInfo',
data(){
    return{
        profileDialog:false,
        addressRule:[v=>!!v||"Address is required"],
        phoneRule:[v=>!!v || 'phone numbers are required'],
        emailRule:[v => !!v || 'E-mails are required'],
        valid:false,
        loading:false,
        form:{
            address:'',
            phones:'',
            emails:''
        }
    }
},methods:{
   async submit(){
    if(this.$refs.form.validate())
       {
          this.valid = true
          this.loading=true
         await this.$axios.post('api/bidder/contacts',this.form).then(async(res)=>{
           this.$swal("success",res.data.message,"success")
           this.loading= false
            await this.$store.dispatch('dashboard/getDashboard')
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