<template>
    <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Applications</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-5">
          <v-col>
                <v-card>
                <v-card-title>
                 <v-text-field outlined label="Filter"/>
                </v-card-title>
                <v-card-text>
                   <v-simple-table>
                       <template v-slot:default>
                           <thead>
                               <tr>
                                   <th>Date</th>
                                   <th>Entity Name</th>
                                   <th>Status</th>
                                   <th></th>
                               </tr>
                           </thead>
                           <tbody>
                               <template v-if="applications && applications.length>0">
                                  <tr v-for="app in applications" :key="app.id">
                                      <td>{{app.updated_at|formateHumanDiff}}</td>
                                      <td>{{app.procuremententity ? app.procuremententity.name :""}}</td>
                                      <td>{{app.status}}</td>
                                      <td><EntityapplicationView :id="app.id"/></td>
                                  </tr>
                               </template>
                               <template v-else>
                                   <tr>
                                       <td colspan="5" class="text-center red--text">No Applications Found</td>
                                   </tr>
                               </template>
                           </tbody>
                       </template>
                   </v-simple-table>
                </v-card-text>
            </v-card>
          </v-col>
      </v-row>
           <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    </v-container>
</template>

<script>
export default {
layout:'user',
data(){
    return{
        overlay:false
    }
},
async fetch(){
    this.overlay=true
   await this.$store.dispatch('entityapplications/getData') 
   this.overlay = false
},computed:{
    applications(){
        return this.$store.state.entityapplications.data
    }
}
}
</script>

<style>

</style>