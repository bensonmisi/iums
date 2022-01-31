<template>
    <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Registration Options</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-5">
          <v-col>
                <v-card>
                <v-card-title>
                   Registration Options
                    <v-spacer/>
                    <RegistrationoptionAdd/>
                </v-card-title>
                <v-card-text>
                 <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                            Name
                        </th>
                         <th class="text-left">
                            Duration
                        </th>
                        <th class="text-right">
                           
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="options.length>0">
                        <tr
                        v-for="per in options"
                        :key="per.id"
                        >
                        <td>{{ per.name }}</td>
                        <td>{{ per.duration }}</td>
                        <td class="d-flex justify-end pt-2 pb-2">
                          <RegistrationoptionEdit :record="per"/>
                          <RegistrationoptionDelete :record="per"/>
                        </td>
                        </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="3" class="text-center red--text">No registration option found</td>
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
   await this.$store.dispatch('registrationoptions/getData') 
   this.overlay = false
},computed:{
    options(){
        return this.$store.state.registrationoptions.data
    }
}
}
</script>

<style>

</style>