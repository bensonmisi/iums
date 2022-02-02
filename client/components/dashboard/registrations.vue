<template>

          <v-card>
              <v-card-title>
                  Registrations
                  <v-spacer/>
                  <v-btn rounded depressed class="indigo white--text" to="supplier/documents">New/Renew</v-btn>
              </v-card-title>
              <v-card-text>
               <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>
                                    Category
                                </th>
                                <th>Year</th>
                                <th>
                                    Duration
                                </th>
                                <th>
                                    Status
                                </th>
                                <th>

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        <template v-if="registrations">
                        <template v-if="registrations.length>0">
                         <tr v-for="reg in registrations" :key="reg.id">
                             <td>
                                 <div>{{reg.category ? reg.category.code :""}}</div>
                                 <small>{{reg.category ? reg.category.name :""}}</small>
                             </td>
                             <td>
                                 {{reg.expire_year}}
                             </td>
                             <td>
                                 <div>{{reg.option}}</div>
                                 <small>expire : {{reg.expiry_date|formateHumanDiff}}</small>
                            </td>
                            <td>
                               {{reg.status}}
                            </td>
                            <td class="text-right">
                                <template v-if="check_expiry(reg.expiry_date)=='ACTIVE'">
                                    <template v-if="reg.status=='APPROVED'">
                                    <v-btn x-small rounded depressed color="success">Download</v-btn>
                                    </template>
                                      <v-btn x-small v-if="reg.printed==0" rounded depressed color="primary">Change</v-btn>
                                </template>
                                <template v-else>
                                   <div class="red--text"> {{check_expiry(reg.expiry_date)}}</div>
                                </template>
                            </td>
                         </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="4" class="text-center red--text">No Categories Registrations found click on  NEW/RENEW button to register a category</td>
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
import moment from 'moment'
export default {
 props:['registrations'],
 methods:{
     check_expiry(date){
         return moment(date).isAfter(moment()) ? 'ACTIVE' :'EXPIRED'
     }
 }
}
</script>