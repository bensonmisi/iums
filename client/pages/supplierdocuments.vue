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
               <v-card>
   
 <v-card-text>   
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
import UploadDocument from './supplier/upload.vue'
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