<template>
  <div>
       <v-simple-table dense>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                           Tender number
                        </th>
                        <th class="text-left">
                          Entity 
                        </th>
                        <th class="text-left">
                          Closing date
                        </th>
                         <th class="text-left">
                       Maturity Date
                        </th>
                         <th class="text-left">
                       Validity Period
                        </th>
                         <th class="text-left">
                       Status
                        </th>
                          <th class="text-left">
                         Days
                        </th>
                         <th class="text-right">
                       
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="per in bidbonds"
                        :key="per.id"
                        >
                        <td>{{ per.tendernumber }}</td>
                        <td>
                            {{per.entity}}
                        </td>
                          <td>
                            {{per.closingdate}}
                        </td>
                          <td>
                            {{per.maturitydate}}
                        </td>
                          <td>
                            {{per.validityperiod}}
                        </td>
                         <td>
                            {{per.status}}
                        </td>
                           <td>
                            {{per.days}}
                        </td>
                        <td>
                           <participants :id="per.id"/>
                        </td>
                      
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
  </div>
</template>

<script>
import participants from './participants.vue'
export default {
 props:['bidbonds'],
 components:{participants}
}
</script>

<style>

</style>