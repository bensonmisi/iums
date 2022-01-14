<template>
    <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Contract Fee Threshold</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-5">
          <v-col>
                <v-card>
                <v-card-title>
                Contract Fee Threshold
                    <v-spacer/>
                    <ContractthresholdAdd/>
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
                            Lower
                        </th>
                          <th class="text-left">
                            Upper
                        </th>
                          <th class="text-left">
                            Type
                        </th>
                          <th class="text-left">
                            Value
                        </th>
                        <th class="text-right">
                           
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="thresholds.length>0">
                            <tr v-for="threshold in thresholds" :key="threshold.id">
                                <td>{{threshold.locality}}</td>
                                <td>{{threshold.currency.name}} {{threshold.lower}}</td>
                                <td>{{threshold.currency.name}} {{threshold.upper}}</td>
                                <td>{{threshold.type}}</td>
                                <td>{{threshold.currency.name}} {{threshold.cost}}</td>
                                <td></td>

                            </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="7" class="text-center red--text"> Contract Fee Thresholds not found</td>
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
   await this.$store.dispatch('contractfeethreshold/getThresholds') 
   this.overlay = false
},computed:{
    thresholds(){
        return this.$store.state.contractfeethreshold.thresholds
    }
}
}
</script>

<style>

</style>