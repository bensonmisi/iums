<template>
  
  <div>
      <v-btn x-small depressed rounded @click="openModel"><v-icon>mdi-plus</v-icon> Upload</v-btn>
   
      <v-dialog v-model="uploadModel" width="300">
       <v-card>
           <v-card-title>
              Upload Proof of Payment
               <v-spacer/>
               <v-btn icon @click="uploadModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
                  <v-text-field
                            label="Name"
                            outlined
                            v-model="name"
                            :rules="nameRule"
                        />

                    
                 <v-file-input
                    accept=".pdf"
                    label="File input"
                    v-model="file"
                    :rules="fileRule"
                ></v-file-input>
                      

                      
                        
           </v-card-text>
           <v-card-actions>
               <v-btn rounded class="error" @click="uploadModel=false">Cancel</v-btn>
               <v-spacer/>
               <v-btn rounded class="success" @click="submit" :loading="loading" :disabled="loading">Submit</v-btn>
           </v-card-actions>
       </v-card>
           
      </v-dialog>
  </div>
</template>
<script>
export default {
    props:['id','mode','invoicenumber'],
 data(){
     return{
         uploadModel:false,
         valid:false,
              name:'',
              accountId:'',
              file:null,         
         nameRule:[v=>!!v || 'Bank name is required'],
         fileRule:[v=>!!v || 'Please Attached Proof of Payment'],
         loading:false
     }
 },methods:{
     openModel(){
      this.uploadModel=true
     },
     async submit(){
     
          this.valid = true
          this.loading=true
          const formData = new FormData();
          formData.append('file',this.file)
          formData.append('accountId',this.id)
          formData.append('name',this.name)
        let config = { headers: {'content-type': 'multipart/form-data'}}
             try {
                 await this.$axios({
                     method:"POST",
                     url:'api/admin/rtgs',
                     data:formData,
                     config:config
                     }).then(async (res)=>{
                        this.loading = false
                        this.$swal("success",res.data.message,"success")
                        this.uploadModel= false
                        if(this.mode=="supplier")
                         {
                         await this.$store.dispatch('supplierreceipting/getReceiptData',this.invoicenumber) 
                         }
                         else{
                             await this.$store.dispatch('awaitingtenderinvoices/getReceiptData',this.invoicenumber)  
                         }

                 })
             }catch (err) {
                 this.loading = false
                 this.$swal("error",err.response.data.message,"error")
            }
       
     }
 }
}
</script>
