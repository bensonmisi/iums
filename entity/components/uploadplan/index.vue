<template>
  <div>
      <v-btn depressed rounded color="primary" @click="showForm"><v-icon>mdi-cloud-upload</v-icon> Upload</v-btn>
      <v-dialog v-model="dialog" width="500">
          <v-card>
              <v-card-title>
                  Upload Plan
                  <v-spacer/>
                  <v-btn icon @click="dialog=false"><v-icon>mdi-close</v-icon></v-btn>
              </v-card-title>
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
            file:null,
            fileRule:[v=>!!v || 'Please attach file']
        }
    },methods:{
        showForm(){
            this.dialog = true            
        },
        async submit(){
         const formdata = new FormData()
         formdata.append('file',this.file)
         formdata.append('authorityapplicationId',this.id)
         this.loading = true
         await this.$store.dispatch('uploadplan/addData',formdata)
         this.loading = false
         this.dialog = false

        }
    }

}
</script>

<style>

</style>