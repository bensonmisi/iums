<template>
    <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Registration Fees</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-5">
          <v-col>
                <v-card>
                <v-card-title>
                   Registration Fees
                    <v-spacer/>
                    <RegistrationfeeAdd/>
                </v-card-title>
                <v-card-text>
                 <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                            locality
                        </th>
                        <th class="text-left">
                            Action
                        </th>
                         <th class="text-left">
                          Price
                        </th>
                        <th class="text-right">
                           
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="fees.length>0">
                        <tr
                        v-for="per in fees"
                        :key="per.id"
                        >
                        <td>{{ per.locality}}</td>
                         <td>{{ per.action}}</td>
                          <td>{{per.currency.name}}{{ per.price}}</td>
                        <td class="d-flex justify-end pt-2 pb-2">
                            <RegistrationfeeEdit :price="per"/> <RegistrationfeeDelete :price="per"/>
                        </td>
                        </tr>
                        </template>
                        <template v-else>
                            <tr><td colspan="4" class="text-center red--text">
                                No Prices Found
                                </td></tr>
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
   await this.$store.dispatch('registrationfees/getFees') 
   this.overlay = false
},computed:{
    fees(){
        return this.$store.state.registrationfees.fees
    }
}
}
</script>

<style>

</style>