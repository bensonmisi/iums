<template>
  <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-toolbar dense color="primary" dark>
                      <v-toolbar-title>Check List</v-toolbar-title>
                      <v-spacer/>
                     <ChecklistAdd/>
                  </v-toolbar>
                  <v-card-text>
                      <v-simple-table>
                          <template v-slot:default>
                              <thead>
                                  <tr>
                                      <th>Procurement Group</th>
                                      <th>
                                          Status
                                      </th>
                                      <th>

                                      </th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <template v-if="checklist && checklist.length>0">
                                    <tr v-for=" check in checklist" :key="check.id">
                                        <td>
                                            {{check.procurementcategory.name}}
                                        </td>
                                        <td>
                                          {{check.status}}
                                        </td>
                                        <td>
                                          <QuestionsView :id="check.id"/>
                                        </td>
                                    </tr>
                                  </template>
                                  <template v-else>
                                      <tr>
                                          <td colspan="3" class="text-center red--text">No Checklist Created as yet</td>
                                      </tr>
                                  </template>
                                  <tr></tr>
                              </tbody>
                          </template>
                      </v-simple-table>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
 layout:"user",
 async fetch(){
    await this.$store.dispatch('checklist/getData')
 },computed:{
     checklist(){
         return this.$store.state.checklist.data

     }
 }
}
</script>

<style>

</style>