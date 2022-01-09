<template>
  <div>
       <v-card class="mt-2">
    <v-card-title class="white--text teal">
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
          <td>{{ item.created_at | formateHumanDiff }}</td>
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
  </div>
</template>

<script>
export default {
name:'detailregistration',
props:['registrations']
}
</script>

<style>

</style>