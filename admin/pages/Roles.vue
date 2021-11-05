<template>
    <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>System Roles</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-5">
          <v-col>
                <v-card>
                <v-card-title>
                   Roles
                    <v-spacer/>
                    <div class="d-flex">
                       
                        <v-btn fab depressed color="primary" @click="showModel=false"><v-icon>mdi-plus</v-icon></v-btn>
                    </div>
                </v-card-title>
                <v-card-text>
                 <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                            Name
                        </th>
                        <th class="text-right">
                           
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="per in roles"
                        :key="per.id"
                        >
                        <td>{{ per.name }}</td>
                        <td class="d-flex justify-end pt-2 pb-2">
                        </td>
                        </tr>
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
async fetch(){
   await this.$store.dispatch('roles/getRoles') 
},computed:{
    roles(){
        return this.$store.state.roles.roles
    }
}
}
</script>

<style>

</style>