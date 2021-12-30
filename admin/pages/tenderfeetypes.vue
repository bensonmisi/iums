<template>
    <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Tender fee types</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-5">
          <v-col>
                <v-card>
                <v-card-title>
                   Tender Fee Types
                    <v-spacer/>
                    <TenderfeetypeAdd/>
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
                         Required
                        </th>
                        <th class="text-left">
                         Rule
                        </th>
                        
                        <th class="text-right">
                           
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="types.length>0">
                        <tr
                        v-for="per in types"
                        :key="per.id"
                        >
                        <td>{{ per.name }}</td>
                         <td>{{ per.required }}</td>
                          <td>{{ per.rule }}</td>
                        <td class="d-flex justify-end pt-2 pb-2">
                         <TenderfeetypeEdit :feetype="per" />
                          <TenderfeetypeDelete :feetype="per" />
                        </td>
                        </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="4" class="pa-3 text-center red--text">No Tender fee Found</td>
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
   await this.$store.dispatch('tenderfeetype/getTenderfeetypes') 
  
   this.overlay = false
},computed:{
    types(){
        return this.$store.state.tenderfeetype.types
    }
}
}
</script>

<style>

</style>