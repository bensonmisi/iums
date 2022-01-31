<template>
   <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>
                                   Tender Details
                                </th>
                                <th>
                                  Period
                                </th>
                                <th>
                                   Maturity Date
                                </th>
                                <th>
                                  Status
                                </th>
                                 <th>
                                  Refund Status
                                </th>
                                <th>

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-if="bidbonds">
                                <template v-if="bidbonds.length>0">
                         <tr v-for="bid in bidbonds" :key="bid.id">
                             <td>
                               {{bid.tendernumber}}
                             </td>
                             <td>
                              {{bid.validityperiod}}
                            </td>
                            <td>
                               <div>{{bid.maturitydate}}</div>
                            </td>
                            <td :class="bid.status">
                                {{bid.status}}
                            </td>
                            <td :class="bid.refunded">
                                {{bid.refunded}}
                            </td>
                            <td class="text-right">
                                <v-btn v-if="bid.status=='ACTIVE'" x-small rounded depressed color="success">Download</v-btn>
                              <div v-if="bid.status=='MATURED'" >
                                    <v-btn v-if="bid.refunded=='PENDING'" x-small rounded depressed color="primary">Request Refund</v-btn>
                                    <v-btn v-if="bid.refunded=='PENDING'" x-small rounded depressed color="orange">Request Extension</v-btn>
                          
                              </div>
                            </td>
                         </tr>
                                </template>
                                <template v-else>
                                    <tr><td colspan="5" class="text-center red--text">No Bidbond applications found</td></tr>
                                </template>
                            </template>
                          
                         
                      
                        </tbody>
                    </template>
               </v-simple-table>
</template>

<script>
export default {
    name:"Bidbonddata",
 props:['bidbonds']
}
</script>

<style scoped>
 .MATURED{
     color: green;
     font-weight: bold;
 }
 .ACTIVE{
     color: indigo;
     font-weight: bold;
 }
 .PENDING{
     color: orange;
     font-weight: bold;
 }
</style>