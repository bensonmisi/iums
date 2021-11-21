<template>
    <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Exchange Rates</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-5">
          <v-col>
                <v-card>
                <v-card-title>
                  Exchange Rates
                    <v-spacer/>
                    <RateAdd/>
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
                          Type
                        </th>
                        <th class="text-left">
                          Primary Currency
                        </th>
                        <th class="text-left">
                          Secondary Currency
                        </th>
                        <th class="text-left">
                          Rate
                        </th>
                        <th class="text-right">
                           
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="rates.length>0">
                        <tr
                        v-for="per in rates"
                        :key="per.id"
                        >
                        <td>{{ per.id }}</td>
                         <td>{{ per.type }}</td>
                         <td>{{ per.primaryCurrency.name }}</td>
                        <td>{{ per.secondaryCurrency.name }}</td>
                        <td>{{ per.value }}</td>
                        <td class="d-flex justify-end pt-2 pb-2">
                         <RateEdit :rate="per"/>
                         <RateDelete :rate="per"/>
                        </td>
                        </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="5" class="pa-3 text-center red--text">No Exchange Rate  Found</td>
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
   await this.$store.dispatch('rates/getRates') 
   this.overlay = false
},computed:{
    rates(){
        return this.$store.state.rates.rates
    }
}
}
</script>

<style>

</style>