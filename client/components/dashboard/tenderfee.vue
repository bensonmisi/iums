<template>
     <v-card>
              <v-card-title>
                 Tender Fees
                  <v-spacer/>
                  <v-btn rounded depressed class="indigo white--text">New Request</v-btn>
              </v-card-title>
              <v-card-text>
               <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>
                                   Tender Details
                                </th>
                                <th>
                                   Type
                                </th>
                                <th>
                                  Status
                                </th>
                                <th>

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-if="applications">
                                <template v-if="applications.length>0">
                         <tr v-for="appl in applications" :key="appl.id">
                             <td>
                                {{appl.tendernumber}}
                             </td>
                             <td>
                              {{appl.type}}
                            </td>
                            <td>
                               {{appl.status}}
                            </td>
                            <td class="text-right">
                                <v-btn x-small rounded depressed color="success">Download</v-btn>
                            </td>
                         </tr>
                                </template>
                                <template v-else>
                                    <tr>
                                        <td colspan="4" class="text--center red-text">No tender fee applications found</td>
                                    </tr>
                                </template>
                         
                            </template>
                           
                        </tbody>
                    </template>
               </v-simple-table>
              </v-card-text>
          </v-card>
</template>

<script>
export default {
props:['applications']
}
</script>

<style>

</style>