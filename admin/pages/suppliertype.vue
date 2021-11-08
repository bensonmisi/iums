<template>
    <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Supplier Types</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-5">
          <v-col>
                <v-card>
                <v-card-title>
                   Supplier Types
                    <v-spacer/>
                    <SuppliertypeAdd/>
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
                           Allowed Categories
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
                        <td>{{ per.allowed_categories }}</td>
                        <td class="d-flex justify-end pt-2 pb-2">
                            <SuppliertypeEdit :type="per"/>
                            <SuppliertypeDelete :type="per"/>
                            <DocumentsView :itm="per"/>
                        </td>
                        </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="3" class="pa-3 text-center red--text">No Supplier types Found</td>
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
   await this.$store.dispatch('suppliertypes/getTypes') 
   this.overlay = false
},computed:{
    types(){
        return this.$store.state.suppliertypes.types
    }
}
}
</script>

<style>

</style>