<template>
    <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Notice Types</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-5">
            <v-col>
                <v-card>
                <v-card-title>
                   Notice Types
                    <v-spacer/>
                    <NoticetypeAdd/>
                </v-card-title>
                <v-card-text>
                     <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                            Name
                        </th>
                        <th>Linked Fees</th>
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
                        <td>

                            <template v-if="per.tenderfeetype.length>0">
                                 <p v-for="type in per.tenderfeetype " :key="type.id">{{type.name}}</p>
                            </template>
                           
                        </td>
                        <td>
                           
                            <NoticetypeEdit :type="per"/>
                        </td>
                        </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="2" class="text-center red--text">No Notice types found</td>
                            </tr>
                        </template>
                    </tbody>
                    </template>
                </v-simple-table>
                </v-card-text>
                </v-card>
            </v-col>
      </v-row>

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
   await this.$store.dispatch('noticetypes/getTypes') 
   this.overlay = false
},
computed:{
    types(){
    return this.$store.state.noticetypes.noticetypes
    }
}
}
</script>

<style>

</style>