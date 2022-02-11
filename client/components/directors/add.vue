<template>
  <div>
      <v-btn depressed color="primary" fab @click="profileDialog=true"><v-icon>mdi-plus</v-icon></v-btn>
      <v-dialog v-model="profileDialog" width="600">
           <v-form v-model="valid" ref="form" lazy-validation>
          <v-card>
              <v-card-title>
                  Add Director
                   <v-spacer/>
                   <v-btn icon @click="profileDialog=false"><v-icon>mdi-close</v-icon></v-btn>
              </v-card-title>
              <v-card-text>
                    <v-text-field
                            label="name"
                            outlined
                            v-model="form.name"
                            :rules="nameRule"
                        />
                         <v-select
                            label="Gender"
                            :items="genderlist"
                            outlined
                            v-model="form.gender"
                            :rules="genderRule"
                        />
                          <v-text-field
                            label="National ID/Passport number"
                            outlined
                            v-model="form.idnumber"
                            :rules="idnumberRule"
                        />
                          <v-file-input
                    label="Click here to attach Scanned ID"
                    outlined
                    v-model="file"
                    :rules="fileRule"
                ></v-file-input>
                      
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
name:'AddDirector',
data(){
    return{
        profileDialog:false,
        genderlist:['M','F'],
        file:null,
        nameRule:[v=>!!v||"Name is required"],
        genderRule:[v=>!!v || 'Gender is required'],
        idnumberRule:[v => !!v || 'ID number is required'],
        fileRule:[v=>!!v || 'File is required'],
        valid:false,
        loading:false,
        form:{
            name:'',
            gender:'',
           idnumber:''
        }
    }
},methods:{
   async submit(){
    if(this.$refs.form.validate())
       {
          this.valid = true
          this.loading=true
          const formdata = new FormData()
          formdata.append('name',this.form.name)
          formdata.append('gender',this.form.gender)
          formdata.append('idnumber',this.form.idnumber)
          formdata.append('file',this.file) 
            let config = { headers: {'content-type': 'multipart/form-data'}}
         await this.$axios({
           method:"POST",
           url:'api/bidder/directors',
           data:formdata,
           config:config}).then(async(res)=>{
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