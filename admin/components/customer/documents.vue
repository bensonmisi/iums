<template>
  <v-col md="3">
       <v-card>
           <v-card-text class="text-center">             
               <div>
                     <v-badge
                    color="red"
                    :content="documents ? documents.length: 0"
                     overlap
                  >
                 <v-icon x-large color="green" class="icon-size">mdi-file-sign</v-icon>
                     </v-badge>
                 </div>
               <div class="subtitle-1">Documents</div>
               <v-btn block depressed color="primary" @click="showInfo">Open</v-btn>

           </v-card-text>
       </v-card>
       <v-dialog v-model="infoDialog" width="900">
      <v-card
      
  >
    <v-card-title class="white--text blue darken-4">
      Documents   
   </v-card-title>
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
          <th class="text-left">
           Approval Status
          </th>
          <th class="text-right">
           
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in documents"
          :key="item.id"
        >
          <td>{{ item.id }}</td>
           <td>{{ item.name }}</td>
          <td :class="item.status">{{ item.docstatus }}</td>
          <td :class="item.status">{{ item.status }}</td>
           <td>
              <v-btn v-if="item.filename" x-small depressed rounded color="primary" @click="viewFile(item.filename)">View</v-btn>
           </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
 </v-card-text>
   
  </v-card>
       </v-dialog>
  </v-col>
</template>

<script>
export default {
 name:"accountdocuments",
 props:['documents'],
 data(){
    return{
    infoDialog:false
    }
},
 methods:{
      viewFile(filename){
   const path = "http://localhost:4000/uploadeddocuments/"+filename
   window.open(path)
   },
    showInfo(){
        this.infoDialog=true
    }
 }
}
</script>

<style scoped>
.NOTFOUND{
  color:red
}
.PENDNING{
  color: orange;
}
.APPROVED{
  color: green;
}.icon-size{
    font-size: 60px !important;
}
</style>