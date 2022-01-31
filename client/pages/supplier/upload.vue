<template>
  <div>
      <v-btn rounded depressed color="primary"  @click="uploadDialog=true">upload</v-btn>
      <v-dialog v-model="uploadDialog" width="500">
           <v-form v-model="valid" ref="form" lazy-validation>
          <v-card>
           <v-card-title>{{doc.name}}<v-spacer/><v-btn icon @click="uploadDialog=false"><v-icon>mdi-close</v-icon></v-btn></v-card-title>
           <v-card-text>
              <v-file-input
                    accept=".pdf"
                    outlined
                    label="Click here to attach document"
                    v-model="file"
                    :rules="fileRule"
                ></v-file-input>
           </v-card-text>
             <v-card-actions>
                    <v-btn rounded class="error" @click="uploadDialog=false">Cancel</v-btn>
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
name:"UploadDocument",
props:['doc'],
data(){
    return{
        uploadDialog:false,
        file:null,
        loading:false,
        valid:false,
        fileRule:[v=>!!v || 'Please upload document'],
      

    }
},methods:{
  async submit(){
     if(this.$refs.form.validate())
       {
          this.valid = true

           const formData = new FormData();
          formData.append('id',this.doc.id)
          formData.append('file',this.file)         
          let config = { headers: {'content-type': 'multipart/form-data'}}
 
        try {
            await this.$axios({
                method:"POST",
                url:'api/bidder/documents',
                data:formData,
                config:config
            }).then(async (res)=>{
            this.$swal('success',res.data.message,'success')
            await this.$store.dispatch('documents/getData')
            this.uploadDialog = false
          }).catch(error=>{
              this.$swal('error',error.response.data.message,'error')
          }) 
        } catch (error) {
            this.$swal("error",error,"error") 
        }
       }
  }  
}
}
</script>

<style>

</style>