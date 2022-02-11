<template>
<div>
        <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Users</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-3">
          <v-col>
              <v-card>
                  <v-card-title>Users<v-spacer/><UserAdd/></v-card-title>
                  <v-card-text>
                      <v-simple-table>
                          <template v-slot:default>
                              <thead>
                                  <tr>
                                      <th>Name</th><th>Surname</th><th>Email</th><th></th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr v-for="user in users" :key="user.id">
                                     <td>{{user.name}}</td>
                                     <td>{{user.surname}}</td>
                                     <td>{{user.email}}</td>
                                     <td class="d-flex pt-2">
                                        <template v-if="user.id !== loggedInUser.id">
                                            <UserEdit :user="user"/>
                                            <UserDelete :user="user"/>
                                        </template>
                                     </td>
                                  </tr>
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
</div>

</template> 
<script>
import { mapGetters } from 'vuex'
export default {
  layout:"user",
  async fetch(){
      this.overlay=true
      await this.$store.dispatch('users/getData')
      this.overlay=false
  },
  data(){
      return{
          overlay:false
      }
  },
  computed:{
       ...mapGetters(['loggedInUser']),
      users(){
          return this.$store.state.users.data
      }
  }

}
</script>