<template>
  <v-row>
      <v-col>
          <v-card>
              <v-card-title>Add email to our mailing list<v-spacer/><template v-if="!mailist"><AddEmail/></template></v-card-title>
              <v-card-text>
                  <v-simple-table>
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th>Email</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                         <template v-if="mailist">
                             <tr>
                                 <td>{{mailist.email}}</td>
                                   <td class="d-flex pt-2">
                                       <EditMail :mailist="mailist"/>
                                       <DeleteMail :mailist="mailist"/>
                                   </td>
                             </tr>
                         </template>
                         <template v-else>
                             <tr>
                                 <td colspan="2" class="text-center red--text">You havent added any email  to  our mailing list</td>
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
import AddEmail from './add.vue'
import EditMail   from './edit.vue'
import DeleteMail from './delete.vue'
export default {
 props:['mailist'],
 components:{AddEmail,EditMail,DeleteMail}
}
</script>

<style>

</style>