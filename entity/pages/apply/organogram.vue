<template>
  <div>
    <v-row>
        <v-col>
            <v-card>
                <v-card-text>
                    <v-btn text to="/dashboard">Dashboard</v-btn>
                     <v-btn text to="/apply/pmu">PMU</v-btn>
                      <v-btn text to="/apply/committe">Evaluation Committe</v-btn>
                    <v-btn text disabled>organograms</v-btn>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <Stepper :progress="4"/>
        </v-col>
    </v-row>
    <v-row class="mt-5">
        <v-col>
               <v-alert
                       v-if="organogramlist &&  organogramlist.length>0"
                        prominent
                        text
                        type="success"
                        >
                        <v-row align="center">
                            <v-col class="grow">
                            If you have completed uploading your Organograms. Click on continue button to goto the next stage
                            </v-col>
                            <v-col class="shrink">
                            <v-btn to="/apply/confirm">Continue</v-btn>
                            </v-col>
                        </v-row>
                        </v-alert>
              <v-card>
                <v-card-title>
                  Organograms 
                 <v-spacer/>
                <organogramAdd/>
                </v-card-title>
                <v-card-text>
                   <v-simple-table>
                       <template v-slot:default>
                           <thead>
                               <tr>
                                   <th>Version</th>
                                   <th>Date</th>
                                   <th>Full</th>
                                   <th>Pmu</th>
                                   <th>
                                    
                                   </th>
                               </tr>
                           </thead>
                           <tbody>
                               <template v-if="organogramlist && organogramlist.length>0">
                                 <tr v-for="org in organogramlist" :key="org.id">
                                     <td>{{org.id}}</td>
                                     <td><small>{{org.created_at|formatDate}}</small></td>
                                     <td><small>{{org.full}}</small></td>
                                     <td><small>{{org.pmu}}</small></td>
                                     <td class="d-flex pt-2 justify-end">
                                         <OrganogramDelete :id="org.id"/>
                                     </td>
                                 </tr>
                               </template>
                               <template v-else>
                               <tr>
                                   <td colspan="4" class="text-center red--text">No Organograms created as yet</td>
                               </tr>
                               </template>
                           </tbody>
                       </template>
                   </v-simple-table>
             
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
 layout:"user",
 async fetch(){
     await this.$store.dispatch('organograms/getData')
 },computed:{
     organogramlist(){
         return  this.$store.state.organograms.data
     
     }


   
 }


}
</script>

<style>

</style>