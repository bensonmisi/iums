<template>
  <div>
      
            <v-card class="mt-2">
              <v-card-title>Evaluation Committe</v-card-title>
              <v-card-text>
                  <v-simple-table>
                       <template v-slot:default>
                           <thead>
                               <tr>
                                   <th>#</th>
                                   <th>Name</th>
                                   <th>Email</th>
                                   <th>Jobtitle</th>
                                   <th>
                                    
                                   </th>
                               </tr>
                           </thead>
                           <tbody>
                               <template v-if="items && items.length>0">
                                 <tr v-for="com in items" :key="com.id">
                                     <td>{{com.id}}</td>
                                     <td><small>{{com.title}} {{com.name}} {{com.surname}}</small></td>
                                     <td><small>{{com.email}}</small></td>
                                     <td><small>{{com.jobtitle}}</small></td>
                                     <td class="d-flex pt-2 justify-end">
                                     </td>
                                 </tr>
                               </template>
                               <template v-else>
                               <tr>
                                   <td colspan="8" class="text-center red--text">No Evaluation Committe created as yet</td>
                               </tr>
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
props:['items']
}
</script>

<style>

</style>