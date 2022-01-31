<template>
    <div>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="/dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Account Documents</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row>
        <v-col>
          <Stepper :progress="0"/>
        </v-col>
      </v-row>
      <v-row>
          <v-col>
               <v-card>
   
 <v-card-text>
      <v-alert
      text
      prominent
      type="error"
      icon="mdi-cloud-alert"
      v-if="!checkDocument"
    >
     Please upload documents listed below to proceed with the registration process. <b>Please note our system only accepts PDF documents</b>
    </v-alert>
     <v-alert
      prominent
       v-if="checkDocument"
      type="success"
    >
      <v-row align="center">
        <v-col class="grow">
          You have successfully uploaded all required documents please PROCEED button to go to the next stage
        </v-col>
        <v-col class="shrink">
          <v-btn rounded outlined to="/supplier/invoice">PROCEED</v-btn>
        </v-col>
      </v-row>
    </v-alert>
      <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
             <th class="text-left">
            ID
          </th>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Upload Status
          </th>
          <th class="text-right">
           
          </th>
        </tr>
      </thead>
      <tbody>
          <template v-if="documents.length>0">
        <tr
          v-for="item in documents"
          :key="item.id"
        >
          <td>{{ item.id }}</td>
           <td>{{ item.name }}</td>
          <td :class="item.docstatus">
            <template v-if="item.docstatus=='NOTFOUND'">
              PENDING
            </template>
            <template v-else>
            {{ item.docstatus }}
            </template>
            
          </td>
           <td>
             <template v-if="item.docstatus=='NOTFOUND'">
              <UploadDocument :doc="item"/>
             </template>
           </td>
        </tr>
          </template>
          <template v-else>
              <tr>
                  <td colspan="5" class="text-center red--text"> No documents found please update your account settings</td>
              </tr>
          </template>
      </tbody>
    </template>
  </v-simple-table>
 </v-card-text>
   
  </v-card>
          </v-col>
      </v-row>


       <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
      </div>
</template>
<script>
import UploadDocument from './upload.vue'
export default {
layout:'user',
components:{UploadDocument},
data(){
    return{
      overlay:false,
    }
},
async fetch(){
    this.overlay=true
await this.$store.dispatch('documents/getData')
this.overlay = false
if(this.documents.length==0){
  this.$router.push('/settings/general')
}else{
  let uploaded = 0
  this.documents.forEach(element => {
     if(element.docstatus=='UPLOADED'){
       uploaded = uploaded+1
     }
  });
  if(uploaded==this.documents.length){
     this.$router.push('/supplier/invoice')
  }
}
},
  computed:{
   documents(){
       return this.$store.state.documents.data
   },
   checkDocument(){
      let uploaded = 0
  this.documents.forEach(element => {
     if(element.docstatus=='UPLOADED'){
       uploaded = uploaded+1
     }
  });
  if(uploaded==this.documents.length){
    return true
   }else{
     return false
   }
   }
  }

}
</script>
<style scoped>
.NOTFOUND{
  color: red;
}
.UPLOADED{
  color: green;
}
</style>