<template>
  <div>
       <v-btn rounded depressed small color="error" @click="imgDialog=true"><v-icon>mdi-cloud-upload</v-icon> Upload CV</v-btn>
         <v-dialog v-model="imgDialog" width="500">
          <v-form>
          <v-card>
              <v-card-title>
                  Upload CV
                  <v-spacer/>
                  <v-btn icon @click="imgDialog=false"><v-icon>mdi-close</v-icon></v-btn>
              </v-card-title>
              <v-card-text>
                   <v-file-input
                    accept=".pdf"
                    outlined
                    label="Click here to attach CV"
                    v-model="file"
                    :rules="fileRule"
                ></v-file-input>
              
              </v-card-text>
              <v-card-actions>
                  <v-btn rounded color="error" depressed small @click="imgDialog=false">Cancel</v-btn>
                  <v-spacer/>
                  <v-btn rounded color="success" depressed small @click="uploadCv">Upload</v-btn>
              </v-card-actions>
          </v-card>
          </v-form>
      </v-dialog>
                              
  </div>
</template>

<script>
export default {
    props:['id'],
    data(){
        return{
            file:null,
            imgDialog:false,
            fileRule:[v=>!!v || 'Please attache CV']
        }
    },methods:{
       async uploadCv(){

            const formdata = new FormData()
            formdata.append('file',this.file)
            formdata.append('id',this.id)
               let config = { headers: {'content-type': 'multipart/form-data'}}
          await this.$axios(
                    {
                        method:"POST",
                        url:'api/entity-domain/upload-cv',
                        data:formdata,
                        config:config
                    }
                    ).then(async(res)=>{
                    this.$swal(res.data.status,res.data.message,res.data.status)
                await this.$store.dispatch('pmu/getData')
                }).catch(error=>{
                    this.$swal('error',error.response.data.message,'error')
                })
         }
    }

}
</script>

<style>

</style>