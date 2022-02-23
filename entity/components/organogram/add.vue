<template>
  <div>
      <v-btn depressed rounded color="primary" @click="showForm"><v-icon>mdi-cloud-upload</v-icon> Upload</v-btn>
      <v-dialog v-model="dialog" width="500">
          <v-card>
              <v-card-title>
                  Upload Organograms
                  <v-spacer/>
                  <v-btn icon @click="dialog=false"><v-icon>mdi-close</v-icon></v-btn>
              </v-card-title>
               <v-card-text>
              <v-file-input
                    accept=".pdf"
                    outlined
                    label="Click here to attach  Full Organogram"
                    v-model="fullorganogram"
                    :rules="fullorganogramRule"
                ></v-file-input>

                 <v-file-input
                    accept=".pdf"
                    outlined
                    label="Click here to attach  PMU Organogram"
                    v-model="pmuorganogram"
                    :rules="pmuorganogramRule"
                ></v-file-input>
           </v-card-text>
             <v-card-actions>
                    <v-btn rounded class="error" @click="uploadDialog=false">Cancel</v-btn>
               <v-spacer/>
               <v-btn rounded class="success" @click="submit" :loading="loading" :disabled="loading">Submit</v-btn>
             </v-card-actions>
          </v-card>
      </v-dialog>
  </div>
</template>

<script>
export default {
  props:['id'],
    data(){
        return{
            dialog:false,
            loading:false,
            fullorganogram:null,
            fullorganogramRule:[v=>!!v || 'Please attach file'],
            pmuorganogram:null,
            pmuorganogramRule:[v=>!!v || 'Please attach file']
        }
    },methods:{
        showForm(){
            this.dialog = true            
        },
        async submit(){
         const formdata = new FormData()
         formdata.append('fullorganogram',this.fullorganogram)
         formdata.append('pmuorganogram',this.pmuorganogram)
         this.loading = true
            let config = { headers: {'content-type': 'multipart/form-data'}} 
          await this.$axios(
                    {
                        method:"POST",
                        url:'api/entity-domain/organogram',
                        data:formdata,
                        config:config
                    }
                    ).then(async(res)=>{
                    this.$swal(res.data.status,res.data.message,res.data.status)
                await this.$store.dispatch('organograms/getData')
                }).catch(error=>{
                    this.$swal('error',error.response.data.message,'error')
                })

        }
    }

}
</script>

<style>

</style>