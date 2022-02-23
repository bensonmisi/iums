<template>
    <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Procurement Entities</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-5">
          <v-col>
                  <v-card>
                <v-card-text>
                  
                   
                     <v-text-field
                            label="Filter"
                            outlined
                            v-model="filter"
                        />
                      
                </v-card-text>
                  </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-5">
          <v-col>
                <v-card>
                <v-card-title>
                  Procurement Entities
                    <v-spacer/>
                    <EntityAdd/>
                </v-card-title>
                <v-card-text>
                 <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                          <th class="text-left">
                            #ID
                        </th>
                         <th class="text-left">
                           Name
                        </th>  
                        <th class="text-left">
                           City
                        </th>
                        <th class="text-left">
                           District
                        </th>
                         <th class="text-left">
                          Province
                        </th>
                         <th class="text-left">
                          Sector
                        </th>
                        <th class="text-right">
                           
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                     <template v-if="entitylist.length>0">
                         <tr v-for="ent in entitylist" :key="ent.id">
                             <td>{{ent.id}}</td>
                             <td>{{ent.name}}</td>
                             <td>{{ent.city}}</td>
                             <td>{{ent.district}}</td>
                             <td>{{ent.province}}</td>
                             <td>{{ent.sector}}</td>
                             <td class="d-flex pt-3">
                               <EntityEdit :entity="ent"/>
                               <EntityDelete :entity="ent"/>
                               <EntityUser :id="ent.id"/>
                             </td>
                         </tr>
                     </template>
                     <template v-else>
                         <tr>
                             <td colspan="7" class="text-center red--text">No Procurement entities found as yet</td>
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
        timeout="2000"
      ></v-progress-circular>
    </v-overlay>
    </v-container>
</template>

<script>
export default {
layout:'user',
data(){
    return{
        overlay:false,
        filter:""
    }
},
async fetch(){
    this.overlay=true
   await this.$store.dispatch('procuremententity/getData') 
   this.overlay = false
},computed:{
    entitylist(){
        const data =  this.$store.state.procuremententity.data
            if(this.filter !='')
            {
                return data.filter(dt=>(!dt.name.toUpperCase().indexOf(this.filter.toUpperCase())))
            }else{
                return data
            }

    }
}
}
</script>

<style>

</style>