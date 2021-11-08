<template>
  <div>
      <v-btn fab depressed color="primary" @click="addPermModel=true"><v-icon>mdi-plus</v-icon></v-btn>
   
      <v-dialog v-model="addPermModel" width="300">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               Add Document
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
                            label="File Type"
                            outlined
                            v-model="form.filetype"
                            :rules="filetypeRule"
                        />
                           <v-text-field
                            label="File Size"
                            outlined
                            v-model="form.filesize"
                            :rules="filesizeRule"
                        />
                            <v-text-field
                            label="Maximum Pages"
                            outlined
                            v-model="form.pages"
                            :rules="pageRule"
                        />
                       <v-select
                            label="Locality"
                            outlined
                            v-model="form.locality"
                            :items="locality"
                            :rules="localityRule"
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
       <v-snackbar     
      :color="color"
      right
      top
      v-model="snackbar"
    >{{text}}</v-snackbar>
  </div>
</template>

<script>
export default {
    props:['id'],
 data(){
     return{
         addPermModel:false,
         valid:false,
         form:{
              name:'',
              locality:'',
              suppliertypeId:this.id,
              pages:'',
              filesize:'',
              filetype:'',              

         },
         nameRule:[v=>!!v || 'Name is required'],
         localityRule:[v=>!!v || 'Locality is required'],
         pageRule:[v=>!!v || 'Number of Max Pages is required'],
         filesizeRule:[v=>!!v || 'Maximum file size is required'],
         filetypeRule:[v=>!!v || 'Maximum file type is required'],
         snackbar:false,
         color:'',
         text:'',
         loading:false,
         locality:['LOCAL','FOREIGN']
     }
 },methods:{
     async submit(){
       if(this.$refs.form.validate())
       {
          this.valid = true
          this.loading=true
             try {
                 await this.$axios.post('api/admin/documents',this.form).then((res)=>{
                        this.loading = false
                        this.color="success"
                        this.snackbar=true
                        this.text=res.data.message
                         this.$store.dispatch('documents/getDocuments',this.id)
                        this.$refs.form.reset()
                        this.addPermModel= false

                 })
             }catch (err) {
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