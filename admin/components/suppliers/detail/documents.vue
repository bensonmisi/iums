<template>
  <div>
           <v-card class="mt-2">
    <v-card-title class="white--text green">
      Documents   
      <v-spacer/>
      <supplierapproval :id="id"/>
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
  </div>
</template>

<script>
import supplierapproval from './approve.vue'
export default {
name:'detaildocuments',
props:['documents','id'],
components:{supplierapproval},
methods:{
      viewFile(filename){
   const path = "http://localhost:4000/uploadeddocuments/"+filename
   window.open(path)
   }
}
}
</script>

<style>

</style>