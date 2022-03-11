<template>
  <div>
      <v-row>
          <v-col>
              <v-card  flat>
                  <v-card-text>
                  <v-row>
                      <v-col md="5">
                          <v-select label="Month" dense outlined v-model="form.month" :items="monthlist"/>
                      </v-col>
                        <v-col md="5">
                          <v-text-field dense label="Year" type="number" outlined v-model="form.year"/>
                        </v-col>
                        <v-col md="2">
                            <v-btn depressed color="primary" @click="filterReports">Filter</v-btn>
                        </v-col>
                  </v-row>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-2">
          <v-col md="4">
             <v-card>
                 <v-card-text>
                     <div class="text-h2">{{totalSubmittion}}</div>
                     <div class="text-h5">totalSubmittion</div>
                 </v-card-text>
             </v-card>
          </v-col>
           <v-col md="4">
             <v-card>
                 <v-card-text>
                     <div class="text-h2">{{totalEntities-totalSubmittion}}</div>
                     <div class="text-h5">Non Submittion</div>
                 </v-card-text>
             </v-card>
          </v-col>
          <v-col md="4">
             <v-card>
                 <v-card-text>
                     <div class="text-h2">{{totalEntities}}</div>
                     <div class="text-h5">Total Entities</div>
                 </v-card-text>
             </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-2">
          <v-col>
              <v-card>
                  <v-toolbar dense color="primary" dark>
                      <v-toolbar-title>Entity List ({{month}}-{{year}})</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                      <v-simple-table>
                          <template v-slot:default>
                              <thead>
                                  <tr>
                                      <th>Name</th>
                                      <th>Submittion Status</th>
                                      <th></th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr v-for="rt in dataset" :key="rt.id">
                                      <td>
                                        {{rt.name}}
                                      </td>
                                      <td>
                                        {{rt.submitted?'SUBMITTED':'PENDING'}}
                                      </td>
                                      <td>
                                          <template v-if="rt.submitted">
                                        <ReturnsView :items="rt" :month="month" :year="year"/>
                                          </template>
                                      </td>
                                  </tr>
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
 data(){
     return{
         monthlist:['JAN','FEB','MAR','APR','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
         form:{
             month:'',
             year:''
         }
     }
 },
 async fetch(){
     await this.$store.dispatch('monitoringreport/getData')
 },
 methods:{
     async filterReports(){
       await this.$store.dispatch('monitoringreport/filterData',this.form)
     }
 },
 computed:{
     dataset(){
         return this.$store.state.monitoringreport.data.dataset
     }
     ,month(){
         return this.$store.state.monitoringreport.data.month
     },
     year(){
         return this.$store.state.monitoringreport.data.year
     },
     totalEntities(){
            return this.$store.state.monitoringreport.data.dataset.length 
     },
     totalSubmittion(){
         const data = this.$store.state.monitoringreport.data.dataset
         if(data.length>0)
         {
         const filtered = data.filter(dt=>{
             return dt.submitted
         })

         return filtered.length
         }
         else{
             return 0
         }
     }
 }
}
</script>

<style>

</style>