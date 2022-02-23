<template>
  <div>
    <v-row>
        <v-col>
            <v-card>
                <v-card-text>
                    <v-btn text to="/dashboard">Dashboard</v-btn>
                    <v-btn text to="/apply/">Plans</v-btn>
                     <v-btn text to="/apply/pmu">PMU</v-btn>
                    <v-btn text disabled>Evaluation Committe</v-btn>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <Stepper :progress="3"/>
        </v-col>
    </v-row>
    <v-row class="mt-5">
        <v-col>
               <v-alert
                       v-if="committelist && committelist.length>0"
                       text
                        prominent
                        type="success"
                        >
                        <v-row align="center">
                            <v-col class="grow">
                            If you have completed creating your Evaluation Committe. Click on continue button to goto the next stage
                            </v-col>
                            <v-col class="shrink">
                            <v-btn to="/apply/organogram">Continue</v-btn>
                            </v-col>
                        </v-row>
                        </v-alert>
              <v-card>
                <v-card-title>
                  Evaluation Committe
                 <v-spacer/>
                <CommitteAdd/>
                </v-card-title>
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
                               <template v-if="committelist && committelist.length>0">
                                 <tr v-for="com in committelist" :key="com.id">
                                     <td>{{com.id}}</td>
                                     <td><small>{{com.title}} {{com.name}} {{com.surname}}</small></td>
                                     <td><small>{{com.email}}</small></td>
                                     <td><small>{{com.jobtitle}}</small></td>
                                     <td class="d-flex pt-2 justify-end">
                                         <CommitteEdit :item="com"/>
                                         <CommitteDelete :id="com.id"/>
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
        </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
 layout:"user",
 async fetch(){
     await this.$store.dispatch('committe/getData')
 },computed:{
     committelist(){
         return  this.$store.state.committe.data
     
     }


   
 }


}
</script>

<style>

</style>