<template>
    <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Bid Bond Thresholds</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-5">
          <v-col>
                <v-card>
                <v-card-title>
                  Bid Bond Thresholds
                    <v-spacer/>
                    <CurrencyAdd/>
                </v-card-title>
                <v-card-text>
                 <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                           Locality
                        </th>                       
                        <th class="text-left">
                          Period
                        </th>
                        <th class="text-left">
                         Lower Limit
                        </th>
                         <th class="text-left">
                        Uppper Limit
                        </th>
                           <th class="text-left">
                        Amount
                        </th>
                        <th class="text-right">
                           
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="thresholdslist.length>0">
                        <tr
                        v-for="per in thresholdslist"
                        :key="per.id"
                        >
                        <td>{{ per.locality }}</td>
                         <td>{{ per.validityperiod }}</td>
                          <td>{{ per.currency? per.currency.name:"" }}{{ per.lowerlimit }}</td>
                           <td>{{ per.currency? per.currency.name:"" }}{{ per.upperlimit }}</td>
                            <td>{{ per.currency? per.currency.name:"" }}{{ per.amount }}</td>
                        <td>
                          
                     
                        </td>
                        </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="7" class="pa-3 text-center red--text">No Bidbond Thresholds Found</td>
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
   await this.$store.dispatch('bidbondthreshold/getThresholds') 
   this.overlay = false
},computed:{
    thresholdslist(){
        return this.$store.state.bidbondthreshold.thresholds
    }
}
}
</script>

<style>

</style>