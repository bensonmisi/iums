<template>
  <v-row>
      <v-col>
          <v-card>
              <v-card-title>Contact Information<v-spacer/><template v-if="!contacts"><AddContactInfo/></template></v-card-title>
              <v-card-text>
                  <v-simple-table>
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th>Address</th>
                            <th>Emails</th>
                            <th>Phonenumbers</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                         <template v-if="contacts">
                             <tr>
                                 <td>{{contacts.address}}</td>
                                  <td>{{contacts.emails}}</td>
                                   <td>{{contacts.phones}}</td>
                                   <td class="d-flex pt-2">
                                       <EditContactInfo :contacts="contacts"/>
                                       <DeleteContact :contacts="contacts"/>
                                   </td>
                             </tr>
                         </template>
                         <template v-else>
                             <tr>
                                 <td colspan="4" class="text-center red--text">No Contact Information found</td>
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
import AddContactInfo from './add.vue'
import EditContactInfo from './edit.vue'
import DeleteContact from './delete.vue'
export default {
 props:['contacts'],
 components:{AddContactInfo,EditContactInfo,DeleteContact}
}
</script>

<style>

</style>