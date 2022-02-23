<template>
    <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Procurement Threshold</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-5">
          <v-col>
                <v-card>
                <v-card-title>
                   Procurement Threshold
                    <v-spacer/>
                    <ProcurementthresholdAdd/>
                </v-card-title>
                <v-card-text>
                 <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                         Class
                        </th>
                         <th class="text-left">
                         Classfication
                        </th>
                         <th class="text-left">
                        Threshold
                        </th>
                         <th class="text-left">
                         Fee
                        </th>
                        <th class="text-right">
                           
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="procurementthresholds.length>0">
                        <tr
                        v-for="per in procurementthresholds"
                        :key="per.id"
                        >
                        <td>{{ per.procurementclass.name }}</td>
                        <td>{{ per.procurementclassification.name }}</td>
                        <td>{{ per.currency.name }}{{per.value}}</td>
                         <td>{{ per.currency.name }}{{per.fee}}</td>
                        <td class="d-flex justify-end pt-2 pb-2">
                            <ProcurementthresholdEdit :item="per"/>
                            <ProcurementthresholdDelete :item="per"/>
                        </td>
                        </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="5" class="text-center red--text">No Procurement threholds found</td>
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
   await this.$store.dispatch('procurementthreshold/getData') 
   this.overlay = false
},computed:{
    procurementthresholds(){
        return this.$store.state.procurementthreshold.data
    }
}
}
</script>

<style>

</style>