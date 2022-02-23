<template>
    <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Authority Validy Period</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-5">
          <v-col>
                <v-card>
                <v-card-title>
                   Authority Validy Period
                    <v-spacer/>
                    <AuthorityperiodAdd/>
                </v-card-title>
                <v-card-text>
                 <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                         Period
                        </th>                       
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="periods.length>0">
                        <tr
                        v-for="per in periods"
                        :key="per.id"
                        >
                        <td>{{ per.period }} years</td>                        
                        </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td class="text-center red--text">No period added as yet</td>
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
   await this.$store.dispatch('authorityperiod/getData') 
   this.overlay = false
},computed:{
    periods(){
        return this.$store.state.authorityperiod.data
    }
}
}
</script>

<style>

</style>