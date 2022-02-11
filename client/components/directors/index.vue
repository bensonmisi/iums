<template>
  <v-row>
      <v-col>
          <v-card>
              <v-card-title>Directors Information<v-spacer/><AddDirector/></v-card-title>
              <v-card-text>
                  <v-simple-table>
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>gender</th>
                            <th>ID number</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                         <template v-if="directors && directors.length>0">
                             <tr v-for="director in directors" :key="director.id">
                                 <td>{{director.name}}</td>
                                  <td>{{director.gender}}</td>
                                   <td>{{director.idnumber}}</td>
                                   <td class="d-flex pt-2">
                                       <template v-if="director.status=='PENDING'">
                                       <EditDirector :director="director"/>
                                       <DeleteDirector :director="director"/>
                                       </template>
                                   </td>
                             </tr>
                         </template>
                         <template v-else>
                             <tr>
                                 <td colspan="4" class="text-center red--text">No Director information  found</td>
                             </tr>
                         </template>
                        </tbody>
                    </template>
                  </v-simple-table>
              </v-card-text>
          </v-card>
      </v-col>
  </v-row>
</template>

<script>
import AddDirector from './add.vue'
import EditDirector from './edit.vue'
import DeleteDirector from './delete.vue'
export default {
 props:['directors'],
 components:{AddDirector,EditDirector,DeleteDirector}
}
</script>

<style>

</style>