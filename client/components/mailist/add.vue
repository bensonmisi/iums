<template>
  <div>
      <v-btn depressed color="primary" fab @click="profileDialog=true"><v-icon>mdi-plus</v-icon></v-btn>
      <v-dialog v-model="profileDialog" width="600">
           <v-form v-model="valid" ref="form" lazy-validation>
          <v-card>
              <v-card-title>
                  Add Email
                   <v-spacer/>
                   <v-btn icon @click="profileDialog=false"><v-icon>mdi-close</v-icon></v-btn>
              </v-card-title>
              <v-card-text>
                    <v-text-field
                            label="email"
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
name:'AddEmail',
data(){
    return{
        profileDialog:false,
        emailRule:[ v => !!v || 'E-mail is required',
                      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                     ],
         valid:false,
        loading:false,
        form:{
            email:''
        }
    }
},methods:{
   async submit(){
    if(this.$refs.form.validate())
       {
          this.valid = true
          this.loading=true
         await this.$axios.post('api/bidder/mailist',this.form).then(async(res)=>{
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