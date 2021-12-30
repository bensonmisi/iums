<template>
  <v-col md="3">
       <v-card>
           <v-card-text class="text-center">
               <div>
                   <v-badge
                    color="red"
                    :content="registrations ? registrations.length : 0"
                     overlap
                  >
                 <v-icon x-large color="green" class="icon-size">mdi-file-check-outline</v-icon>
                   </v-badge>
                 </div>
               <div class="subtitle-1">Registrations</div>
               <v-btn block depressed color="primary" @click="infoDialog=true">Open</v-btn>

           </v-card-text>
       </v-card>
             <v-dialog v-model="infoDialog" width="900">
      <v-card>
    <v-card-title class="white--text blue darken-4">
      Supplier Registrations
   </v-card-title>
 <v-card-text>
      <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
             <th class="text-left">
           Issue Date
          </th>
          <th class="text-left">
           Category
          </th>
          <th class="text-left">
           Year
          </th>
          <th class="text-left">
            Status
          </th>
           <th class="text-left">
            Downloads
          </th>
        </tr>
      </thead>
      <tbody>
          <template v-if="registrations">
           <template v-if="registrations.length>0"> 
        <tr
          v-for="item in registrations"
          :key="item.id"
        >
          <td>{{ item.issued_on }}</td>
           <td>
             <template v-if="item.category">
            <div> {{ item.category.name }}</div>
            <div class="font-weight-bold">{{ item.category.code }}</div>
             </template>
             </td>
              <td>{{ item.expire_year }}</td>
          <td>{{ item.status }}</td>
           <td>{{ item.printed }}</td>
      
      
        </tr>
           </template>
          <template v-else>
              <tr><td colspan="5" class="text-center red--text">No Registrations Found</td></tr>
          </template>
          </template>
        
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
name:'accountregistration',
props:['registrations'],
data(){
  return{
  infoDialog:false
  }
}
}
</script>
<style scoped>

.icon-size{
    font-size: 60px !important;
}
 
</style>